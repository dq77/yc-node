const mysql = require('mysql2')
require('dotenv').config();
const pool = mysql.createPool({
    connectionLimit: 10, // 最大连接数默认为0
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: '+08:00'
})

class Mysql {
    constructor() {}
    query(sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject(error)
                    throw error
                }
                connection.query(sql, values, function (error, results, fields) {
                    if (error) {
                        reject(error)
                        throw error
                    }
                    connection.release()
                    resolve(results)
                })
            })
        })
    }
}

module.exports = new Mysql()
