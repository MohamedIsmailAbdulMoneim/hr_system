import React, { Fragment } from "react";
import {
    getEmpTrans
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactmoment from "react-moment"

class EmpTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobbycat: null || this.props.jobdgbycat, catid: null };

    }


    clickHandler = (e) => {
        e.preventDefault()
        this.props.getEmpTrans(e.target.value)
    }



    render() {

        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "100%",
            height: 250,
            backgroundColor: "#fff",
            color: "#212529",
            fontSize: "2rem",
            lineHeight: 1.5,
            fontWeight: "bold",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            appearance: "none",
            transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"

        }
        console.log(this.props.empTrans);

        return (
            <div id="page-wrapper" >
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tables</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                تدرج الموظفين
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20 }} class="input-group">
                                    <span>رقم الأداء  </span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} onDoubleClick={this.clickHandler} type="text" name="first_name" />
                                </div>
                                <button onClick={this.handelSubmit} style={{ position: "relative", right: 10, top: 8 }} type="button" class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة تدرج جديد</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                DataTables Advanced Tables
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th>تاريخ الحركة</th>
                                                <th>كود الإدارة</th>
                                                <th>الإدارة</th>
                                                <th>كود الوظيفة</th>
                                                <th>الوظيفة</th>
                                                <th>كود المسمى الوظيفي</th>
                                                <th>المسمى الوظيفي</th>
                                                <th>نوع التخصص</th>
                                                <th>طريقة شغل الوظيفة</th>
                                                <th>حالة الوظيفة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>


                                            </tr>
                                        </thead>
                                        {this.props.empTrans.map(trans => (
                                            <tbody>
                                                <tr>

                                                    <td><Reactmoment format="YYYY/MM/DD">{trans.TRANS_DATE}</Reactmoment></td>
                                                    <td>{trans.CAT_ID}</td>
                                                    <td>{trans.CAT_NAME}</td>
                                                    <td>{trans.MAIN_BOX_ID}</td>
                                                    <td>{trans.MAIN_BOX_NAME}</td>
                                                    <td>{trans.SUP_BOX_ID}</td>
                                                    <td>{trans.SUP_BOX_NAME}</td>
                                                    <td>{trans.G_NAME}</td>
                                                    <td>{trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                    <td>{trans.INDICATOR_NAME}</td>
                                                    {/* <td onClick={this.handelEdit_1}><i empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} onClick={this.editHandler} class="fas fa-edit"></i></td> */}
                                                    <td onClick={this.handelEdit_1}><i class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>











                                                </tr>
                                            </tbody>
                                        ))}

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {
        empTrans: state.posts.empTrans
    };
};
export default connect(mapStateToProps, {
    getEmpTrans
})(EmpTrans);