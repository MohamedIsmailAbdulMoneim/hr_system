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
        this.state = { edit: false, name: null, date: null, catname: null, maninboxname: null, supboxname: null, gname: null, jasi: null, indname: null };

    }


    clickHandler = (e) => {
        e.preventDefault()
        this.setState({ edit: false })
        this.props.getEmpTrans(e.target.value)

    }

    handelEdit_1 = (e) => {
        var myCurrentDate = e.target.getAttribute("transdate").slice(0, 10);
        var myFutureDate = new Date(myCurrentDate);
        myFutureDate.setDate(myFutureDate.getDate() + 1);//myFutureDate is now 8 days in the future
        let newDate = myFutureDate.getUTCFullYear() + "-" + (myFutureDate.getUTCMonth() + 1) + "-" + myFutureDate.getUTCDate()
        this.setState({ edit: true, date: newDate, catname: e.target.getAttribute("catname"), mainboxname: e.target.getAttribute("mainboxname"), supboxname: e.target.getAttribute("supboxname"), gname: e.target.getAttribute("jobgroup"), jasi: e.target.getAttribute("jasform"), indname: e.target.getAttribute("indname") })
        console.log(e.target.getAttribute("transdate"));
    }

    handelEdit_2 = (e) => {
        e.preventDefault()
        // let data = { empNat: this.state.empNat, appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }

        let data = { data: document.getElementById("date") ? document.getElementById("date").value : null }
        axios({
            method: "PUT",
            data: data,
            url: `http://localhost:5000/updateemptrans`,
            headers: { "Content-Type": "application/json" },
        }).then(data => {
            console.log(data);
        })



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
        console.log(this.refs.date ? this.refs.date.innerHTML : null);

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
                                        {!this.state.edit ?
                                            <Fragment>
                                                <thead>
                                                    <tr>
                                                        <th>الإسم</th>
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
                                                            <td ref="name">{trans.NAME_ARABIC}</td>
                                                            <td >{trans.TRANS_DATE}</td>
                                                            <td ref="catid">{trans.CAT_ID}</td>
                                                            <td ref="catname">{trans.CAT_NAME}</td>
                                                            <td ref="mainboxid">{trans.MAIN_BOX_ID}</td>
                                                            <td ref="mainboxname1">{trans.MAIN_BOX_NAME}</td>
                                                            <td ref="supboxid">{trans.SUP_BOX_ID}</td>
                                                            <td ref="supboxname">{trans.SUP_BOX_NAME}</td>
                                                            <td ref="gname">{trans.G_NAME}</td>
                                                            <td ref="jasi">{trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                            <td ref="indname">{trans.INDICATOR_NAME}</td>
                                                            <td onClick={this.handelEdit_1}><i empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} mainboxname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} onClick={this.editHandler} jasform={trans.JOB_ASSIGNMENT_FORM_ARABIC} indname={trans.INDICATOR_NAME} class="fas fa-edit"></i></td>
                                                            <td><i class="fas fa-backspace"></i></td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </Fragment>

                                            :
                                            <Fragment>

                                                <thead>
                                                    <tr>
                                                        <th>الإسم</th>
                                                        <th>تاريخ الحركة</th>
                                                        <th>الإدارة</th>
                                                        <th>الوظيفة</th>
                                                        <th>المسمى الوظيفي</th>
                                                        <th>نوع التخصص</th>
                                                        <th>طريقة شغل الوظيفة</th>
                                                        <th>حالة الوظيفة</th>
                                                        <th>تعديل</th>
                                                        <th>حذف</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{this.refs.name ? this.refs.name.innerHTML : null}</td>
                                                        <td><input id="date" ref onClick={this.handelEdit_2} value={this.state.date ? this.state.date : null} style={{ display: "inline" }} /><i class="fas fa-edit" /></td>
                                                        <td><input placeholder={this.state.catname} /></td>
                                                        <td><input placeholder={this.state.mainboxname} /></td>
                                                        <td><input placeholder={this.state.supboxname} /></td>
                                                        <td><input placeholder={this.state.gname} /></td>
                                                        <td><input placeholder={this.state.jasi} /></td>
                                                        <td><input placeholder={this.state.indname} /></td>
                                                        <td><i class="fas fa-edit"></i></td>
                                                        <td><i class="fas fa-backspace"></i></td>
                                                    </tr>
                                                </tbody>
                                            </Fragment>
                                        }

                                    </table>
                                    {this.props.empTrans.length < 1 ? <h1>عفواً لا توجد بييانات</h1> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
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