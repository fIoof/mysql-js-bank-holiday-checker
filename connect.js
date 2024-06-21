const mysql = require('mysql');
dotenv = require('dotenv');
const util = require('util');

require('dotenv').config();
const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
const connect = util.promisify(con.connect).bind(con);
const end = util.promisify(con.end).bind(con);
const query = util.promisify(con.query).bind(con);
module.exports = { connect, end, query };



    