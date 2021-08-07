import React, { Fragment } from "react";
import {

    getEmpByDeps, getEmpName, getEmpNameByName, getEmpAppraisal

} from "../../actions/Actions";
import { newAppraisal, getEmpExp } from "../../actions/TransActions"
import { connect } from "react-redux";
import axios from "axios";
import Moment from 'react-moment';
import moment from 'moment';

import 'moment-timezone';

class EmpExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poeOfInner: [], poeOfOuter: [], poeOfMiliter: []
            , jobOfInner: [], jobOfOuter: [], jobOfMiliter: [],
            fromOfInner: [], fromOfOuter: [], fromOfMiliter: []
            , toOfInner: [], toOfOuter: [], toOfMiliter: []
            , innerLength: 0, innerExp: [], outerLength: 0, outerExp: []
            , militerLength: 0, militerExp: [], showFamilyResult: true,
            confirmAdd: false, showMsg: false, errorAdd: false,
            empAppraisal: "null", appraisalYear: "null"
            , add: false, edit: false,
            empid: null, empname: null, catname: null, catid: null, showNamesResults: false
        };
    }

    poeHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = {value:e.target.value, key: index,expType: e.target.getAttribute('uniqueIndex') }
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
        newArr[index] = {value:e.target.value, key: index,expType: e.target.getAttribute('uniqueIndex') }
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
        newArr[index] = {value:e.target.value, key: index,expType: e.target.getAttribute('uniqueIndex') }
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
        newArr[index] = {value:e.target.value, key: index,expType: e.target.getAttribute('uniqueIndex') }
        this.setState({
            [selectedArr]: newArr
        })
    }

    addInnerExp = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                innerLength: prevState.innerLength + 1,
                poeOfInner: [...this.state.poeOfInner, " "],
                jobOfInner: [...this.state.jobOfInner, " "],
                fromOfInner: [...this.state.fromOfInner, " "],
                toOfInner: [...this.state.toOfInner, " "]
            }
        })
    }


    addOuterExp = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                outerLength: prevState.outerLength + 1,
                poeOfOuter: [...this.state.poeOfOuter, " "],
                jobOfOuter: [...this.state.jobOfOuter, " "],
                fromOfOuter: [...this.state.fromOfOuter, " "],
                toOfOuter: [...this.state.toOfOuter, " "]
            }
        })
    }


    addMiliterExp = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                militerLength: prevState.militerLength + 1,
                poeOfMiliter: [...this.state.poeOfMiliter, " "],
                jobOfMiliter: [...this.state.jobOfMiliter, " "],
                fromOfMiliter: [...this.state.fromOfMiliter, " "],
                toOfMiliter: [...this.state.toOfMiliter, " "]
            }
        })
    }


    deleteInnerExp = (e) => {
        let selectedArr = e.target.getAttribute('uClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArrOfPoe = [...this.state.poeOfInner]
        let newArrOfJob = [...this.state.jobOfInner]
        let newArrOfFrom = [...this.state.fromOfInner]
        let newArrOfTo = [...this.state.toOfInner]
        if (index !== -1) {
            newArrOfPoe.splice(index, 1)
            newArrOfJob.splice(index, 1)
            newArrOfFrom.splice(index, 1)
            newArrOfTo.splice(index, 1)
        }
        this.setState(prevState => {
            return {
                innerLength: prevState.innerLength - 1,
                poeOfInner: newArrOfPoe,
                jobOfInner: newArrOfJob,
                fromOfInner: newArrOfFrom,
                toOfInner: newArrOfTo

            }
        })
    }

    deleteOuterExp = (e) => {
        let selectedArr = e.target.getAttribute('uClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArrOfPoe = [...this.state.poeOfOuter]
        let newArrOfJob = [...this.state.jobOfOuter]
        let newArrOfFrom = [...this.state.fromOfOuter]
        let newArrOfTo = [...this.state.toOfOuter]
        if (index !== -1) {
            newArrOfPoe.splice(index, 1)
            newArrOfJob.splice(index, 1)
            newArrOfFrom.splice(index, 1)
            newArrOfTo.splice(index, 1)
        }
        this.setState(prevState => {
            return {
                outerLength: prevState.outerLength - 1,
                poeOfOuter: newArrOfPoe,
                jobOfOuter: newArrOfJob,
                fromOfOuter: newArrOfFrom,
                toOfOuter: newArrOfTo

            }
        })
    }

    deleteMiliterExp = (e) => {
        let selectedArr = e.target.getAttribute('uClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArrOfPoe = [...this.state.poeOfMiliter]
        let newArrOfJob = [...this.state.jobOfMiliter]
        let newArrOfFrom = [...this.state.fromOfMiliter]
        let newArrOfTo = [...this.state.toOfMiliter]
        if (index !== -1) {
            newArrOfPoe.splice(index, 1)
            newArrOfJob.splice(index, 1)
            newArrOfFrom.splice(index, 1)
            newArrOfTo.splice(index, 1)
        }
        this.setState(prevState => {
            return {
                militerLength: prevState.innerLength - 1,
                poeOfMiliter: newArrOfPoe,
                jobOfMiliter: newArrOfJob,
                fromOfMiliter: newArrOfFrom,
                toOfMiliter: newArrOfTo

            }
        })
    }


    innerExpHandler = (exps) => {

        let exp = []
        for (let i = 0; i <= exps; i++) {
            if (i > 0) {
                exp.push(
                    <div div className="form-group" controlId="formBasicEmail" >
                        <h1>خبرة داخل القطاع</h1>
                        {this.state.add ? <div style={{ height: 50 }}> <i uClass={'innerExp'} uIndex={4} onClick={this.deleteInnerExp} style={{ fontSize: 15, float: "right", marginRight: 20 }} class="fas fa-times-circle innerExp"></i></div> : null}
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>جهة الخبرة : </label>
                                <input onChange={this.poeHandler} uniqueClass={'poeOfInner'} uniqueIndex={4} ref="nameinput" className="form-control poeOfInner" style={{ width: "100%", minWidth: "250px" }} type="text" required />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>الوظيفة : </label>
                                <input onChange={this.jobHandler} uniqueClass={'jobOfInner'} uniqueIndex={4} ref="nameinput" className="form-control jobOfInner" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>من : </label>
                                <input onChange={this.fromHandler} uniqueClass={'fromOfInner'} uniqueIndex={4} ref="nameinput" className="form-control fromOfInner" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>إلى : </label>
                                <input onChange={this.toHandler} uniqueClass={'toOfInner'} uniqueIndex={4} ref="nameinput" className="form-control toOfInner" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                        </div>
                    </div >)
            }
        }
        return exp;
    };

    outerExpHandler = (exps) => {

        let exp = []
        for (let i = 0; i <= exps; i++) {
            if (i > 0) {
                exp.push(


                    <div div className="form-group" controlId="formBasicEmail" >
                        <h1>خبرة خارج القطاع</h1>
                        {this.state.add ? <div style={{ height: 50 }}> <i uClass={'outerExp'} uIndex={3} onClick={this.deleteOuterExp} style={{ fontSize: 15, float: "right", marginRight: 20 }} class="fas fa-times-circle outerExp"></i></div> : null}
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>جهة الخبرة : </label>
                                <input onChange={this.poeHandler} uniqueClass={'poeOfOuter'} uniqueIndex={3} ref="nameinput" className="form-control poeOfOuter" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>الوظيفة : </label>
                                <input onChange={this.jobHandler} uniqueClass={'jobOfOuter'} uniqueIndex={3} ref="nameinput" className="form-control jobOfOuter" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>من : </label>
                                <input onChange={this.fromHandler} uniqueClass={'fromOfOuter'} uniqueIndex={3} ref="nameinput" className="form-control fromOfOuter" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>إلى : </label>
                                <input onChange={this.toHandler} uniqueClass={'toOfOuter'} uniqueIndex={3} ref="nameinput" className="form-control toOfOuter" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                        </div>
                    </div >)
            }
        }
        return exp;
    };

    militaryExpHandler = (exps) => {

        let exp = []
        for (let i = 0; i <= exps; i++) {
            if (i > 0) {
                exp.push(
                    <div div className="form-group" controlId="formBasicEmail" >
                        <h1>خدمة عسكرية</h1>
                        {this.state.add ? <div style={{ height: 50 }}> <i uClass={'militerExp'} onClick={this.deleteMiliterExp} style={{ fontSize: 15, float: "right", marginRight: 20 }} class="fas fa-times-circle militerExp"></i></div> : null}
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>جهة الخبرة : </label>
                                <input uniqueClass={'poeOfMiliter'} uniqueIndex={1} onChange={this.poeHandler} ref="nameinput" className="form-control poeOfMiliter" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>الوظيفة : </label>
                                <input uniqueClass={'jobOfMiliter'} uniqueIndex={1} onChange={this.jobHandler} ref="nameinput " className="form-control jobOfMiliter" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>من : </label>
                                <input uniqueClass={'fromOfMiliter'} uniqueIndex={1} onChange={this.fromHandler} ref="nameinput" className="form-contro fromOfMiliterl" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>إلى : </label>
                                <input uniqueClass={'toOfMiliter'} uniqueIndex={1} onChange={this.toHandler} ref="nameinput" className="form-control toOfMiliter" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                        </div>
                    </div >)

            }
        }
        return exp;
    };

    handleArrToSend = (e) => {
        var state = this.state
        var arrays = state.poeOfInner.concat(state.poeOfOuter, state.poeOfMiliter,state.jobOfInner,state.jobOfOuter,state.jobOfMiliter,state.fromOfInner,state.fromOfOuter,state.fromOfMiliter,state.toOfInner,state.toOfOuter,state.toOfMiliter)
        console.log(arrays);
        var emptyInputs =  arrays.find(i => i.length <= 1)
        console.log(emptyInputs);
        if(emptyInputs != undefined){
            
        }else if(emptyInputs == undefined){
            console.log(false);
        }
        // poeOfInner: [], poeOfOuter: [], poeOfMiliter: []
        // , jobOfInner: [], jobOfOuter: [], jobOfMiliter: [],
        // fromOfInner: [], fromOfOuter: [], fromOfMiliter: []
        // , toOfInner: [], toOfOuter: [], toOfMiliter: []


    }

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
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

    idInputHandler = (e) => {

        this.setState({ showFamilyResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpExp(e.target.value, "")
            this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true, showMaritalstate: true })
        }
    }



    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showFamilyResult: false })
        this.props.getEmpExp('', e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpExp("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }


    namesOptionshandler = (e) => {
        document.getElementById('empname').value = e.target.value
        if (document.getElementById('nameinputadd')) document.getElementById('nameinputadd').value = e.target.value
        this.setState({ showFamilyResult: true, empname: e.target.value })
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
        })

        window.location.reload();


    }

    render() {
        var dates = [];
        let start = 1996;
        let end = 2021;

        while (start != end) {
            dates.push(start);
            start++;
        }

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

        const startDate = moment(this.props.empexp ? this.props.empexp.length >= 1 ? this.props.empexp[0].length >= 1 ? this.props.empexp[0][0].START_DATE : null : null : null);
        const timeEnd = moment(this.props.empexp ? this.props.empexp.length >= 1 ? this.props.empexp[0].length >= 1 ? this.props.empexp[0][0].END_DATE : null : null : null);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);

        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                            <div class="row">
                                <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <span style={{ position: "relative", right: 50 }}>إضافة بيانات جديدة</span> {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", left: 530 }} class="fas fa-times-circle"></i> : null}
                                    <div style={{ height: "100%", minHeight: 400, width: "70%", minWidth: "450", overflow: "auto" }} class="panel panel-default">
                                        <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                            {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                            {/* <input style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" onSubmit={this.handelInsertNewTrans} value="Add" /> */}
                                            <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addInnerExp} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة خبرة داخل القطاع</span><i class="fas fa-user-plus"></i> </button>
                                            <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addOuterExp} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة خبرة خارج القطاع</span><i class="fas fa-user-plus"></i> </button>
                                            <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addMiliterExp} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة خدمة عسكرية</span><i class="fas fa-user-plus"></i> </button>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                                <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                                            </div>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                                <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                                            </div>
                                        </div>
                                        {this.state.innerLength === 0 ? null : this.innerExpHandler(this.state.innerLength)}
                                        {this.state.outerLength === 0 ? null : this.outerExpHandler(this.state.outerLength)}
                                        {this.state.militerLength === 0 ? null : this.militaryExpHandler(this.state.militerLength)}

                                        <button onClick={this.handleArrToSend} style={{ float: "left" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>
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
                                        <input id="empid" ref="empid" className="form-control" onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="name" id="empname" className="form-control" onKeyUp={this.nameInputHandler} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
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
                                        {this.props.empexp.length >= 1 ? this.props.empexp[2].map(emp => (
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>{emp.JOB_NAME}</td>
                                                    <td>{emp.START_DATE}</td>
                                                    <td>{emp.END_DATE}</td>
                                                    <td>{diffDuration.days()}</td>
                                                    <td>{diffDuration.months()}</td>
                                                    <td>{diffDuration.years()}</td>
                                                    <td onClick={this.handelEdit_1}><i style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} onClick={this.editHandler} class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
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
                                        {this.props.empexp.length >= 1 ? this.props.empexp[1].map(emp => (
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>{emp.JOB_NAME}</td>
                                                    <td>{emp.START_DATE}</td>
                                                    <td>{emp.END_DATE}</td>
                                                    <td>{diffDuration.days()}</td>
                                                    <td>{diffDuration.months()}</td>
                                                    <td>{diffDuration.years()}</td>
                                                    <td onClick={this.handelEdit_1}><i style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} onClick={this.editHandler} class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
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
                                        {this.props.empexp.length >= 1 ? this.props.empexp[0].map(emp => (
                                            <tbody>
                                                <tr>
                                                    <td>القوات المسلحة</td>
                                                    <td>{emp.JOB_NAME}</td>
                                                    <td>{emp.START_DATE}</td>
                                                    <td>{emp.END_DATE}</td>
                                                    <td>{diffDuration.days()}</td>
                                                    <td>{diffDuration.months()}</td>
                                                    <td>{diffDuration.years()}</td>
                                                    <td onClick={this.handelEdit_1}><i style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} onClick={this.editHandler} class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
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
    getEmpByDeps, getEmpAppraisal, getEmpName, getEmpNameByName, newAppraisal, getEmpExp
})(EmpExperience);