import * as mysql from 'mysql2/promise';
import { tweet } from '..';
const pool = mysql.createPool({
    host: "mysql",
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
    database: process.env.MYSQL_ENV_MYSQL_DATABASE,
})


export default async function query(sql: string): Promise<tweet[]> {
    const connection = await mysql.createConnection({
        host: "mysql",
        user: 'root',
        password: process.env.MYSQL_ENV_MYSQL_PASSWORD,
        database: process.env.MYSQL_ENV_MYSQL_DATABASE,
    })

    const [rows, fields] = await connection.execute(sql);
    console.log(rows);
    console.log(fields);
    return rows as unknown as tweet[];
}