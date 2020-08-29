var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dpvmdprtm1',
    database: 'practice'
});

connection.connect();

connection.query('SELECT * FROM topic', function (err, results, fields) {
    if (err) throw err;
    console.log(results);
});