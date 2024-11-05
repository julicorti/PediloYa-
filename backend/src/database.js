const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    port: 3307, // Añade esta línea
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



// No es necesario llamar a pool.connect() aquí
// solo exporta el pool
module.exports = pool;
