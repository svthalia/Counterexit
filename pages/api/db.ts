import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from "next-auth/client";
import {Session} from "next-auth";

const postgres = require('postgres');

const sql = postgres('postgres://username:password@host:port/database', {
    host: 'localhost',         // Postgres ip address or domain name
    port: 5432,       // Postgres server port
    path: '',         // unix socket path (usually '/tmp')
    database: process.env.DB,         // Name of database to connect to
    username: process.env.DBUSERNAME,         // Username of database user
    password: process.env.DBPASSWORD,         // Password of database user
    ssl: false,      // True, or options for tls.connect
    max: 10,         // Max number of connections
    timeout: 0,          // Idle connection timeout in seconds
    types: [],         // Array of custom types, see more below
    connection: {
        application_name: 'postgres.js'// Default application_name
    }
})

/**
 * Adds user to the database, if the user didn't already exist
 *
 * @param session
 * @return response with status code 200 (ok)
 */

function addUser(session: Session) {
    sql`
        SELECT * FROM users WHERE name = ${session.user.name}
    `.then((data: any) => {
        if(data.count === 0 ){
            sql`INSERT INTO users (
                name, image
            ) values (
                ${session.user.name}, ${session.user.image}
            )`
        }
    })
}

/**
 * Adds washes to the database, if the last entry was more then half an hour ago
 *
 * @param session
 * @return response with status code 425 (to early) or 200 (ok)
 */

async function addWash(session: Session): Promise<boolean>{
    const data = await sql`
        SELECT time FROM washes WHERE time >= now()::timestamp - INTERVAL '30 min' AND time <= now() LIMIT 1
    `
    if (data.count === 0){
        await sql`INSERT INTO washes (
            name, time
        ) values (
            ${session.user.name}, now()
        )`
        return true;
    }else{
        return false;
    }
}

/**
 * Gets the top 3 dishwashers from the washes database and joins it with the user database
 * It also makes sure it always returns 3 users
 *
 * @return response with status code 425 (to early) or 200 (ok)
 */

async function getLeaders(){
    const response = await sql`
        SELECT *
        FROM users
        INNER JOIN
        (SELECT name, count(*) AS wash FROM washes GROUP BY name) AS washesSort ON washesSort.name = users.name
        ORDER BY wash
        LIMIT 3
    `
    const winners = response.slice(0,3);
    for(let i=3; i>winners.length; i--){
        winners.push({
            name: 'None',
            image: 'https://staging.thalia.nu/static/members/images/default-avatar.jpg',
            wash: 0
        })
    }
    return winners.sort(function (a: { wash: number; }, b: { wash: number; }){
        return b.wash - a.wash
    })
}


/**
 * Handles api requests, checks if you are logged in and then executes the correct function dependant on your input
 ** @param req
 * @param res
 * @return response with status code dependant on the function
 */

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    const session = await getSession({req})
        const body = JSON.parse(req.body)
        switch (body.action) {
            case '?userLogin':
                if (session) {
                    addUser(session);
                }
                res.status(200);
                break;
            case '?addWash':
                if (session) {
                    const done = await addWash(session);
                    if (done){
                        res.status(200);
                    }else{
                        res.status(425);
                    }
                }

                break;
            case "?getLeaders":
                const response = await getLeaders();
                res.status(200).json(response);
                break;
            default:
                res.status(418);
                break;
        }
    res.end()
}
