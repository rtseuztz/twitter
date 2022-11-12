const mysql = require("mysql");

// set up a mysql connection pool
const pool = mysql.createPool({
    host: "mysql",
    port: "3306",
    dialect: "mysql",
    user: 'root',
    password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
    database: process.env.MYSQL_ENV_MYSQL_DATABASE,
});

export default async function query(query: string) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query)
        return rows;
    } catch (err) {
        return {}
    }
}