import React from "react";
import ReactExport from "react-export-excel";
import ExcelLogo from "./excel.png"

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Download extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props);
        return (
            <ExcelFile element={<img src={ExcelLogo} style={{ width: 50,height:50, float: "left"}} /> }>
                <ExcelSheet data={this.props.data} name="Leaves">
                    {this.props.colNames.map(col => (
                        <ExcelColumn label={col.label} value={col.value} />
                    ))}
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default Download