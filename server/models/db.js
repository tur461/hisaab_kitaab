const mysql = require('mysql');
const config = require('../config/db.mysql.config.js');


const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASS,
    database: config.DB
});

connection.connect(err => {
    if(err) throw err;
    console.log('successfully connected to db');
});

module.exports = connection;
