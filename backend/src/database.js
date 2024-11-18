const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    port: 3307, // Asegúrate de que el puerto sea el correcto
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const getconnection = async ()=> await connection;

module.exports = {
    getconnection
}

