const mysql = require("mysql2");

// set up a mysql connection pool
const connection = mysql.createConnection({
    host: "mysql",
    port: "3306",
    user: 'root',
    password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
    database: process.env.MYSQL_ENV_MYSQL_DATABASE,
});

export default async function query(query: string): Promise<any> {
    try {
        connection.query(query, function (err: any, results: any, fields: any) {
            if (err) {
                console.log(err);
                return null;
            }
            console.log(results);
            console.log(fields);
            return results;
        });
    } catch (err) {
        return {}
    }
}