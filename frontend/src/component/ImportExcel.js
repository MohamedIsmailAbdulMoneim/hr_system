import React, { Fragment } from "react";
import excelJs from 'exceljs'
const workbook = new excelJs.Workbook();

class Upload extends React.Component {
    constructor(props) {
        super(props);

    }

    getExcelSheet = async (data) => {
    await workbook.xlsx.readFile('./database.xlsx');
    let sheet =  workbook.getWorksheet(1);
    let sheet2= newWorkbook.getWorksheet(1)

    let newIndex = 2

    console.log(sheet.getColumn(1).values[50]);

    for(let i = 2;i <= 411 ; i++){
        var row =  sheet.getRow(i)
        var newSheet_row = sheet2.getRow(newIndex)
            var val = row.getCell(4).value
            if(val === 'الإدارة العامة للتحويل'){
                newSheet_row.values = row.values
                newIndex++

            }
        newSheet_row.commit();
    }
    newWorkbook.xlsx.writeFile('newfile2.xlsx');

}

    render() {
        console.log(this.props);
        return (
            <Fragment>
                <input type="file" id="myFile" name="filename" />
                <input type="submit" />
            </Fragment>
        );
    }
}

export default Upload



