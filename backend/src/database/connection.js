// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("hr_project", "root", "", {host: "127.0.0.1", dialect: "mysql", operatorsAliases: false })
// module.exports = sequelize;
// global.sequelize = sequelize

var mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hr_database",
  multipleStatements: true,
  dateStrings: 'date'
});

pool = require('mysql').createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout  : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host            : "localhost",
  user            : "root",
  password        : '',
  database        : "hr_database"
});


module.exports = db