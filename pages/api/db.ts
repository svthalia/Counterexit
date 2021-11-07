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

async function addWash(session: Session){
    sql`
        SELECT time FROM washes ORDER BY time LIMIT 1
    `.then((data: any) => {
        console.log(data)
    })
}



export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    const session = await getSession({req})
    if (session) {
        const body = JSON.parse(req.body)
        switch (body.action) {
            case '?userLogin':
                addUser(session)
                res.status(200)
                break;
            case '?addWash':
                addWash(session)
                res.status(200)
                break;
            default:
                res.status(418)
                break;
        }
    } else {
        res.status(401)
    }
    res.end()
}
