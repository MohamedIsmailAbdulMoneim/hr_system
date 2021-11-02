const express = require("express");
const app = express()
const mainCodes = require("./src/routs/mainCodes")
const planandorg = require("./src/routs/planandorg")
const report = require("./src/routs/report")
const users = require("./src/routs/users")
const cors = require("cors")
const passport = require('passport');
const ExcelJS = require('exceljs');
var session = require('express-session');
const path = require('path')

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

// app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(process.env.NODE_ENV);
app.use(mainCodes)
app.use(planandorg)
app.use(report)
app.use(users)

app.use(
  express.static("frontend/src/uploads")
);

app.use(
  express.static("frontend/src/css/rtl")
);

// app.use(
//   express.static("frontend/build")
// );

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, 'frontend', 'build', 'index.html')
//   );

// })

app.use((error, req, res, next) => {
  next(error)
})




var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("connected on port");
});