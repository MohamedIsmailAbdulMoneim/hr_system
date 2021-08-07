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
        this.state = { addChild: false, childLength: 0, addWife: false, showFamilyResult: true, add: false, edit: false, empid: null, empname: null, showMaritalstate: false, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, catname: null, catid: null, supboxid: null, levels: null, showStructWAdd: false, showStruct: false, showNamesResults: false };

    }

    componentDidMount() {
    }

    idInputHandler = (e) => {
        this.refs.name.value = ''
        this.refs.name.placeholder = ''
        this.setState({ showFamilyResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpFamily(e.target.value, "")
            this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true, showMaritalstate: true })
        }
    }



    addWifeHandler = (e) => {
        e.preventDefault()
        this.setState({ addWife: true })
    }

    deleteChildHandler = (e) => {
        this.setState(prevState => {
            return { childLength: prevState.childLength - 1 }
        })
    }

    addChildHandler = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return { childLength: prevState.childLength + 1 }
        })
    }


    childRender = (childs) => {

        let child = []
        for (let i = 0; i <= childs; i++) {
            if (i > 0) {
                child.push(


                    <div div className="form-group" controlId="formBasicEmail" >
                        {this.state.add ? <i onClick={this.deleteChildHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                        <div style={{ marginRight: 3, width: "100%", display: "flex", }}>
                            <div className="form-group" controlId="formBasicEmail" style={{ margin: "0 auto" }}>
                                <label style={{ width: "100%", textAlign: "right" }}>اسم الإبن : </label>
                                <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "500px" }} onChange={this.nameInputHandler} type="text" />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>تاريخ الميلاد : </label>
                                <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>الرقم القومي : </label>
                                <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                            </div>
                        </div>
                    </div >)
            }
        }
        return child;
    };





    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpFamily("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }


    namesOptionshandler = (e) => {
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
    handelInsertNewTrans = (e) => {
        e.preventDefault()
        const fd = {
            empid: this.state.empid,
            transdate: this.state.transdate,
            jdname: this.state.jdname,
            supboxname: this.state.supboxname,
            gname: this.state.gname,
            jasi: this.state.jasi,
            indname: this.state.indname,
            catname: this.state.catname,
        };
        axios({
            method: "POST",
            data: fd,
            withCredentials: true,
            url: "http://localhost:5000/postnewtrans",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
        })
    }
    getNameAndCurrent = (e) => {
        this.setState({
            empid: e.target.value, showStruct: false, showStructWAdd: false
        })
        this.props.getEmpName(e.target.value)
        this.props.getCurrentJd(e.target.value)
    }

    handelDateClick = (e) => {
        this.setState({ transdate: e.target.value })
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


    render() {
        console.log(this.state.childLength);
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
                        <form>
                            <div class="row">
                                <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ height: "100%", minHeight: 400, width: "70%", minWidth: "450", overflow: "auto" }} class="panel panel-default">
                                        <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                            <span style={{ position: "relative", right: 50 }}>إضافة بيانات جديدة</span> {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", left: 530 }} class="fas fa-times-circle"></i> : null}
                                            {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                            {/* <input style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" onSubmit={this.handelInsertNewTrans} value="Add" /> */}

                                            <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addWifeHandler} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة زوجة</span><i class="fas fa-user-plus"></i> </button>
                                            <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addChildHandler} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة طفل</span><i class="fas fa-user-plus"></i> </button>
                                        </div>


                                        {this.state.addWife ?
                                            <Fragment>

                                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <div className="form-group" controlId="formBasicEmail">
                                                        <label style={{ width: "100%", textAlign: "right" }}>اسم الزوجة : </label>
                                                        <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                                                    </div>
                                                    <div className="form-group" controlId="formBasicEmail">
                                                        <label style={{ width: "100%", textAlign: "right" }}>تاريخ الميلاد : </label>
                                                        <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="date" />
                                                    </div>
                                                </div>

                                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <div className="form-group" controlId="formBasicEmail">
                                                        <label style={{ width: "100%", textAlign: "right" }}>الرقم القومي : </label>
                                                        <input ref="nameinput" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                                                    </div>
                                                    <div className="form-group" controlId="formBasicEmail">
                                                        <label style={{ width: "100%", textAlign: "right" }}>حالة العمل : </label>
                                                        <select required style={{ height: 30, width: "100%", minWidth: "190px" }} onChange={this.catClickHandeler}>
                                                            <option selected>
                                                                تعمل
                                                            </option>
                                                            <option selected>
                                                                لاتعمل
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </Fragment>

                                            : null}
                                        {this.state.childLength === 0 ? null : this.childRender(this.state.childLength)}




                                    </div>
                                </div>
                            </div>
                        </form>
                    </div> : null
                }
                {
                    this.state.showNamesResults ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
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
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                البيانات العائلية
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandler} placeholder={this.props.empname && !this.state.edit ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة تدرج جديد</button>
                            </div>
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
                                        {this.props.empfamily ? this.props.empfamily.map((fam) => (
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
                                        )) : null}


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