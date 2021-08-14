import React, { Fragment } from "react";
import {
    getEmpDetails, getUpJd, getEmpAppraisal, getEmpEdu, getEmpFamily, getEmpNameByName
} from "../../actions/Actions";
import { getEmpTrans, getEmpExp } from "../../actions/TransActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, FormLabel, FormControl, FormText, FormCheck, Button, Row, Col } from 'react-bootstrap';


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showNamesResults: false };

    }


    empidHandler = (e) => {
        if (e.key === 'Enter') {

            this.props.getEmpDetails(e.target.value)

        }
    }

    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        if (e.key === 'Enter') {
            this.props.getEmpAppraisal("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }

    namesOptionshandler = (e) => {
        this.refs.nameinput.value = ''
        this.props.getEmpDetails('', e.target.value)

        this.setState({ showNamesResults: false })
    }


    empEduButtonHandler = (e) => {
        this.props.getEmpEdu(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
    }

    empTransButtonHandler = (e) => {
        this.props.getEmpTrans(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
        this.props.getUpJd(10, this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null)
    }

    empFamilyButtonHandler = (e) => {
        this.props.getEmpFamily(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
    }

    empAppraisalHandler = (e) => {
        this.props.getEmpAppraisal(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null, "", "")

    }

    empExpHandler = (e) => {
        this.props.getEmpExp("", this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null)

    }

    render() {
        console.log(this.props.empdetails);
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
            <div id="page-wrapper">

                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                        <div style={{ height: "100%", width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <span>بيانات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} style={{ float: "left" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyDown={this.empidHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="name" id="empname" className="form-control" onKeyDown={this.nameInputHandler} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header"><span ref="empname">{this.props.empdetails ? this.props.empdetails.length ? ` الإسم :  ${this.props.empdetails[0].NAME_ARABIC} -  رقم الأداء :${this.props.empdetails[0].EMPLOYEE_ID}` : null : null}</span> <span></span> </h1>
                        {this.state.showNamesResults ?
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                                    {this.props.empNameByName.map((name => (
                                        <option>{name.NAME_ARABIC}</option>
                                    )))}
                                </select>
                            </div> : null}

                        <div className="col-lg-8">
                            <div className="data-wrapper" style={{ background: "transparent", height: "100%", width: "100%" }} >
                                <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input className="form-control" style={{ width: "70%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null} readonly="readonly" type="number" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input ref="nameinput" className="form-control" style={{ width: "130%", marginLeft: 30 }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null} readonly="readonly" type="text" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ العقد : </label>
                                        <input className="form-control" style={{ width: "100%", color: "red" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SECTOR_JOIN_DATE : null : null} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ التعيين : </label>
                                        <input className="form-control" style={{ width: "100%", marginLeft: 30 }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].TRANS_DATE : null : null} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الوظيفة الحالية : </label>
                                        <input className="form-control" style={{ width: "120%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>طريقة شغلها : </label>
                                        <input className="form-control" style={{ width: "120%", marginLeft: 30 }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].WOG : null : null} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", marginRight: 25 }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإدارة : </label>
                                        <input className="form-control" style={{ width: "100%", minWidth: 600 }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", marginRight: 25 }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>النطاق الإشرافي : </label>
                                        <input className="form-control" style={{ width: "100%", minWidth: 600 }} type="text" disabled />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-3%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>المحطة : </label>
                                        <input className="form-control" style={{ width: "80%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>المنطقة : </label>
                                        <input className="form-control" style={{ width: "80%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>المحافظة : </label>
                                        <input className="form-control" style={{ width: "78%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الحالة الوظيفية : </label>
                                        <input className="form-control" style={{ width: "120%" }} type="text" disabled />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>التقسيم السنوي للعام الحالي : </label>
                                        <input className="form-control" style={{ width: "120%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                            </div>
                            <div className="data-wrapper" style={{ background: "transparent", height: "120%", width: "100%", marginTop: 5 }} >
                                <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-3%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الرقم القومي : </label>
                                        <input className="form-control" style={{ width: "80%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NATIONAL_ID_CARD_NO : null : null} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>جهة الإصدار : </label>
                                        <input className="form-control" style={{ width: "80%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ الإصدار : </label>
                                        <input className="form-control" style={{ width: "78%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الرقم التأميني : </label>
                                        <input className="form-control" style={{ width: "100%" }} type="text" disabled />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>مكتب التأمينات : </label>
                                        <input className="form-control" style={{ width: "100%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", marginRight: 25 }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>العنوان : </label>
                                        <input className="form-control" style={{ width: "100%", minWidth: 600 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-3%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الموبايل : </label>
                                        <input className="form-control" style={{ width: "80%" }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تليفون المنزل : </label>
                                        <input className="form-control" style={{ width: "80%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تليفون المكتب : </label>
                                        <input className="form-control" style={{ width: "78%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>البريد الأليكتروني : </label>
                                        <input className="form-control" style={{ width: "100%" }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الحالة الإجتماعية : </label>
                                        <input className="form-control" style={{ width: "100%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-3%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>نوع النقابة : </label>
                                        <input className="form-control" style={{ width: "80%" }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم العضوية : </label>
                                        <input className="form-control" style={{ width: "80%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ العضوية : </label>
                                        <input className="form-control" style={{ width: "78%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "3%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الموقف من التجنيد : </label>
                                        <input className="form-control" style={{ width: "50%" }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>يوم : </label>
                                        <input className="form-control" style={{ width: "30%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>شهر : </label>
                                        <input className="form-control" style={{ width: "30%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>سنة : </label>
                                        <input className="form-control" style={{ width: "30%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ التقاعد : </label>
                                        <input className="form-control" style={{ width: "40%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-15%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>النوع : </label>
                                        <input className="form-control" style={{ width: "100%" }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الديانة : </label>
                                        <input className="form-control" style={{ width: "100%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div className="data-wrapper" style={{ display: "flex", justifyContent: "space-around", marginRight: "-3%" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ الميلاد : </label>
                                        <input className="form-control" style={{ width: "80%" }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>جهة الميلاد : </label>
                                        <input className="form-control" style={{ width: "80%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>محافظة الميلاد : </label>
                                        <input className="form-control" style={{ width: "78%", marginLeft: 30 }} type="text" readonly="readonly" />
                                    </div>
                                </div>
                            </div>
                            {/* <div style={{ display: "flex" }}>
                                    <div style={{ width: "20%" }}>
                                        <label style={{ marginLeft: "5%", marginRight: 20, fontSize: "10pt", textAlign: "right" }} for="payroll"> رقم الأداء :</label>
                                        <input  style={{ width: "100%", marginRight: "5%" }} type="text" id="payroll"></input>
                                    </div>

                                    <label style={{ marginRight: "5%", marginLeft: "5%" }} for="name">الإسم :</label>
                                    <input style={{ width: "50%" }} type="text" id="name"  />
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "5%" }} for="doa">تاريخ العقد  :</label>
                                    <input style={{ width: "20%" }} type="text" id="doa" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SECTOR_JOIN_DATE : null : null}></input>
                                    <label style={{ marginRight: "5%", marginLeft: "5%" }} for="doj">تاريخ التعيين :</label>
                                    <input type="text" id="doj" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].TRANS_DATE : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: "5%" }} for="cj">الوظيفة الحالية  :</label>
                                    <input type="text" id="cj" place={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null}></input>
                                    <label style={{ marginLeft: "5%" }} for="js">طريقة شغلها :</label>
                                    <input type="text" id="js" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].WOG : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: "1%", marginLeft: "1%" }} for="dep">الإدارة  :</label>
                                    <input style={{ width: "80%" }} type="text" id="dep" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label for="m">النطاق الإشرافي  :</label>
                                    <input style={{ width: "80%" }} type="text" id="m"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label for="station">المحطة  :</label>
                                    <input type="text" id="station" style={{ width: "20%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} ></input>
                                    <label style={{ marginLeft: "1%" }} for="area">المنطقة  :</label>
                                    <input type="text" id="area" style={{ width: "20%" }}></input>
                                    <label style={{ marginLeft: "1%" }} for="city">المحافظة  :</label>
                                    <input type="text" id="city" style={{ width: "20%" }}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "1%" }} for="js">الحالة الوظيفية  :</label>
                                    <input type="text" id="js" style={{ width: "30%" }}></input>
                                    <label style={{ marginLeft: "1%" }} for="c">التقسيم السنوي للعالم الحالي :</label>
                                    <input type="text" id="c" style={{ width: "30%" }}></input>
                                </div>
                                <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label for="id">الرقم القومي  :</label>
                                    <input type="text" id="id" style={{ width: "30%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NATIONAL_ID_CARD_NO : null : null} ></input>
                                    <label for="w">جهة الإصدار :</label>
                                    <input type="text" id="w" style={{ width: "10%" }}></input>
                                    <label for="d">تاريخ الإصدار :</label>
                                    <input type="text" id="d" style={{ width: "15%" }}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="ii">الرقم التأميني  :</label>
                                    <input type="text" id="ii" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SOCIAL_INSURANCE_NUMBER : null : null}></input>
                                    <label style={{ marginLeft: 20 }} for="io">مكتب التأمينات :</label>
                                    <input type="text" id="io"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="adress">العنوان  :</label>
                                    <input type="text" id="adress" style={{ width: "70%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].ADDRESS : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "1%" }} for="mob">الموبايل  :</label>
                                    <input type="text" id="mob" style={{ width: "20%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_3_MOBILE : null : null}></input>
                                    <label style={{ marginLeft: "1%" }} for="h">ت المنزل :</label>
                                    <input type="text" id="h" style={{ width: "20%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_1_HOME : null : null}></input>
                                    <label style={{ marginLeft: "1%" }} for="office">المكتب :</label>
                                    <input type="text" id="office" style={{ width: "20%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_1_OFFICE : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="email">البريد الألكتروني  :</label>
                                    <input type="text" id="email" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMP_EMAIL : null : null}></input>
                                    <label style={{ marginLeft: 20 }} for="ms">الحالة الإجتماعية :</label>
                                    <input type="text" id="ms"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "2%" }} for="syt">نوع النقابة  :</label>
                                    <input type="text" id="syt" style={{ width: "15%" }}></input>
                                    <label style={{ marginLeft: "2%" }} for="memnum">رقم العضوية :</label>
                                    <input type="text" id="memnum" style={{ width: "15%" }}></input>
                                    <label style={{ marginLeft: "2%" }} for="memdate">تاريخ العضوية :</label>
                                    <input type="text" id="memdate" style={{ width: "15%" }}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "1%" }} for="milstate">الموقف من التجنيد  :</label>
                                    <input type="text" id="milstate" style={{ width: "15%" }}></input>
                                    <input style={{ width: "5%", marginLeft: "2%", marginRight: "2%" }} type="text"></input>
                                    <input style={{ width: "5%", marginLeft: "2%", marginRight: "2%" }} type="text"></input>
                                    <input style={{ width: "10%", marginLeft: "2%", marginRight: "2%" }} type="text"></input>
                                    <label style={{ marginLeft: "2%" }} for="memdate">تاريخ التقاعد :</label>
                                    <input type="text" id="memdate" style={{ width: "15%" }}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="sex">النوع  :</label>
                                    <input type="text" id="sex"></input>
                                    <label style={{ marginLeft: 20 }} for="rel">الديانة :</label>
                                    <input type="text" id="rel"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "1%" }} for="dob">تاريخ الميلاد  :</label>
                                    <input type="text" id="dob" style={{ width: "15%" }}></input>
                                    <label style={{ marginLeft: "1%" }} for="aob">جهة الميلاد :</label>
                                    <input type="text" id="aob" style={{ width: "15%" }}></input>
                                    <label style={{ marginLeft: "1%" }} for="cob">محافظة الميلاد :</label>
                                    <input type="text" id="cob" style={{ width: "15%" }}></input>
                                </div> */}

                        </div>
                        <div style={{ display: "flex", height: "100%", minHeight: "1000px" }} className="col-lg-4">
                            <div style={{ background: "transparent", height: 750, width: "100%" }} >
                                <img style={{ borderTop: 3 }} src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empedudeg`}><a onClick={this.empEduButtonHandler} href="/empedudeg">المؤهل</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg" ><Link to={`/EmpTrans`}><a onClick={this.empTransButtonHandler} href="/EmpTrans">التدرج</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empexperience`}><a onClick={this.empExpHandler} href="/empexperience">الخبرات</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empfamily`}><a onClick={this.empFamilyButtonHandler} href="/empfamily">العائلية</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">التدريب</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">الجزاءات</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">الهيكل</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">بطاقة الوصف</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empsappraisal`}><a onClick={this.empAppraisalHandler} href="/empsappraisal">التقييمات السنوية</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">طباعة البيانات الوظيفية</button>
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
        empdetails: state.posts.empdetails,
        empNameByName: state.posts.empNameByName,
    };
};
export default connect(mapStateToProps, {
    getEmpDetails, getEmpTrans, getUpJd, getEmpAppraisal, getEmpEdu, getEmpFamily, getEmpNameByName, getEmpExp
})(Employee);