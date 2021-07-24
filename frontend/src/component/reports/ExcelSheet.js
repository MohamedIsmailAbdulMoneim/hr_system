import React from "react";
import ReactExport from "react-export-excel";

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
            <ExcelFile element={<button>export to excelsheet</button>}>
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