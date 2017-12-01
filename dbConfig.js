// 导入MySQL模块
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ddbb0120',
    database: 'blog'
});

db.connect();

module.exports = db;