import React, { Fragment } from "react";
import {

    getEmpByDeps, getEmpName

} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'react-moment';
import 'moment-timezone';

class EmpsAppraisal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { govern: null, station: null }

    }


    handel22 = (e) => {
        this.props.getEmpName(e.target.value)
    }


    render() {

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
                                    <span>رقم الأداء  </span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} onClick={this.handel22} type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20 }} class="input-group">
                                    <span>الإسم</span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} type="text" disabled={true} name="first_name" value={this.props.empname ? this.props.empname[0].NAME_ARABIC : null} />
                                </div>
                                <div style={{ marginRight: 5, marginTop: 20 }} class="input-group">
                                    <span>التقدير</span>
                                    <select style={{ width: 120, height: 27.5, marginBottom: 5, marginRight: 2 }}>
                                        {appraisals.map(apprsl => (
                                            <option>{apprsl}</option>
                                        ))}
                                        <option selected>اختر التقييم</option>
                                    </select>                                </div>
                                <div style={{ marginRight: 5, marginTop: 20, }} class="input-group">
                                    <span style={{ marginTop: 3, marginLeft: 1 }}> السنة</span>
                                    <select style={{ width: 120, height: 27.5, marginBottom: 5, marginRight: 2 }}>
                                        {dates.map(year => (
                                            <option>{year}</option>
                                        ))}
                                        <option selected>اختر السنة</option>
                                    </select>
                                </div>
                                <button style={{ position: "relative", right: 30, top: 15 }} type="button" class="btn btn-success">إضافة تقييم جديد</button>


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
                                            </tr>
                                        </thead>

                                        {this.props.empdep.map(empdep => (
                                            <tbody>
                                                <td>{empdep.EMPLOYEE_ID}</td>
                                                <td>{empdep.NAME_ARABIC}</td>
                                                <td>{empdep.MAIN_BOX_NAME}</td>
                                                <td>{empdep.SUP_BOX_NAME}</td>

                                            </tbody>
                                        ))}

                                    </table>
                                    <p>{this.props.empdep.length}</p>
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

        deps: state.posts.deps,
        empdep: state.posts.empdep,
        empname: state.posts.empname


    };
};
export default connect(mapStateToProps, {
    getEmpByDeps, getEmpName
})(EmpsAppraisal);