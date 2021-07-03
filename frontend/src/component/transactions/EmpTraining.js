import React, { Fragment } from "react";
import {
    getEmpEdu
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'react-moment';
import 'moment-timezone';

class EmpEduDeg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { empId: "null", empName: null, empAppraisal: "null", appraisalYear: "null" }

    }
    clickHandler = (e) => {
        e.preventDefault()
        this.props.getEmpEdu(e.target.value)
    }
    componentDidMount() {
    }
    // onSubmit = (e) => {
    //     e.preventDefault();

    //     const fd = {
    //       subject: this.state.subject,
    //       type: this.state.type,
    //       giver: this.state.giver,
    //       state: this.state.status,
    //       creationdate: this.state.doc,
    //       required: this.state.required,
    //       summary: this.state.summary,
    //       bais: this.state.posttype,
    //     };

    //     if (this.state.posttype === "outdocs") {
    //       axios({
    //         method: "POST",
    //         data: fd,
    //         withCredentials: true,
    //         url: "http://localhost:3000/outdocspost",
    //         headers: { "Content-Type": "application/json" },
    //       })
    //         .then((res) => {
    //           axios
    //           .get(`http://localhost:3000/newCreatedpost/${res.data.insertId}/${this.state.posttype}`)
    //           .then((data) => {
    //             let newdata;
    //             data.data[0].length > 0 ? newdata = data.data[0] : newdata = data.data[1]
    //             console.log(newdata);
    //             this.setState({
    //               newCreatedData: newdata[0]
    //             })
    //           });
    //           return res.data.insertId;
    //         })
    //         .then((data) => {
    //           this.setState({
    //             newpostid: data,
    //           });
    //           const img = new FormData();
    //           img.append("data", data);
    //           console.log(data);

    //           // for(let i = 0; i < this.state.imageSelected; i++){
    //           //   img.append(`image`, this.state.imageSelected, `default`);

    //           // }
    //           for (let i = 0; i < this.state.imageSelected.length; i++) {
    //             img.append("image", this.state.imageSelected[i], `default${i}`);
    //           }

    //           axios({
    //             method: "POST",
    //             data: img,
    //             url: "http://localhost:3000/outdocsimage",
    //             headers: { "Content-Type": "multipart/form-data" },
    //             cancelToken: source.token,
    //           }).then((res) => {
    //             console.log(res);
    //             this.componentDidMount()
    //           });
    //         });
    //     } else if (this.state.posttype === "intdocs") {
    //       axios({
    //         method: "POST",
    //         data: fd,
    //         withCredentials: true,
    //         url: "http://localhost:3000/intdocspost",
    //         headers: { "Content-Type": "application/json" },
    //       })
    //         .then((res) => {
    //           axios
    //             .get(`http://localhost:3000/newCreatedpost/${res.data.insertId}/${this.state.posttype}`)
    //             .then((data) => {
    //               let newdata;
    //               data.data[0].length > 0 ? newdata = data.data[0] : newdata = data.data[1]
    //               console.log(newdata);
    //               this.setState({
    //                 newCreatedData: newdata[0]
    //               })
    //             });
    //           return res.data.insertId;
    //         })
    //         .then((data) => {
    //           const img = new FormData();
    //           img.append("data", data);
    //           for (let i = 0; i < this.state.imageSelected.length; i++) {
    //             img.append("image", this.state.imageSelected[i], `default${i}`);
    //           }
    //           axios({
    //             method: "POST",
    //             data: img,
    //             url: "http://localhost:3000/intdocsimage",
    //             headers: { "Content-Type": "multipart/form-data" },
    //           }).then((res) => {});
    //           this.componentDidMount()

    //         });
    //     }
    //     this.componentDidMount();
    //   };



    render() {

        console.log(this.props.empEdu);

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
                                إضافة تدريب جديد
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
                        <div style={{ height: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                تدريبات الموظفين
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20 }} class="input-group">
                                    <span>رقم الأداء  </span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} onDoubleClick={this.clickHandler} type="text" name="first_name" />
                                </div>
                                <button onClick={this.handelSubmit} style={{ position: "relative", right: 10, top: 8 }} type="button" class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة تدريب جديد</button>
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
                                    {/* <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المؤهل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التخصص</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة التخرج</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التقدير</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>مرتبة الشرف</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تفصيل المؤهل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة التخرج</th>





                                            </tr>
                                        </thead>

                                        {this.props.empEdu.map(emp => (
                                            <tbody>
                                                <td>{emp.NAME_ARABIC}</td>
                                                <td>{emp.DEGREE_ARABIC}</td>
                                                <td>{emp.SPECIALITY_ARABIC}</td>
                                                <td>{emp.UNIVERSITY_SCHOOL_ARABIC}</td>
                                                <td>{emp.GRADE_ARABIC}</td>
                                                <td>{emp.WITH_HONORS_IND}</td>
                                                <td>{emp.SPECIALITY_DETAIL_ARABIC}</td>
                                                <td>{emp.GRADUATION_YEAR}</td>










                                            </tbody>
                                        ))}

                                    </table> */}
                                    <p>{this.props.empEdu.length}</p>
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


        empEdu: state.posts.empEdu


    };
};
export default connect(mapStateToProps, {
    getEmpEdu
})(EmpEduDeg);