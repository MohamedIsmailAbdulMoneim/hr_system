import React, { Fragment } from "react";

import { } from "../../actions/TransActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'react-moment';
import 'moment-timezone';
import Pagination from "../Pagination";

class EmpPenalty extends React.Component {
    constructor(props) {
        super(props);
        this.state = { confirmAdd: false, showMsg: false, errorAdd: false, empAppraisal: "null", appraisalYear: "null", rowAppraisal: false, add: false, edit: false, empid: null, empname: null, empnat: null, showNamesResults: false, updated: false, firstArg: 0, secondArg: 20, currentPage: 1, firstArgPerBtn: 0, secondArgPerBtn: 10 };
    }

    changeArgs = (i) => (e) => {
        e.preventDefault()
        this.setState({ currentPage: i })
        if (i == 1) {
            this.setState({ firstArg: (i - 1) * 20, secondArg: i * 20 })

        }
        else if (i > 1) {
            this.setState({ firstArg: (i - 1) * 20 + 1, secondArg: i * 20 })


        }

    }

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
    }

    minusFirstArg = (e) => {
        e.preventDefault()
        if (this.state.firstArgPerBtn > 0) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn - 1, secondArgPerBtn: prevState.secondArgPerBtn - 1, currentPage: prevState.currentPage - 1, firstArg: prevState.firstArg - 10, secondArg: prevState.secondArg - 10 }
            })
        }

        this.changeArgs(this.state.currentPage - 1)
    }

    plusSecondArg = (e) => {
        e.preventDefault()
        let itemsPerPage = Math.ceil(this.props.empApp.length / 20)
        if (this.state.secondArgPerBtn < itemsPerPage) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn + 1, secondArgPerBtn: prevState.secondArgPerBtn + 1, currentPage: prevState.currentPage + 1, firstArg: prevState.firstArg + 10, secondArg: prevState.secondArg + 10 }
            })

        }
        this.changeArgs(this.state.currentPage + 1)

    }


    idInputAddHandler = (e) => {
        this.setState({ empid: e.target.value })
    }

    nameInputAddHandler = (e) => {
        this.setState({ empname: e.target.value })

    }

    submitButtonHandler = (e) => {
        if (!this.state.confirmAdd) {
            this.setState({ confirmAdd: true })
        } else if (this.state.confirmAdd) {
            this.setState({ confirmAdd: false })
        }
    }

    handleNewAppraisal = (e) => {
        let obj = {
            appDate: this.state.appraisalYear, appValue: this.state.empAppraisal, empid: this.state.empid, empname: this.state.empname
        }

        obj.empid = this.state.empid || "null"
        obj.empname = this.state.empname || "null"
        this.props.newAppraisal(obj)
        this.setState({ showMsg: true })

        setTimeout(() => {
            this.setState({ showMsg: false })
        }, 3000)
    }

    idInputHandler = (e) => {

        this.props.getEmpName(e.target.value)
        this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true, showMaritalstate: true })

    }



    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''

    }


    namesOptionshandler = (e) => {
        document.getElementById('empname').value = e.target.value
        if (document.getElementById('nameinputadd')) document.getElementById('nameinputadd').value = e.target.value
        this.setState({ showFamilyResult: true, empname: e.target.value })
    }


    handelAppraisal = (e) => {
        e.preventDefault()
        this.setState({ empAppraisal: e.target.value })
    }

    handelYear = (e) => {
        e.preventDefault()
        this.setState({ appraisalYear: e.target.value })
    }

    handelSearch = () => {
        this.setState({ edit: false, updated: false, firstArg: 0, secondArg: 20, currentPage: 1, firstArgPerBtn: 0, secondArgPerBtn: 10 })
        this.props.getEmpAppraisal(document.getElementById("empid").value, document.getElementById("empname").value, document.getElementById("empapp").value, document.getElementById("year1").value)
    }

    handelEdit_1 = (e) => {
        this.setState({ edit: true, rowAppraisal: e.target.getAttribute("tableId"), empAppraisal: e.target.getAttribute("empApp"), appraisalYear: e.target.getAttribute("empDate"), empnat: e.target.getAttribute("empnatid") })
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")
        }
    }

    closeEditSectionHandler = (e) => {
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({ edit: false })
    }


    handelEdit_2 = (e) => {
        e.preventDefault()
        // let data = { , appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }
        let data = { empNat: this.state.empnat, appraisal: this.state.empAppraisal, year: this.state.appraisalYear }
        this.props.updateEmpAppraisal(data)
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({
            edit: false
        })
        if (this.props.result == 200) {
            this.setState({ updated: true })
        }
    }

    closeAddSectionHandler = (e) => {
        this.setState({
            add: false
        })
    }

    // catClickHandeler = (e) => {

    //     this.setState({ catname: e.target.value })
    //     if (this.refs.selected) {
    //         if (this.refs.selected.options) {
    //             this.refs.selected.options.selectedIndex = 2
    //         }
    //     }

    // }


    render() {
        var dates = [];
        let start = 1996;
        let end = 2021;

        while (start != end) {
            dates.push(start);
            start++;
        }


        let penalty = ["أخرى", "ممتاز", "خصم", "إنذار", "جزاء إداري", "خفض أجر", "للفت نظر", "رفت", "تنبيه", "لوم", "احالة للمعاش", "تأجيل علاوة", "تأجيل ترقية", "خفض درجة ادارية", "إيقاف عن العمل", "الحرمان من العلاوة", "حرمان من نصف علاوة", "انذار كتابي بالفصل", "استبعاد", "حفظ التحقيق", "خصم من الحافز"]

        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "55%",
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
                {this.state.add ?
                    <Fragment>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                                <div style={{ height: "100%", minHeight: 250, width: "50%", minWidth: "750px", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة جزاء جديد</span>
                                        <div></div>
                                    </div>
                                    {this.state.showMsg ? this.props.msg == "تم إدخال الجزاء بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg == "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg == "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input onChange={this.idInputAddHandler} className="form-control" style={{ width: "100%", minWidth: "250px" }} onKeyDown={this.nameInputHandler} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الأسم : </label>
                                            <input onKeyDown={this.nameInputAddHandler} id="nameinputadd" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الجزاء : </label>
                                            <select onChange={this.handelAppraisal} id="empapp" style={{ height: 30, width: "100%", minWidth: "215px" }}>
                                                {penalty.map(apprsl => (
                                                    <option>{apprsl}</option>
                                                ))}
                                                <option selected>اختر ...</option>
                                            </select>
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>التاريخ : </label>
                                            <input onChange={this.handelYear} className="form-control" style={{ width: "100%", minWidth: "250px" }} onKeyDown={this.nameInputHandler} type="text" />
                                        </div>
                                    </div>
                                    <button onClick={this.submitButtonHandler} style={{ width: "92%", margin: "0 auto" }} type="button" class="btn btn-primary btn-block">إضافة جزاء جديد</button>

                                    {this.state.confirmAdd ? <div style={{ width: "100%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة تدرج جديد ؟ <button onClick={this.handleNewAppraisal} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.submitButtonHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}


                                </div>
                            </div>
                        </div>

                    </Fragment> : null
                }
                {
                    this.state.showNamesResults ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                            <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                                {this.props.empNameByName.map((name => (
                                    <option>{name.NAME_ARABIC}</option>
                                )))}
                            </select>
                        </div> : null
                }

                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                        <div style={{ height: "100%", width: 600 }} class="panel panel-default">

                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                <div></div>
                                <span style={{ marginRight: 70 }}>جزاءات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} type="button" class="btn btn-primary">إضافة جزاء جديد</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="name" id="empname" className="form-control" onKeyUp={this.nameInputHandler} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}></label>
                                        <button onClick={this.handelSearch} type="button" style={{ marginRight: 30, marginTop: 6 }} >
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "80%", textAlign: "right" }}>السنة : </label>
                                    <select id="year1" style={{ width: "80%", height: 30 }} onKeyDown={this.handelYear}>
                                        {dates.map(year => (
                                            <option year={year} >{year}</option>
                                        ))}
                                        <option selected>اختر السنة</option>

                                    </select>
                                </div>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "80%", textAlign: "right" }}>الجزاء : </label>
                                    <select id="empapp" style={{ width: "80%", height: 30 }}>
                                        {penalty.map(apprsl => (
                                            <option>{apprsl}</option>
                                        ))}
                                        <option selected>اختر ...</option>

                                    </select>
                                </div>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "100%", textAlign: "right" }}>الإدارة : </label>
                                    <select disabled style={{ width: "100%", minWidth: "120px", height: 30 }}>
                                        {this.props.cates.map(cate => (
                                            <option id={cate.CAT_ID}>
                                                {cate.CAT_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الجزاء</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التاريخ</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empApp.slice(this.state.firstArg, this.state.secondArg).map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{emp.NAME_ARABIC}</td>
                                                    <td>{this.state.edit && this.state.rowAppraisal == emp.id ? <select onChange={this.handelAppraisal} id="empapp" style={{ width: "50%", height: 30 }}>
                                                        {penalty.map(apprsl => (
                                                            <option>{apprsl}</option>
                                                        ))}
                                                        <option selected>اختر الجزاء</option>

                                                    </select> : this.state.updated && this.state.rowAppraisal == emp.id ? this.state.empAppraisal : emp.APPRAISAL_ARABIC}</td>
                                                    <td style={{ width: "10%" }}>{this.state.edit && this.state.rowAppraisal == emp.id ? <input onChange={this.handelYear} value={this.state.appraisalYear} className="form-control" style={{ width: "100%" }} type="text" /> :
                                                        this.state.updated && this.state.rowAppraisal == emp.id ? this.state.appraisalYear : emp.APPRAISAL_DATE}</td>
                                                    <td><i onClick={this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={emp.id} style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.edit ? this.closeEditSectionHandler : null} tableId={emp.id} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                        }
                                    </table>
                                    <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg} firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn} changargs={this.changeArgs} pagesLength={this.props.empApp.length} currentPage={this.state.currentPage} />
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
        empNameByName: state.posts.empNameByName,
        empApp: state.posts.empApp,
        cates: state.posts.cates,
        result: state.trans.result,
        msg: state.trans.msg,
        updatedInf: state.trans.updatedInf,
        result: state.trans.result

    };
};
export default connect(mapStateToProps, {

})(EmpPenalty);