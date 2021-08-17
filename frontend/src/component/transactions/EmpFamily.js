import React, { Fragment } from "react";
import {
    getEmpFamily, getEmpName, getEmpNameByName
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactmoment from "react-moment"




class EmpFamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalData: [], messege: null ,addMaritalType: [{value: " ", type: null, key: null}], addMaritalName: [{value: " ", key: null}], addMaritalNId: [{value: " ", key: null}],
            addMaritalBod: [{value: " ", key: null}], addMaritalWorkStatus: [{value: " ", key: null}], addMarital: false, maritalLength: 0,
            showFamilyResult: true, add: false, edit: false, empid: null,
            empname: null, showMaritalstate: false, showNamesResultsForSearch: false, showNamesResultsForAdd: false,
            empnameForAdd: null, empidForAdd: null, showMsg: false
        };

    }

    componentDidMount() {
    }

    idInputHandlerForSearch = (e) => {
        this.refs.name.value = ''
        this.setState({ showFamilyResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpFamily(e.target.value, "")
            this.setState({ edit: false, empid: e.target.value, showMaritalstate: true })
        }
    }

    idInputHandlerForAdd = (e) => {
        this.refs.nameadd.value = ''
            this.setState({ empidForAdd: e.target.value, empnameForAdd: null })
            if(e.target.value.length == 0){
                this.setState({empidForAdd: null})
            }
    }

    nameInputHandlerForAdd = (e) => {
        this.setState({ showNamesResultsForAdd: true, empidForAdd: null, empnameForAdd: e.target.value })
        this.props.getEmpNameByName(e.target.value)
        if(e.target.value.length == 0){
            this.setState({empnameForAdd: null})
        }

        this.refs.idadd.value = ''

    }
    namesOptionshandlerForAdd = (e) => {
         this.setState({
             empnameForAdd: e.target.value, empidForAdd: null
         })
         if(this.refs.nameadd) this.refs.nameadd.value = e.target.value

     }

    addMaritalTypeHandler = (e) => {
        e.preventDefault()
        let nodes = document.getElementsByClassName("maritaltype");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalType.slice()
        newArr[index] = { value: e.target.value, type: e.target.value == "الزوجة" ? 1 : 2, key: index }
        this.setState({
            addMaritalType: newArr
        })

    }

    addMaritalNameHandler = (e) => {
        e.preventDefault()
        let nodes = document.getElementsByClassName("maritalname");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalName.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalName: newArr
        })

    }

    addMaritalNIdHandler = (e) => {
        let nodes = document.getElementsByClassName("maritalnid");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalNId.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalNId: newArr
        })
    }

    addMaritalBodHandler = (e) => {
        let nodes = document.getElementsByClassName("maritalbod");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalBod.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalBod: newArr
        })
    }

    addMaritalWorkStatus = (e) => {
        let nodes = document.getElementsByClassName("maritalws");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let insertedVal = e.target.value == "اختر ..." ? " " : e.target.value
        let newArr = this.state.addMaritalWorkStatus.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalWorkStatus: newArr
        })
    }


    tabhandler = (e) => {
        let nodes = document.getElementsByClassName("maritalws");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        if (e.key === 'Tab' && index == nodes.length - 1) {
            this.setState(prevState => {
                return {
                    maritalLength: prevState.maritalLength + 1,
                    addMaritalName: [...this.state.addMaritalType, {value: " ", type: null, key: null}],
                    addMaritalName: [...this.state.addMaritalName, {value: " ", key: null}],
                    addMaritalNId: [...this.state.addMaritalNId, {value: " ", key: null}],
                    addMaritalBod: [...this.state.addMaritalBod, {value: " ", key: null}],
                    addMaritalWorkStatus: [...this.state.addMaritalWorkStatus, {value: " ", key: null}],
                }
            })
        }
    }

    addMaritaldHandler = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                maritalLength: prevState.maritalLength + 1,
                addMaritalName: [...this.state.addMaritalType, {value: " ", type: null, key: null}],
                addMaritalName: [...this.state.addMaritalName, {value: " ", key: null}],
                addMaritalNId: [...this.state.addMaritalNId, {value: " ", key: null}],
                addMaritalBod: [...this.state.addMaritalBod, {value: " ", key: null}],
                addMaritalWorkStatus: [...this.state.addMaritalWorkStatus, {value: " ", key: null}],
            }
        })
    }

    deleteMaritaldHandler = (e) => {
        e.preventDefault()
        let newArrOfMType = [...this.state.addMaritalType]
        let newArrOfMName = [...this.state.addMaritalName]
        let newArrOfMNid = [...this.state.addMaritalNId]
        let newArrOfMBod = [...this.state.addMaritalBod]
        let newArrOfMworkState = [...this.state.addMaritalWorkStatus]
        newArrOfMType.pop()
        newArrOfMName.pop()
        newArrOfMNid.pop()
        newArrOfMBod.pop()
        newArrOfMworkState.pop()
        if (this.state.maritalLength !== 0) {
            this.setState(prevState => {
                return {
                    maritalLength: prevState.maritalLength - 1,
                    addMaritalType: newArrOfMType,
                    addMaritalName: newArrOfMName,
                    addMaritalNId: newArrOfMNid,
                    addMaritalBod: newArrOfMBod,
                    addMaritalWorkStatus: newArrOfMworkState
                }
            })
        }
    }

    handleArrToSend = (e) => {
        e.preventDefault()
        var state = this.state
        var arrays = state.addMaritalType.concat(state.addMaritalName, state.addMaritalNId, state.addMaritalBod, state.addMaritalWorkStatus)
        var emptyInputs = arrays.find(i => i.value.length <= 1) || null
        let arr = []


        if (emptyInputs != undefined) {
            console.log("there are emptyInputs");
        } else if (emptyInputs == undefined && (this.state.empnameForAdd || this.state.empidForAdd) ) {
            let i = arrays.length / 5
            console.log('hit');
            while (i > 0) {
                let smallArr = []
                var arrloop = arrays.filter(el => el.key == i - 1)
                let nameOrId;
                if(this.state.empnameForAdd){
                    nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empnameForAdd}")`
                }else if(this.state.empidForAdd){
                    nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empidForAdd})`
                }
                smallArr.push(nameOrId)
                smallArr.push(arrloop[0].type)
                smallArr.push(`"${arrloop[1].value}"`)
                smallArr.push(arrloop[2].value)
                smallArr.push(`"${arrloop[3].value}"`)
                smallArr.push(`"${arrloop[4].value}"`)
                smallArr.push("30)")

                arr.push(smallArr)
                i--
            }
            this.setState({
                finalData: arr,
                addConfirmed: true
            })

        }

    }



    martialRender = (maritals) => {

        let trnas = []
        for (let i = 0; i <= maritals; i++) {
            if (i > 0) {
                trnas.push(
                    <tr>
                        <td>
                            <select onChange={this.addMaritalTypeHandler} className="maritaltype" required ref="selected">
                                <option selected>الزوجة</option>
                                <option selected>الأبن</option>
                                <option selected>اختر ...</option>
                            </select>
                        </td>
                        <td>
                            <input required className="maritalname" onChange={this.addMaritalNameHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                        </td>
                        <td>
                            <input required className="maritalnid" onChange={this.addMaritalNIdHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                        </td>
                        <td>
                            <input required className="maritalbod" onChange={this.addMaritalBodHandler} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                        </td>
                        <td>
                            <select onKeyDown={this.tabhandler} onChange={this.addMaritalWorkStatus} className="maritalws" required ref="selected" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }}>
                                <option selected>يعمل</option>
                                <option selected>لا يعمل</option>
                                <option selected>اختر ...</option>
                            </select>
                        </td>
                    </tr>
                )
            }
        }
        return trnas;
    };

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpFamily("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }



    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.props.getEmpFamily("", e.target.value)
        this.setState({ showFamilyResult: true, showMaritalstate: true })
    }


    closeAddSectionHandler = (e) => {
        this.setState({ add: false, showStructWAdd: false })
    }

    closeEditSectionHandler = (e) => {
        this.setState({ edit: false })
    }

    addButtonClickHandeler = () => {
        this.setState({ add: true })
        this.setState({ empid: null, empname: null, transdate: null, catname: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, shoshowStructWAddw: false, showStruct: false })
    }
    submitNewFamily = (e) => {
        e.preventDefault()

        axios({
            method: "POST",
            data: this.state.finalData,
            withCredentials: true,
            url: "http://localhost:5000/newfamily",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log(res.data);
            this.setState({
                messege : res.data.data,
                showMsg: true
            })
        })
    }

    handelEdit_1 = (e) => {
        var myCurrentDate = e.target.getAttribute("transdate") ? e.target.getAttribute("transdate").slice(0, 10) : null
        var myFutureDate = new Date(myCurrentDate);
        myFutureDate.setDate(myFutureDate.getDate() + 1);//myFutureDate is now 8 days in the future
        let newDate = myFutureDate.getUTCFullYear() + "-" + (myFutureDate.getUTCMonth() + 1) + "-" + myFutureDate.getUTCDate()
        this.setState({ edit: true, empname: e.target.getAttribute("empname"), transdate: newDate, catname: e.target.getAttribute("catname"), catid: e.target.getAttribute("catid"), jdname: e.target.getAttribute("jdname"), supboxname: e.target.getAttribute("supboxname"), gname: e.target.getAttribute("jobgroup"), jasi: e.target.getAttribute("jasform"), indname: e.target.getAttribute("indname") })
        // new Date(this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10)).setDate(this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10).getDate() + 1).getUTCFullYear() + "-" + (this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10).getUTCMonth() + 1) + "-" + this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10).getUTCDate()

    }

    handelEdit_2 = (e) => {
        e.preventDefault()
        // let data = { empNat: this.state.empNat, appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }

        let data = { date: this.state.transdate, catname: this.state.catname, jdname: this.state.jdname, supboxname: this.state.supboxname, gname: this.state.gname, jasi: this.state.jasi, indname: this.state.indname, empid: this.state.empid }
        axios({
            method: "PUT",
            data: data,
            url: `http://localhost:5000/updateemptrans`,
            headers: { "Content-Type": "application/json" },
        }).then(data => {
        })
    }
    closeAddConfirmHandler = (e) => {
        this.setState({
            addConfirmed: false
        })
    }


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

        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ height: "100%", minWidth: 1000 }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة بيانات جديد</span>
                                        <h3></h3>
                                    </div>
                                    {this.state.showMsg ? this.props.msg == "تم إدخال البيانات بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg == "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg == "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}

                                    {/* <ImportExcel data={this.ImportExcelHandler} /> */}
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                                <input ref="idadd" id="empid" className="form-control" onChange={this.idInputHandlerForAdd} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                            </div>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                                <input ref="nameadd" id="name" id="empname" className="form-control" onChange={this.nameInputHandlerForAdd} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.showNamesResultsForAdd ?
                                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                                <div></div>
                                                <select onClick={this.namesOptionshandlerForAdd} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                                    {this.props.empNameByName.map((name => (
                                                        <option>{name.NAME_ARABIC}</option>
                                                    )))}
                                                </select>
                                                <div></div>
                                            </div>
                                            : null
                                    }
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>القرابة</th>
                                                <th>الإسم</th>
                                                <th>الرقم القومي</th>
                                                <th>تاريخ الميلاد</th>
                                                <th>حالة العمل</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select onChange={this.addMaritalTypeHandler} className="maritaltype" required ref="selected">
                                                        <option type="1" selected>الزوجة</option>
                                                        <option type="2" selected>الأبن</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input required className="maritalname " onChange={this.addMaritalNameHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <input required className="maritalnid " onChange={this.addMaritalNIdHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <input required className="maritalbod " onChange={this.addMaritalBodHandler} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <select onKeyDown={this.tabhandler} onChange={this.addMaritalWorkStatus} className="maritalws" required ref="selected" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }}>
                                                        <option selected>يعمل</option>
                                                        <option selected>لا يعمل</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            {this.state.maritalLength === 0 ? null : this.martialRender(this.state.maritalLength)}
                                        </tbody>
                                    </table>
                                    <button onClick={this.addMaritaldHandler} style={{ float: "right", minWidth: 50, marginBottom: 5, marginRight: 12, maxHeight: 25 }}><i class="fas fa-plus"></i>
                                    </button>
                                    <button onClick={this.deleteMaritaldHandler} style={{ float: "left", minWidth: 50, marginBottom: 5, marginLeft: 12, maxHeight: 25 }}><i class="fas fa-minus"></i>
                                    </button>
                                    <button onClick={this.handleArrToSend} className="btn btn-block">إضافة</button>

                                </div>
                                {this.state.addConfirmed ? <div style={{ width: "70%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة بيانات جديد ؟ <button onClick={this.submitNewFamily} style={{ position: "absolute", left: "17%", top: "80%" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15, position: "relative", top: "5%", left: "62%" }} class="fas fa-times-circle"></i></div> : null}
                            </div>

                        </div>

                    </div> : null
                }


                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: "100%", minHeight: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                البيانات العائلية
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandlerForSearch} placeholder={this.props.empname && !this.state.edit ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>

                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة بيانات جديد</button>
                            </div>
                            {
                                this.state.showNamesResultsForSearch ?
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div></div>
                                        <select onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                            {this.props.empNameByName.map((name => (
                                                <option>{name.NAME_ARABIC}</option>
                                            )))}
                                        </select>
                                        <div></div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading" style={{ display: "flex", justifyContent: "space-evenly" }}>
                                {/* {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", bottom: 10, left: 550 }} class="fas fa-times-circle"></i> : null} */}
                                {/* <i style={{ fontSize: 40, position: "relative", right: "90%" }} class="fas fa-file-excel"></i> */}
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <h4 style={{ textAlign: "right", fontWeight: "bolder" }}>البيانات العائلية</h4>

                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>القرابة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تاريخ الميلاد</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الرقم القومي</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المؤهل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تاريخ الزواج</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تعمل أو لا تعمل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة العمل</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empfamily.map((fam) => (
                                            <tbody>
                                                <tr>
                                                    <td>{fam.RELATION_TYPE == 1 ? "الزوجة" : "الأبن"}</td>
                                                    <td>{fam.FAMILY_NAME}</td>
                                                    <td>{fam.BIRTH_DATE}</td>
                                                    <td>{fam.NATIONAL_ID_CARD_NO}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>

                                                    <td ><i class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))}


                                    </table>

                                    {this.state.showMaritalstate ? <div><h3 style={{ textAlign: "left", fontFamily: 'Markazi Text ,serif' }}>الحالة الإجتماعية : <span style={{ color: "#7d7272" }}> {this.props.empfamily ? this.props.empfamily.length == 1 ? "متزوج" : this.props.empfamily.length > 1 ? `متزوج ويعول ${this.props.empfamily.length - 1}` : "أعزب" : null} </span> </h3></div> : null}
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
        empfamily: state.posts.empfamily,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName
    };
};
export default connect(mapStateToProps, {
    getEmpFamily, getEmpName, getEmpNameByName
})(EmpFamily);