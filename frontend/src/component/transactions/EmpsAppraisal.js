import React, { Fragment } from "react";
import {

    getEmpByDeps, getEmpName, getEmpAppraisal

} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'react-moment';
import 'moment-timezone';

class EmpsAppraisal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { empId: "null", empName: null, empAppraisal: "null", appraisalYear: "null", edit: false, empNat: null }

    }

    componentDidMount() {
    }



    handelName = (e) => {
        e.preventDefault()
        this.props.getEmpName(e.target.value)
        this.setState({ empId: e.target.value })
        if (this.props.empname) {
            if (this.props.empname.length >= 1) {
                this.setState({
                    empName: this.props.empname[0].NAME_ARABIC
                })
            } else {
                this.setState({ empName: "لا توجد بيانات" })
            }
        }


    }

    handelAppraisal = (e) => {
        e.preventDefault()
        this.setState({ empAppraisal: e.target.value })
    }

    handelYear = (e) => {
        e.preventDefault()
        console.log("hit");
        this.setState({ appraisalYear: e.target.value })
    }

    handelSearch = () => {
        this.setState({ edit: false })
        this.props.getEmpAppraisal(document.getElementById("empid").value, document.getElementById("empapp").value, document.getElementById("year1").value)
    }

    handelEdit_1 = async (e) => {
        this.setState({ edit: true, empAppraisal: e.target.getAttribute("empApp"), appraisalYear: e.target.getAttribute("empDate"), empName: e.target.getAttribute("empName"), empNat: e.target.getAttribute("empnatid") })


    }

    handelEdit_2 = (e) => {

        let data = { empNat: this.state.empNat, appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }
        axios({
            method: "PUT",
            data: data,
            url: 'http://localhost:5000/appraisalupdate',
            headers: { "Content-Type": "application/json" },
        }).then(data => {
            console.log(data);
        })

        window.location.reload();


    }

    render() {
        console.log(document.getElementById("year1") ? document.getElementById("year1").value : null, document.getElementById("empid") ? document.getElementById("empid").value : null)
        var dates = [];
        let start = 1996;
        let end = 2021;

        while (start != end) {
            dates.push(start);
            start++;
        }


        let appraisals = ["ممتاز بجدارة", "ممتاز", "جيد جدا بجدارة", "جيد جدا", "جيد", "مقبول", "ضعيف", "جيد حكمي", "جيد جدا حكمي", "ممتاز حكمي"]

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

        return (
            <div id="page-wrapper" >
                <div style={{ display: "none" }} class="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: 200, width: 750 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                إضافة تقييم جديد
                            </div>
                            <div style={{ display: "flex", marginTop: 5 }}>
                                <div style={{ marginRight: 20, marginTop: 5 }}>
                                    <div class="input-group">
                                        <span >رقم الأداء :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 35, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div class="input-group">
                                        <span>الإسم :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 55, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div class="input-group">
                                        <span>التقدير :  </span>
                                        <select style={{ width: 120, height: 27.5, marginBottom: 5, marginRight: 50 }}>
                                            {appraisals.map(apprsl => (
                                                <option>{apprsl}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="input-group">
                                        <span>السنة :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 53, width: 178, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tables</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: 150, width: 750 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                التقييمات السنوية
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20 }} class="input-group">
                                    <span>رقم الأداء  </span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} onDoubleClick={this.handelName} id="empid" type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20 }} class="input-group">
                                    <span>الإسم</span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} type="text" disabled={true} id="name" value={this.state.empName ? this.state.empName : null} />
                                </div>
                                <div style={{ marginRight: 5, marginTop: 20 }} class="input-group">
                                    <span>التقدير</span>
                                    <select id="empapp" onChange={this.handelAppraisal} style={{ width: 120, height: 27.5, marginBottom: 5, marginRight: 2 }}>
                                        {appraisals.map(apprsl => (
                                            <option appraisl={apprsl}>{apprsl}</option>
                                        ))}
                                        <option selected>اختر التقييم</option>
                                    </select>
                                </div>
                                <div style={{ marginRight: 5, marginTop: 20, }} class="input-group">
                                    <span style={{ marginTop: 3, marginLeft: 1 }}> السنة</span>
                                    <select id="year1" onChange={this.handelYear} style={{ width: 120, height: 27.5, marginBottom: 5, marginRight: 2 }}>
                                        {dates.map(year => (
                                            <option year={year} >{year}</option>
                                        ))}
                                        <option selected>اختر السنة</option>
                                    </select>
                                </div>
                                <button onClick={this.handelSearch} style={{ position: "relative", right: 5, top: 18 }} type="button" class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button style={{ position: "relative", right: 20, top: 18 }} type="button" class="btn btn-primary">إضافة تقييم جديد</button>


                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Striped Rows
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التقدير</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>السنة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {!this.state.edit ? this.props.empApp.map(emp => (
                                            <tbody>
                                                <tr>
                                                    <td>{emp.NAME_ARABIC}</td>
                                                    <td>{emp.APPRAISAL_ARABIC}</td>
                                                    <td>{emp.APPRAISAL_DATE}</td>
                                                    <td onClick={this.handelEdit_1}><i empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} onClick={this.editHandler} class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        )) :
                                            <tbody>
                                                <tr style={{ marginTop: 5, marginBottom: 5 }}>
                                                    <td><input type="text" placeholder={this.state.empName} disabled /></td>
                                                    <td><select ref="newAppraisal" onChange={this.handelAppraisal} style={{ width: 120, height: 27.5, marginBottom: 5, marginRight: 2 }}>
                                                        {appraisals.map(apprsl => (
                                                            <option id="appraisal" appraisl={apprsl}>{apprsl}</option>
                                                        ))}
                                                        <option selected>{this.state.empAppraisal}</option>
                                                    </select></td>
                                                    <td><input id="year" type="text" placeholder={this.state.appraisalYear} disabled /></td>
                                                    <td><button onClick={this.handelEdit_2} type="button" class="btn btn-success">Success</button></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>

                                        }

                                    </table>
                                    <p>{this.props.empdep.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >)
    }
}


const mapStateToProps = (state) => {
    return {

        deps: state.posts.deps,
        empdep: state.posts.empdep,
        empname: state.posts.empname,
        empApp: state.posts.empApp


    };
};
export default connect(mapStateToProps, {
    getEmpByDeps, getEmpName, getEmpAppraisal
})(EmpsAppraisal);