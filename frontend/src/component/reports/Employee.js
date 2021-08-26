import React, { Fragment } from "react";
import {
    getEmpDetails, getUpJd, getEmpAppraisal, getEmpNameByName
} from "../../actions/Actions";
import { getEmpTrans, getEmpExp, getEmpFamily,getEmpEdu } from "../../actions/TransActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, FormLabel, FormControl, FormText, FormCheck, Button, Row, Col } from 'react-bootstrap';


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            add: false, showNamesResults: false, addEmpId: "", addEmpName: "", addDoc: "", addDoj: "", addCj: "", addJasf: "", addMangement: "",
            addaos: "", addStation: "", addArea: "", addGovern: "", addJS: "", addEmpNid: "",
            addPOIssuance: "", addDOIssuance: "", addinsuranceNum: "", addinsuranceOffice: "", addAddress: "", addMPhoneNum: "",
            addHPhoneNum: "", addOPhoneNum: "", addEmail: "", addMarStatus: "", addSyndicateType: "", addMemberShipNum: "",
            addMemberShipDate: "", addMirStatus: "", addDaysCountMir: "", addMonthsCountMir: "", addYearsCountMir: "",
            addRetirementDate: "", addSexType: "", addReligous: "", addDob: "", addPob: "", addGob: ""
        };
    }

    handleArrToSend = (e) => {
        let state = this.state
        let empid = state.addEmpId
        let empname = `"${state.addEmpName}"`
        let doc = `"${state.addDoc}"`
        let addcj = `"${state.addCj}"`
        let addjasf = `"${state.addJasf}"`
        let addMangement = `"${state.addMangement}"`
        let addaos = `"${state.addaos}"`
        let addStation = `"${state.addStation}"`
        let addArea = `"${state.addArea}"`
        let addGovern = `"${state.addGovern}"`
        let addJS = `"${state.addJS}"`
        let addEmpNid = `"${state.addEmpNid}"`
        let addPOIssuance = `"${state.addPOIssuance}"`
        let addDOIssuance = `"${state.addDOIssuance}"`
        let addinsuranceNum = `"${state.addinsuranceNum}"`
        let addinsuranceOffice = `"${state.addinsuranceOffice}"`
        let addAddress = `"${state.addAddress}"`
        let addMPhoneNum = `"${state.addMPhoneNum}"`
        let addHPhoneNum = `"${state.addHPhoneNum}"`
        let addOPhoneNum = `"${state.addOPhoneNum}"`
        let addEmail = `"${state.addEmail}"`
        let addMarStatus = `"${state.addMarStatus}"`
        let addSyndicateType = `"${state.addSyndicateType}"`
        let addMemberShipNum = `"${state.addMemberShipNum}"`
        let addMemberShipDate = `"${state.addMemberShipDate}"`
        let addMirStatus = `"${state.addMirStatus}"`
        let addDaysCountMir = `"${state.addDaysCountMir}"`
        let addMonthsCountMir = `"${state.addMonthsCountMir}"`
        let addYearsCountMir = `"${state.addYearsCountMir}"`
        let addRetirementDate = `"${state.addRetirementDate}"`
        let addSexType = `"${state.addSexType}"`
        let addReligous = `"${state.addReligous}"`
        let addDob = `"${state.addDob}"`
        let addPob = `"${state.addPob}"`
        let addGob = `"${state.addGob}"`

        let data = [
            empid, empname, doc, addcj, addjasf, addjasf, addMangement, addaos, addStation, addArea, addGovern
            , addJS, addEmpNid, addPOIssuance, addDOIssuance, addinsuranceNum, addinsuranceOffice, addAddress,
            addMPhoneNum, addHPhoneNum, addOPhoneNum, addOPhoneNum, addEmail, addMarStatus, addSyndicateType, addMemberShipNum,
            addMemberShipDate, addMirStatus, addDaysCountMir, addMonthsCountMir, addYearsCountMir, addRetirementDate, addSexType,
            addReligous, addDob, addPob, addGob
        ]

        console.log(data);




        if (
            state.addDoc.length < 1 || state.addCj.length < 1 || state.addJasf.length < 1 || state.addMangement.length < 1 ||
            state.addaos.length < 1 || state.addStation.length < 1 || state.addArea.length < 1 || state.addGovern.length < 1 || state.addJS.length < 1 ||
            state.addEmpNid.length < 1 || state.addPOIssuance.length < 1 || state.addDOIssuance.length < 1 || state.addinsuranceNum.length < 1 ||
            state.addinsuranceOffice.length < 1 || state.addAddress.length < 1 || state.addMPhoneNum.length < 1 || state.addHPhoneNum.length < 1 ||
            state.addOPhoneNum.length < 1 || state.addEmail.length < 1 || state.addMarStatus.length < 1 || state.addSyndicateType.length < 11 ||
            state.addMemberShipNum.length < 1 || state.addMemberShipDate.length < 1 || state.addMirStatus.length < 1 || state.addDaysCountMir.length < 1 ||
            state.addMonthsCountMir.length < 1 || state.addYearsCountMir.length < 1 || state.addRetirementDate.length < 1 || state.addSexType.length < 1 ||
            state.addReligous.length < 1 || state.addDob.length < 1 || state.addPob.length < 1 || state.addGob.length < 1
        ) {

        }
    }

    addButtonHandler = (e) => {
        this.setState({
            add: true
        })
    }

    addEmpIdHandler = (e) => {
        this.setState({
            addEmpId: e.target.value
        })
    }


    addEmpNameHandler = (e) => {
        this.setState({
            addEmpName: e.target.value
        })
    }

    addDocHandler = (e) => {
        this.setState({
            addDoc: e.target.value
        })
    }

    addCjHandler = (e) => {
        this.setState({ addCj: e.target.value })
    }

    addJasfHandler = (e) => {
        this.setState({ addJasf: e.target.value })

    }

    addMangementHandler = (e) => {
        this.setState({ addMangement: e.target.value })
    }

    addaosHandler = (e) => {
        this.setState({ addaos: e.target.value })

    }

    addStationHandler = (e) => {
        this.setState({ addStation: e.target.value })

    }

    addAreaHandler = (e) => {
        this.setState({ addArea: e.target.value })

    }

    addGovernHandler = (e) => {
        this.setState({ addGovern: e.target.value })

    }

    addJSHandler = (e) => {
        this.setState({ addJS: e.target.value })

    }

    addEmpNidHandler = (e) => {
        this.setState({ addEmpNid: e.target.value })

    }

    addPOIssuanceHandler = (e) => {
        this.setState({ addPOIssuance: e.target.value })

    }

    addDOIssuanceHandler = (e) => {
        this.setState({ addDOIssuance: e.target.value })

    }

    addinsuranceNumHandler = (e) => {
        this.setState({ addinsuranceNum: e.target.value })

    }

    addinsuranceOfficeHandler = (e) => {
        this.setState({ addinsuranceOffice: e.target.value })

    }

    addAddressHandler = (e) => {
        this.setState({ addAddress: e.target.value })

    }

    addMPhoneNumHandler = (e) => {
        this.setState({ addMPhoneNum: e.target.value })

    }

    addHPhoneNumHandler = (e) => {
        this.setState({ addHPhoneNum: e.target.value })

    }

    addOPhoneNumHandler = (e) => {
        this.setState({ addOPhoneNum: e.target.value })

    }

    addEmailNumHandler = (e) => {
        this.setState({ addEmail: e.target.value })

    }

    addMarStatusNumHandler = (e) => {
        this.setState({ addMarStatus: e.target.value })

    }

    addSyndicateTypeNumHandler = (e) => {
        this.setState({ addSyndicateType: e.target.value })

    }

    addMemberShipNumHandler = (e) => {
        this.setState({ addMemberShipNum: e.target.value })

    }

    addMemberShipDateHandler = (e) => {
        this.setState({ addMemberShipDate: e.target.value })

    }

    addMirStatusHandler = (e) => {
        this.setState({ addMirStatus: e.target.value })

    }

    addDaysCountMirHandler = (e) => {
        this.setState({ addDaysCountMir: e.target.value })
    }

    addMonthsCountMirHandler = (e) => {
        this.setState({ addMonthsCountMir: e.target.value })
    }

    addYearsCountMirHandler = (e) => {
        this.setState({ addYearsCountMir: e.target.value })
    }

    addRetirementDateHandler = (e) => {
        this.setState({ addRetirementDate: e.target.value })
    }

    addSexTypeHandler = (e) => {
        this.setState({ addSexType: e.target.value })
    }

    addReligousHandler = (e) => {
        this.setState({ addReligous: e.target.value })
    }

    addDobHandler = (e) => {
        this.setState({ addDob: e.target.value })
    }


    addGobHandler = (e) => {
        this.setState({ addGob: e.target.value })
    }

    /* _____________________________________________________ */






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

                        {this.state.add ?
                            <div className="col-lg-8">
                                <div className="data-wrapper" style={{ background: "transparent", height: "100%", width: "100%" }} >
                                    <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt small-lable">رقم الأداء</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpIdHandler} className="form-control chodt small-input" type="number" />
                                            </div>

                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf" >الإسم</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpNameHandler} ref="nameinput" className="form-control chodt medium-input" type="text" />
                                            </div>
                                        </div>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt small-lable" >تاريخ العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDocHandler} className="chodt form-control medium-input" type="text" />
                                            </div>
                                        </div>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">الوظيفة الحالية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addCjHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">طريقة شغلها</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addJasfHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 60 }}>الإدارة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMangementHandler} style={{ marginRight: 90 }} className="form-control chodt giant-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" style={{ marginRight: 30 }}>النطاق الإشرافي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addaosHandler} style={{ marginRight: 50 }} className="form-control chodt giant-input" type="text" />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>المحطة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addStationHandler} style={{ marginRight: 70 }} className="form-control  small-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 70, marginTop: 20 }} className="small-lable">المنطقة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addAreaHandler} style={{ marginRight: 70 }} className="form-control  small-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 60 }} className="small-lable">المحاظة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addGovernHandler} style={{ marginRight: 70 }} className="form-control  small-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" style={{ marginRight: 30 }}>الحالة الوظيفية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addaosHandler} style={{ marginRight: 50 }} className="form-control chodt giant-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>الرقم القومي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpNidHandler} style={{ marginRight: 70 }} className="form-control medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">جهة الإصدار</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addPOIssuanceHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">تاريخ الإصدار</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDOIssuanceHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">الرقم التأميني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addinsuranceNumHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">مكتب التأمينات</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addinsuranceOfficeHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 55 }}>العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addAddressHandler} style={{ marginRight: 90 }} className="form-control chodt giant-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>ت. المنزل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addHPhoneNumHandler} style={{ marginRight: 70 }} className="form-control medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">ت. المكتب</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addOPhoneNumHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">الموبايل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMPhoneNumHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">البريد الأليكتروني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmailNumHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">الحالة الإجتماعية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMarStatusNumHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>نوع النقابة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addSyndicateTypeNumHandler} style={{ marginRight: 70 }} className="form-control medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">رقم العضوية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMemberShipNumHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">تاريخ العضوية </label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMemberShipDateHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" style={{ marginRight: 30 }}>الموقف من التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMirStatusHandler} style={{ marginRight: 50 }} className="form-control small-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 30 }}>مدة التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDaysCountMirHandler} style={{ marginRight: 10 }} className="form-control  small-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMonthsCountMirHandler} style={{ marginRight: 10 }} className="form-control  small-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addYearsCountMirHandler} style={{ marginRight: 10 }} className="form-control  small-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 40, marginTop: 20 }} className="small-lable">تاريخ التقاعد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addRetirementDateHandler} style={{ marginRight: 10 }} className="form-control  small-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">النوع</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addSexTypeHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">الديانة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addReligousHandler} className="form-control chodt medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>تاريخ الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDobHandler} style={{ marginRight: 70 }} className="form-control medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">جهة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addPobHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">محافظة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addGobHandler} style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <button style={{ marginRight: 180, marginTop: 20, width: 650 }} onClick={this.handleArrToSend} className="btn btn-primary btn-block">إضافة</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <div className="col-lg-8">
                                <div className="data-wrapper" style={{ background: "transparent", height: "100%", width: "100%" }} >
                                    <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt small-lable">رقم الأداء</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt small-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null} readonly="readonly" type="number" />
                                            </div>

                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf" >الإسم</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input ref="nameinput" className="form-control chodt medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null} type="text" />
                                            </div>
                                        </div>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt small-lable" >تاريخ العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="chodt form-control medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SECTOR_JOIN_DATE : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf small-lable">تاريخ التعيين</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="chodt form-control medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].TRANS_DATE : null : null} type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">الوظيفة الحالية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">طريقة شغلها</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].WOG : null : null} type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 60 }}>الإدارة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 90 }} className="form-control chodt giant-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null} type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" style={{ marginRight: 30 }}>النطاق الإشرافي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 50 }} className="form-control chodt giant-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null} type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>المحطة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control  small-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 70, marginTop: 20 }} className="small-lable">المنطقة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 60 }} className="small-lable">المحاظة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">الوظيفة الحالية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">تقييم العام</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>الرقم القومي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control medium-medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">المنطقة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">المحاظة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">الرقم التأميني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">مكتب التأمينات</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 55 }}>العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 90 }} className="form-control chodt giant-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null} type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>ت. المنزل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control medium-medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">ت. المكتب</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">الموبايل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">البريد الأليكتروني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">الحالة الإجتماعية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>نوع النقابة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control medium-medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">رقم العضوية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">تاريخ العضوية </label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>موقف التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control small-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 100 }} className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 20, marginTop: 20 }} className="small-lable">تاريخ التقاعد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  small-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt medium-lable">النوع</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="chodt nf medium-lable">الديانة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control chodt medium-input" type="text" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="small-lable" style={{ marginRight: 40 }}>تاريخ الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 70 }} className="form-control medium-medium-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10, marginTop: 20 }} className="small-lable">جهة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label style={{ marginRight: 10 }} className="small-lable">محافظة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input style={{ marginRight: 20 }} className="form-control  medium-medium-input" type="text" readonly="readonly" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
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
                                    <button onClick={this.addButtonHandler} style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170, background: "#4f4f63", color: "white" }} type="button" class="btn btn-outline btn-lg btn-primary">إضافة موظف جديد</button>

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