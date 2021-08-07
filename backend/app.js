const express = require("express");
const app = express()
const db = require("./src/database/connection")
const mainCodes = require("./src/routs/mainCodes")
const planandorg = require("./src/routs/planandorg")
const report = require("./src/routs/report")
const users = require("./src/routs/users")
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require('passport');
const ExcelJS = require('exceljs');
var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  resave: false,
  saveUninitialized: false
}));



require('./src/database/passport')(passport);


// This will initialize the passport object on every request
app.use(passport.initialize());


// let obj = { columnsNums: 5, columnsNames: { a1: "id", a2: "name", a3: "dob" }, columnsKeys: { a1: "id", a2: "name", a3: "dob" } }


// exTest()


// db.connect(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Database connected");
//   }
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(mainCodes)
app.use(planandorg)
app.use(report)
app.use(users)


var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("connected on port");
});