const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "rateio",
    password: "0000",
    port: 5432,
})

module.exports = pool;