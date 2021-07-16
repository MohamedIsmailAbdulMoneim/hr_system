const express = require("express");
const app = express()
const db = require("./src/database/connection")
const mainCodes = require("./src/routs/mainCodes")
const planandorg = require("./src/routs/planandorg")
const report = require("./src/routs/report")
const cors = require("cors")
const bodyParser = require("body-parser")
const ExcelJS = require('exceljs');

let obj = {columnsNums : 5, columnsNames: {a1: "id", a2:"name",a3:"dob"},columnsKeys:{a1: "id", a2:"name",a3:"dob"}}

async function exTest(obj){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    const nothing;
    
  
  worksheet.columns = [
   {header: 'Id', key: 'id'},
   {header: 'Name', key: 'name'}, 
   {header: 'D.O.B.', key: 'dob'}
  ];

  ws.columns.forEach(column => {
    column.width = column.header.length < 12 ? 12 : column.header.length
  })

//   worksheet.getRow(1).height = ;


  worksheet.getColumn('id').eachCell((cell, rowNumber) => { 
    cell.fill = {      type: 'gradient',
    gradient: 'angle',
    degree: 0,
    stops: [
      {position:0, color:{argb:'FF0000FF'}},
      {position:0.5, color:{argb:'FFFFFFFF'}},
      {position:1, color:{argb:'FF0000FF'}}
    ]

}
})
  
  worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
  worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
  
  // save under export.xlsx
  await workbook.xlsx.writeFile('export.xlsx');

}

// exTest()


db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected");
    }
});

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


app.use(mainCodes)
app.use(planandorg)
app.use(report)

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("connected on port");
});

