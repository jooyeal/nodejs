var mysql = require("mysql");
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dpvmdprtm1",
    database: "practice",
});
db.connect();
module.exports = db;