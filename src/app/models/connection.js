const mysql = require('mysql2/promise');
const config = require('../../../config');

const connection = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DB,
});

module.exports = connection;