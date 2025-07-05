const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6362',
    database: 'domain_booking'
});
connection.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});
module.exports = connection;

