const mariadb = require("mariadb");
// set up a mariadb connection pool
const pool = mariadb.createPool({
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