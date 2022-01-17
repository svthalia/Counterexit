import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from "next-auth/react";
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
        SELECT *
        FROM users
        WHERE pk = ${session.user.id}
    `.then((data: any) => {
        if (data.count === 0) {
            sql`INSERT INTO users (name, image, pk)
                values (${session.user.name}, ${session.user.image}, ${session.user.id})`
        } else if (data[0].name !== session.user.name || data[0].image !== session.user.image) {
            sql`
                UPDATE
                    users
                SET name  = ${session.user.name},
                    image = ${session.user.image}
                WHERE pk = ${session.user.id}
            `
        }
    })
}

/**
 * Gets the current state on the dishwasher
 *
 * @return returns the time 0 when the washing machine is ready or returns next time when dishwasher is ready
 */

async function getCurrentState(): Promise<number> {
    const latest = await sql`SELECT time
                             FROM washes
                             WHERE time >= now()::timestamp - INTERVAL '30 min'
                               AND time <= now()
                             LIMIT 1`;
    if (latest.count === 0) {
        return 0;
    } else {
        const last_time = Date.parse(latest[0].time);
        const washReady = new Date(last_time + 30 * 60000)
        return washReady.valueOf();
    }
}

/**
 * Adds washes to the database, if the last entry was more then half an hour ago
 *
 * @param session
 * @return response with status code 425 (to early) or 200 (ok)
 */

async function addWash(session: Session): Promise<boolean> {
    const data = await sql`
        SELECT time
        FROM washes
        WHERE time >= now()::timestamp - INTERVAL '30 min'
          AND time <= now()
        LIMIT 1
    `
    if (data.count === 0) {
        await sql`INSERT INTO washes (pk, time)
                  values (${session.user.id}, now())`
        return true;
    } else {
        return false;
    }
}

/**
 * Gets the dishwasher of the month from the winners database and returns it
 *
 * @return response with status code 401 (Not authorized) or 200 (ok) */

async function getLastWinner() {
    const date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    if(month === 0){
        year =- 1
        month = 12
    }

    const response = await sql`
        SELECT *
        FROM winners
        WHERE time = ${month + "/" + year}
        LIMIT 1
    `
    if(response.count !== 0){
        const user = await sql`
        SELECT *
        FROM users
        WHERE pk = ${response[0].pk}
        LIMIT 1
    `
        return {name: user[0].name, image: user[0].image, wash: response[0].washes, when: response[0].time}
    }

    return null

}


/**
 * Gets the top 3 dishwashers from the washes database and joins it with the user database
 * It also makes sure it always returns 3 users
 *
 * @return response with status code 425 (to early) or 200 (ok)
 */

async function getLeaders() {
    const response = await sql`
        SELECT *
        FROM users
                 INNER JOIN
                 (SELECT pk, count(*) AS wash FROM washes GROUP BY pk) AS washesSort ON washesSort.pk = users.pk
        ORDER BY wash DESC
        LIMIT 3
    `
    const winners = response.slice(0, 3);
    const win_length = winners.length;

    for (let i = 3; i > win_length; i--) {
        winners.push({
            name: 'None',
            image: 'https://staging.thalia.nu/static/members/images/default-avatar.jpg',
            wash: 0
        })
    }
    return winners.sort(function (a: { wash: number; }, b: { wash: number; }) {
        return b.wash - a.wash
    })
}

interface user {
    name: string,
    image: string,
    pk: number,
    wash: number
}

async function getLeaderboard() {


    const response = await sql`
        SELECT *
        FROM users
                 INNER JOIN
                 (SELECT pk, count(*) AS wash FROM washes GROUP BY pk) AS washesSort ON washesSort.pk = users.pk
        ORDER BY wash DESC
    `

    const users = response.map((e: user) => {
        return {name: e.name, wash: e.wash}
    })

    return users.sort(function (a: { wash: number; }, b: { wash: number; }) {
        return b.wash - a.wash
    })
}

/**
 * Handles api requests, checks if you are logged in and then executes the correct function dependant on your input
 ** @param req
 * @param res
 * @return response with status code dependant on the function
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({req})
    const body = JSON.parse(req.body)
    switch (body.action) {
        case '?userLogin':
            if (session) {
                addUser(session);
                res.status(200);
            } else {
                res.status(401);
            }
            break;
        case '?addWash':
            if (session) {
                const done = await addWash(session);
                if (done) {
                    res.status(200);
                } else {
                    res.status(425);
                }
            } else {
                res.status(401);
            }
            break;
        case "?getLeaders":
            const response = await getLeaders();
            res.status(200).json(response);
            break;
        case '?getLeaderboard':
            if (session) {
                const users = await getLeaderboard();
                if (users) {
                    res.status(200).json(users);
                } else {
                    res.status(401).json([]);
                }
            } else {
                res.status(401).json([]);
            }
            break;
        case "?getLastWinner":
            const winner = await getLastWinner();
            if(winner) {
                res.status(200).json(winner);
            }else{
                res.status(200);
            }
            break;
        case "?getStatus":
            if (session) {
                const time = await getCurrentState();
                res.status(200).json(time);
            } else {
                res.status(401);
            }
            break;
        default:
            res.status(418);
            break;
    }
    res.end()
}
