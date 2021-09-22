import React, { Fragment } from "react";
import {

    getEmpByDeps, getEmpName, getEmpNameByName, getEmpAppraisal

} from "../../actions/Actions";
import { newAppraisal, getEmpExp, newEmpExp,deleteEmpExperience } from "../../actions/TransActions"
import { connect } from "react-redux";
import axios from "axios";
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

class EmpExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poe: []
            , job: [],
            from: []
            , to: []
            , length: 0, exp: [], empNameAdd: "", empIdAdd: "", empNameSearch: "", empIdSearch: ""
            , finalData: [], showFamilyResult: true, editExpTyp: "" ,editPlaceOfExp: "", editJobOfExp: "", editFromOfExp: "", editToOfExp: "",
            confirmAdd: false, showMsg: false, errorAdd: false,
            add: false, edit: false,delete:false,
            empid: null, empname: null, catname: null, catid: null, showNamesResults: false, rowExp: ""
        };
    }

    poeHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index, expType: e.target.getAttribute('uniqueIndex') }
        this.setState({
            [selectedArr]: newArr
        })


    }

    jobHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index, expType: e.target.getAttribute('uniqueIndex') }
        this.setState({
            [selectedArr]: newArr
        })
    }

    fromHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index, expType: e.target.getAttribute('uniqueIndex') }
        this.setState({
            [selectedArr]: newArr
        })


    }

    toHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index, expType: e.target.getAttribute('uniqueIndex') }
        this.setState({
            [selectedArr]: newArr
        })
    }

    addExp = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                length: prevState.length + 1,
                poe: [...this.state.poe, " "],
                job: [...this.state.job, " "],
                from: [...this.state.from, " "],
                to: [...this.state.to, " "]
            }
        })
    }


    deleteExp = (e) => {
        let selectedArr = e.target.getAttribute('uClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArrOfPoe = [...this.state.poe]
        let newArrOfJob = [...this.state.job]
        let newArrOfFrom = [...this.state.from]
        let newArrOfTo = [...this.state.to]
        if (index !== -1) {
            newArrOfPoe.splice(index, 1)
            newArrOfJob.splice(index, 1)
            newArrOfFrom.splice(index, 1)
            newArrOfTo.splice(index, 1)
        }
        this.setState(prevState => {
            return {
                length: prevState.length - 1,
                poe: newArrOfPoe,
                job: newArrOfJob,
                from: newArrOfFrom,
                to: newArrOfTo

            }
        })
    }

    expHandler = (exps) => {
        let exp = []
        for (let i = 0; i <= exps; i++) {
            if (i > 0) {
                exp.push(
                    <div div className="form-group" controlId="formBasicEmail" >
                        {this.state.add ? <div style={{ height: 50 }}> <i uClass={'Exp'} uIndex={4} onClick={this.deleteExp} style={{ fontSize: 15, float: "right", marginRight: 20 }} class="fas fa-times-circle Exp"></i></div> : null}
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ minWidth: 315, width: "100%", textAlign: "right" }}>نوع الخبرة : </label>
                                <select style={{ minWidth: 315, height: 34, width: "100%", borderRadius: 5 }} onChange={this.catClickHandeler}>
                                    <option>
                                        خدمة عسكرية
                                    </option>
                                    <option>
                                        خبرة داخل القطاع
                                    </option>
                                    <option>
                                        خبرة خارج القطاع
                                    </option>
                                    <option selected>
                                        اختر ...
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>جهة الخبرة : </label>
                                <input onChange={this.poeHandler} uniqueClass={'poe'} uniqueIndex={4} ref="nameinput" className="form-control poe" style={{ width: "100%", minWidth: "250px" }} type="text" required />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>الوظيفة : </label>
                                <input onChange={this.jobHandler} uniqueClass={'job'} uniqueIndex={4} ref="nameinput" className="form-control job" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>من : </label>
                                <input onChange={this.fromHandler} uniqueClass={'from'} uniqueIndex={4} ref="nameinput" className="form-control from" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>إلى : </label>
                                <input onChange={this.toHandler} uniqueClass={'to'} uniqueIndex={4} ref="nameinput" className="form-control to" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                        </div>
                    </div >)
            }
        }
        return exp;
    };

    handleArrToSend = (e) => {
        var state = this.state
        var arrays = state.poe.concat(state.job, state.from, state.to)
        var emptyInputs = arrays.find(i => i.length <= 1) || null
        let arr = []
        let nameOrId;
        if (this.state.empNameAdd) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empNameAdd}"))`
        } else if (this.state.empIdAdd) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empIdAdd}))`
        }
        if (emptyInputs != undefined) {
        } else if (emptyInputs == undefined && (this.state.empNameAdd || this.state.empIdAdd)) {
            let militerExp = arrays.filter(el => el.expType == 1)
            if (militerExp.length > 0) {
                let i = militerExp.length / 4
                while (i > 0) {
                    let smallArr = []
                    var arrloop = militerExp.filter(el => el.key == i - 1)
                    console.log(arrloop);
                    smallArr.push(`("${arrloop[0].value}"`)
                    smallArr.push(`"${arrloop[1].value}"`)
                    smallArr.push(`"${arrloop[2].value}"`)
                    smallArr.push(`"${arrloop[3].value}"`)
                    smallArr.push(arrloop[0].expType)
                    smallArr.push(`"true"`)
                    smallArr.push(nameOrId)
                    arr.push(smallArr)
                    i--
                }
            }
            let innerExp = arrays.filter(el => el.expType == 3)

            if (innerExp.length > 0) {
                let i = innerExp.length / 4
                while (i > 0) {
                    let smallArr = []
                    var arrloop = innerExp.filter(el => el.key == i - 1)
                    console.log(arrloop);
                    smallArr.push(`("${arrloop[0].value}"`)
                    smallArr.push(`"${arrloop[1].value}"`)
                    smallArr.push(`"${arrloop[2].value}"`)
                    smallArr.push(`"${arrloop[3].value}"`)
                    smallArr.push(arrloop[0].expType)
                    smallArr.push(`"true"`)
                    smallArr.push(nameOrId)
                    arr.push(smallArr)
                    i--
                }
                this.props.newEmpExp(arr)
            }
            let outerExp = arrays.filter(el => el.expType == 4)
            if (outerExp.length > 0) {
                let i = outerExp.length / 4
                while (i > 0) {
                    let smallArr = []
                    var arrloop = outerExp.filter(el => el.key == i - 1)
                    console.log(arrloop);
                    smallArr.push(`("${arrloop[0].value}"`)
                    smallArr.push(`"${arrloop[1].value}"`)
                    smallArr.push(`"${arrloop[2].value}"`)
                    smallArr.push(`"${arrloop[3].value}"`)
                    smallArr.push(arrloop[0].expType)
                    smallArr.push(`"true"`)
                    smallArr.push(nameOrId)
                    arr.push(smallArr)
                    i--
                }
            }
            this.setState({
                confirmAdd: true, finalData: arr
            })
        }
        console.log(arr);
    }

    submitButtonHandler = (e) => {
        if (!this.state.confirmAdd) {
            this.setState({ confirmAdd: true })
        } else if (this.state.confirmAdd) {
            this.setState({ confirmAdd: false })
        }
    }

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
    }


    idInputHandlerForAdd = (e) => {
        this.setState({ empIdAdd: e.target.value })
        this.refs.nameAdd.value = ''

    }

    nameInputHandlerForAdd = (e) => {
        this.setState({ empNameAdd: e.target.value })
        this.refs.idAdd.value = ''
    }

    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.props.getEmpFamily("", e.target.value)
        this.setState({ showFamilyResult: true, showMaritalstate: true })
    }
    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpExp("", e.target.value)
        }
    }

    idInputHandlerForSearch = (e) => {
        this.refs.empname.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpExp(e.target.value, "")
            this.setState({ empIdSearch: e.target.value })
        }
    }

    handleExpTime = (startDate, endDate) => {

        const start = moment(startDate);
        const end = moment(endDate);
        const diff = end.diff(start);
        const diffDuration = moment.duration(diff);
        return diffDuration;
    }

    handleNewExp = (e) => {
        this.props.newEmpExp(this.state.finalData)
        console.log(this.state.finalData);
        this.setState({
            confirmAdd: false, showMsg: true
        })
    }

        /* ______________________________ */

        editPlaceOfExpHandler = (e) => {
            this.setState({ editPlaceOfExp: e.target.value })
        }
    
        editJobOfExpHandler = (e) => {
            this.setState({ editJobOfExp: e.target.value })
        }
    
        editFromOfExpHandler = (e) => {
            this.setState({ editFromOfExp: e.target.value })
        }
    
        editToOfExpHandler = (e) => {
            this.setState({ editToOfExp: e.target.value })
        }
    
        handelEdit_1 = (e) => {
            this.setState({
                edit: true, rowExp: e.target.getAttribute("tableId"),editExpTyp: e.target.getAttribute("expType") 
                ,editPlaceOfExp: e.target.getAttribute("placeName"), editJobOfExp: e.target.getAttribute("jobName"),
                editFromOfExp: e.target.getAttribute("startDate"), editToOfExp: e.target.getAttribute("endDate")
            })
            let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
            for (let i = 0; i < tds.length; i++) {
                tds[i].style.background = "white"
                tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
                tds[tds.length - 2].childNodes[0].classList.add("fa-check")
                tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
                tds[tds.length - 1].childNodes[0].classList.add("fa-times")
            }
        }
    
        handelEdit_2 = (e) => {
            e.preventDefault()
            let expType = `EXP_TYP_CODE = ${this.state.editExpTyp}`
            let placeOfExp = `PLACE_NAME = "${this.state.editPlaceOfExp}"`
            let jobOfExp = `JOB_NAME = "${this.state.editJobOfExp}"`
            let fromOfExparName = `START_DATE = "${this.state.editFromOfExp}"`
            let toOfExp = `END_DATE = "${this.state.editToOfExp}"`
            let lastSentence = this.state.rowExp
    
            let data = [expType,placeOfExp, jobOfExp, fromOfExparName, toOfExp, lastSentence]
    
            axios({
                method: "PUT",
                data: data,
                url: `http://localhost:5000/editempexp`,
                headers: { "Content-Type": "application/json" },
            }).then(data => {
                console.log(data.data.msg);
                if (data.data.msg == "تم إدخال البيانات بنجاح") {
                    this.setState({
                        updated: true
                    })
                } else {
                    this.setState({
                        updated: false
                    })
                }
            })
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
        deleteHandler = (e) => {
            this.setState({ delete: true })
            let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
            for (let i = 0; i < tds.length; i++) {
                tds[i].style.background = "white"
                tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
                tds[tds.length - 2].childNodes[0].classList.add("fa-check")
                tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
                tds[tds.length - 1].childNodes[0].classList.add("fa-times")
            }
        }
    
        closeDeleteSectionHandler = (e) => {
            let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
            for (let i = 0; i < tds.length; i++) {
                tds[i].style.background = "transparent"
                tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
                tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
                tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
                tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
            }
            this.setState({ delete: false })
        }
        confirmDelete = (e) => {
            let data = [e.target.getAttribute("tableId"), e.target.getAttribute("expType"),e.target.getAttribute("natIdCard")]
            console.log(data);
            this.props.deleteEmpExperience(data)
            this.setState({ delete: false })
            let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
            for (let i = 0; i < tds.length; i++) {
                tds[i].style.background = "transparent"
                tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
                tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
                tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
                tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
            }
        }
    
    
    
    
        /* ___________________________________ */

    render() {
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

        console.log(this.props.msg);

        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span style={{ position: "relative", right: 50 }}>إضافة بيانات جديدة</span>
                                <div style={{ height: "100%", minHeight: 150, width: "70%", minWidth: "450", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                        {/* <input style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" onSubmit={this.handelInsertNewTrans} value="Add" /> */}
                                        <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addExp} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة خبرة جديدة</span><i class="fas fa-user-plus"></i> </button>

                                    </div>
                                    {this.state.showMsg ? this.props.msg == "تم إدخال البيانات بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg == "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg == "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}

                                    <div style={{ display: "flex", justifyContent: "space-around" }}>

                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input onChange={this.idInputHandlerForAdd} ref="idAdd" className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                            <input onChange={this.nameInputHandlerForAdd} ref="nameAdd" id="nameinputadd" className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    {this.state.length === 0 ? null : this.expHandler(this.state.length)}

                                    <button onClick={this.handleArrToSend} style={{ marginLeft: 62, marginBottom: 15, float: "left", display: "block" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>
                                    {this.state.confirmAdd ? <div style={{ width: "100%", marginTop: 50 }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة بيانات جديدة ؟ <button onClick={this.handleNewExp} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.submitButtonHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}

                                </div>
                            </div>
                        </div>
                    </div> : null
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

                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <span>خبرات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} style={{ float: "left" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>

                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyDown={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="name" ref="empname" className="form-control" onChange={this.nameInputHandlerForSearch} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    {this.props.empexp.length >= 1 ? <h1>بيان بخبرة السيد  : {this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].NAME_ARABIC : null} - رقم أداء : {this.props.empname.length >= 1 ? this.props.empname[0].EMPLOYEE_ID : this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].EMPLOYEE_ID : null} </h1> : null}
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                                خبرة داخل القطاع
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة الخبرة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الوظيفة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>من</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>إلى</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>يوم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>شهر</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empexp.length >= 1 ? this.props.empexp[2].length >= 1 ? this.props.empexp[2].map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editPlaceOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" /> : emp.PLACE_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editJobOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" /> : emp.JOB_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editFromOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" /> : emp.START_DATE}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editToOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" /> : emp.END_DATE}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).days()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).months()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).years()}</td>
                                                    <td><i onClick={ this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} style={{ fontSize: 20 }} tableId={emp.id} expType={emp.EXP_TYP_CODE} natIdCard={emp.NATIONAL_ID_CARD_NO} placeName={emp.PLACE_NAME} jobName={emp.JOB_NAME} startDate={emp.START_DATE} endDate={emp.END_DATE} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} expType={emp.EXP_TYP_CODE} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colspan="9">لاتوجد بيانات</td>
                                                </tr>
                                            </tbody>
                                            : null}

                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                                خبرة خارج القطاع
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة الخبرة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الوظيفة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>من</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>إلى</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>يوم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>شهر</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empexp.length >= 1 ? this.props.empexp[1].length >= 1 ? this.props.empexp[1].map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editPlaceOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" /> : emp.PLACE_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editJobOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" /> : emp.JOB_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editFromOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" /> : emp.START_DATE}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editToOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" /> : emp.END_DATE}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).days()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).months()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).years()}</td>
                                                    <td><i onClick={ this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} style={{ fontSize: 20 }} tableId={emp.id} expType={emp.EXP_TYP_CODE} placeName={emp.PLACE_NAME} natIdCard={emp.NATIONAL_ID_CARD_NO} jobName={emp.JOB_NAME} startDate={emp.START_DATE} endDate={emp.END_DATE} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} expType={emp.EXP_TYP_CODE} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colspan="9">لاتوجد بيانات</td>
                                                </tr>
                                            </tbody>
                                            : null}

                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                                الخدمة العسكرية
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة الخبرة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الوظيفة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>من</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>إلى</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>يوم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>شهر</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empexp.length >= 1 ? this.props.empexp[0].length >= 1 ? this.props.empexp[0].map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>القوات المسلحة</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editJobOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" /> : emp.JOB_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editFromOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" /> : emp.START_DATE}</td>
                                                    <td>{this.state.edit && this.state.rowExp == emp.id ? <input onChange={this.editToOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" /> : emp.END_DATE}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).days()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).months()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).years()}</td>
                                                    <td ><i onClick={ this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={emp.id} style={{ fontSize: 20 }} expType={emp.EXP_TYP_CODE} placeName={emp.PLACE_NAME} natIdCard={emp.NATIONAL_ID_CARD_NO} jobName={emp.JOB_NAME} startDate={emp.START_DATE} endDate={emp.END_DATE} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} expType={emp.EXP_TYP_CODE} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colspan="9">لاتوجد بيانات</td>
                                                </tr>
                                            </tbody>
                                            : null}

                                    </table>
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
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        result: state.trans.result,
        msg: state.trans.msg,
        empexp: state.trans.empexp
    };
};
export default connect(mapStateToProps, {
    getEmpByDeps, getEmpAppraisal, getEmpName, getEmpNameByName, newAppraisal, getEmpExp, newEmpExp, deleteEmpExperience
})(EmpExperience);