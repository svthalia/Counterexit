const postgres = require('postgres')
const sql = postgres('postgres://username:password@host:port/database', {
    host        : 'localhost',         // Postgres ip address or domain name
    port        : 5432,       // Postgres server port
    path        : '',         // unix socket path (usually '/tmp')
    database    : process.env.DB,         // Name of database to connect to
    username    : process.env.DBUSERNAME,         // Username of database user
    password    : process.env.DBPASSWORD,         // Password of database user
    ssl         : false,      // True, or options for tls.connect
    max         : 10,         // Max number of connections
    timeout     : 0,          // Idle connection timeout in seconds
    types       : [],         // Array of custom types, see more below
    connection  : {
        application_name  : 'postgres.js'// Default application_name
    }
})

export default sql;