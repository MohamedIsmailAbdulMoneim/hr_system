import React, { Fragment } from "react";
import {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactmoment from "react-moment"
import ExcelSheet from "../reports/ExcelSheet"
import structure from "../structure.png"


const colNames = [{ label: "الإسم", value: "name" }, { label: "تاريخ الحركة", value: "date" }, { label: "الإدارة", value: "dep" }, { label: "الوظيفة", value: "job" }, { label: "المسمى الوظيفي", value: "jobdesc" }, { label: "نوع التخصص", value: "gname" }, { label: "طريقة شغل الوظيفة", value: "jas" }, { label: "حالة الوظيفة", value: "ind" }]


class EmpTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rowTrans: null, editConfirmed: false, addConfirmed: false, showDateUnlessEdit: true, showTransResult: true, add: false, edit: false, empid: null, empname: null, transdate: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, catname: null, catid: null, supboxid: null, mainboxid: null, levels: null, showStructWAdd: false, showStruct: false, showNamesResults: false };

    }

    componentDidMount() {
        this.props.getEmpTrans("", this.state.empname)

    }

    componentDidUpdate(prevProps) {
        const { empTrans } = this.props
        if (empTrans !== prevProps.empTrans) {
            this.render()
        }
    }

    /* 
    
    --------------------
    Create Methods
    --------------------
    
    */

    addNewHandler = (e) => {
        this.setState({ addConfirmed: true })
    }

    idInputAddHandler = (e) => {
        this.setState({ showTransResult: false })
        this.props.getEmpName(e.target.value)
        // this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true })

        let selectTags = document.getElementsByTagName('select')
        for (let index = 0; index < selectTags.length; index++) {
            document.getElementsByTagName('select')[index].selectedIndex = document.getElementsByTagName('select')[index].options.length - 1
        }
        // console.log(document.getElementsByTagName('select')[0].options.length);
    }

    nameInputAddHandler = (e) => {
        this.setState({ showNamesResults: true, showTransResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        let selectTags = document.getElementsByTagName('select')
        for (let index = 0; index < selectTags.length; index++) {
            document.getElementsByTagName('select')[index].selectedIndex = document.getElementsByTagName('select')[index].options.length - 1
        }
    }

    closeAddConfirmHandler = (e) => {
        this.setState({ addConfirmed: false })
    }

    /* 
    
    --------------------
    Read Methods
    --------------------
    
    */

    /* 
    
    --------------------
    Update Methods
    --------------------
    
    */


    /* 
    
    --------------------
    Delete Methods
    --------------------
    
    */


    /* 
    
    --------------------
    Shared Methods
    --------------------
    
    */

    // End Of Methods





    handleDataSet = () => {
        // const colNames = [{ label: "الإسم", value: "name" },
        //  { label: "تاريخ الحركة", value: "date" },
        //  { label: "الإدارة", value: "dep" }, 
        //  { label: "الوظيفة", value: "job" },
        //   { label: "المسمى الوظيفي", value: "jobdesc" }, 
        //   { label: "نوع التخصص", value: "gname" },
        //    { label: "طريقة شغل الوظيفة", value: "jas" }, 
        //    { label: "حالة الوظيفة", value: "ind" }]

        const dataSet = [];
        this.props.empTrans.map(inf => {
            dataSet.push({ name: inf.NAME_ARABIC, date: inf.TRANS_DATE, dep: inf.CAT_NAME, job: inf.MAIN_BOX_NAME, jobdesc: inf.SUP_BOX_NAME, gname: inf.G_NAME, jas: inf.JOB_ASSIGNMENT_FORM_ARABIC, ind: inf.INDICATOR_NAME })
        })

        return dataSet;
    }




    closeEditConfirmHandler = (e) => {
        this.setState({ editConfirmed: false })
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
            console.log(res.data);
        })
    }


    closeAddSectionHandler = (e) => {
        this.setState({ add: false, showStructWAdd: false })
    }

    /* search section handlers



    Methods to handle search
    ************************


    */

    idInputHandler = (e) => {
        if (this.refs.searchName) {
            if (this.refs.searchName.value) {
                this.refs.searchName.value = ''
            }
        }
        if (this.refs.searchName) {
            if (this.refs.searchName.placeholder) {
                this.refs.searchName.placeholder = null
            }
        }
        if (this.refs.insertNames) {
            if (this.refs.insertName.value) {
                this.refs.insertName.value = ''
            }
        }
        if (this.refs.insertName) {
            if (this.refs.insertName.placeholder) {
                this.refs.insertName.placeholder = ''
            }
        }

        this.setState({ showTransResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpTrans(e.target.value, "")
            this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true })
        }
    }


    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showTransResult: false, edit: false })
        this.props.getEmpNameByName(e.target.value)
        this.props.getCurrentJd(e.target.value)
        this.refs.empid.value = ''
        if (this.refs.searchName) {
            if (this.refs.searchName.placeholder) {
                this.refs.searchName.placeholder = ''
            }
        }
        if (e.key === 'Enter') {
            this.props.getEmpTrans("", e.target.value)
            this.setState({ showTransResult: true, empid: e.target.value })
            // window.history.replaceState(null, "New Page Title", "/emptrans/goes/here")
            // this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        }
    }

    addNewButtonClickHandeler = () => {
        this.setState({ add: true })
        this.setState({ empid: null, empname: null, transdate: null, catname: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, shoshowStructWAddw: false, showStruct: false, showNamesResults: false })
    }




    namesOptionshandler = (e) => {
        this.refs.searchName.value = e.target.value
        this.refs.insertName.value = e.target.value
        this.props.getEmpNameByName(e.target.value)

        this.props.getEmpTrans("", e.target.value)
        this.setState({ showTransResult: true })
    }



    /* edit section handlers

    Methods to handle edit
    ************************

    */

    editHandler = (e) => {
        this.setState({ editConfirmed: true })
    }


    closeEditSectionHandler = (e) => {
        this.setState({ edit: false })
        this.props.getEmpTrans(this.state.empid, "")
    }




    handelDateClick = (e) => {
        this.setState({ transdate: e.target.value })
    }


    catClickHandeler = (e) => {
        this.props.getJobDgByCat(e.target.value, this.props.empcurrentjd ? this.props.empcurrentjd.length ? this.props.empcurrentjd[0].J_D_ID_P : null : null)

        this.setState({ catname: e.target.value })
        if (this.refs.selected) {
            if (this.refs.selected.options) {
                this.refs.selected.options.selectedIndex = this.refs.selected.options.length - 1
            }
        }
    }

    jdNameClickHandeler = (e) => {
        this.setState({ showStructWAdd: false, jdname: e.target.value, levels: this.props.jobdgbycat ? this.props.jobdgbycat.length ? this.props.jobdgbycat[0].levels : null : null })
        this.props.getAvailSupBox(this.state.catname, e.target.value)
        if (this.refs.sps) {
            if (this.refs.sps.options) {
                this.refs.sps.options.selectedIndex = this.refs.sps.options.length - 1
            }
        }
        console.log(this.state.showStructWAdd);

    }

    supboxClickHandeler = (e) => {
        this.setState({
            supboxname: e.target.value,
            showStructWAdd: true
        })
        // this.props.getUpJd(10, this.props.empname ? this.props.empname.length ? this.props.empname[0].SUP_BOX_ID : null : null))
        this.props.getUpJd(10, e.target.value)
    }
    gNameClickeHandeler = (e) => {
        this.setState({
            gname: e.target.value
        })
    }

    jasiClickeHandeler = (e) => {
        this.setState({
            jasi: e.target.value
        })
    }

    indClickeHandeler = (e) => {
        this.setState({
            indname: e.target.value
        })
    }

    handelEdit_1 = (e) => {
        this.setState({ edit: true, rowTrans: e.target.getAttribute("transdate") })



        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes

        for (let i = 0; i < tds.length; i++) {


            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")


        }

        // document.getElementById(e.target.getAttribute("transdate")).childNodes[0].childNodes[0].removeAttribute("disabled")
        this.setState({ edit: true, mainboxid: e.target.getAttribute("mainboxid"), edit: true, empname: e.target.getAttribute("empname"), transdate: e.target.getAttribute("transdate"), catname: e.target.getAttribute("catname"), catid: e.target.getAttribute("catid"), jdname: e.target.getAttribute("jdname"), supboxname: e.target.getAttribute("supboxname"), gname: e.target.getAttribute("jobgroup"), jasi: e.target.getAttribute("jasform"), indname: e.target.getAttribute("indname") })
        // new Date(this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10)).setDate(this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10).getDate() + 1).getUTCFullYear() + "-" + (this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10).getUTCMonth() + 1) + "-" + this.props.empdetails[0].SECTOR_JOIN_DATE.slice(0, 10).getUTCDate()

    }

    editDate = (e) => {
        this.setState({ showDateUnlessEdit: false })
    }

    handelEdit_2 = (e) => {
        e.preventDefault()
        // let data = { empNat: this.state.empNat, appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }
        let data = { mainboxid: this.state.mainboxid, date: this.state.transdate, catname: this.state.catname, jdname: this.state.jdname, supboxname: this.state.supboxname, gname: this.state.gname, jasi: this.state.jasi, indname: this.state.indname, empid: this.state.empid, empname: this.props.empNameByName ? this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].NAME_ARABIC : null : null }
        this.updateEmpTrans(data)
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes

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

        this.forceUpdate(this.props.getEmpTrans("", this.state.empname))

    }

    showStruct = () => {
        this.setState({ showStruct: true })
        this.props.getUpJd(10, this.props.empTrans ? this.props.empTrans.length >= 1 ? this.props.empTrans[this.props.empTrans.length - 1].SUP_BOX_NAME : null : null)

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
                                <div style={{ height: "100%", width: 750 }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                        <span style={{ position: "relative", right: 50 }}>إضافة تدرج جديد</span> {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", left: 530 }} class="fas fa-times-circle"></i> : null}
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, position: "relative", top: 5, left: 380 }} class="fas fa-times-circle"></i> : null}
                                        <input onClick={this.addNewHandler} style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" value="اضف" />
                                    </div>
                                    <div style={{ display: "flex", marginTop: 5 }}>
                                        <div style={{ marginRight: 20, marginTop: 5 }}>
                                            <div className="col-lg-4">
                                                <div class="input-group">
                                                    <span >رقم الأداء :  </span><input onChange={this.idInputAddHandler} type="number" style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" placeholder={this.props.empNameByName ? this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].EMPLOYEE_ID : null : null} />
                                                </div>
                                                <div class="input-group">
                                                    <span>الإسم :  </span><input ref="insertName" onChange={this.nameInputAddHandler} required style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" placeholder={this.props.empname ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null || this.props.empNameByName ? this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].NAME_ARABIC : null : null} />
                                                </div>

                                                <div class="input-group">
                                                    <span>تاريخ الحركة :  </span><input required onChange={this.handelDateClick} type="date" style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="input-group">
                                                    <span>الإدارة :  </span>
                                                    <select required style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.catClickHandeler}>
                                                        {this.props.cates.map(cate => (
                                                            <Fragment>
                                                                <option id={cate.CAT_ID}>
                                                                    {cate.CAT_NAME}
                                                                </option>
                                                            </Fragment>
                                                        ))}
                                                        <option selected>
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="input-group">
                                                    <span>الوظيفة :  </span>
                                                    <select required ref="selected" style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.jdNameClickHandeler}>
                                                        {this.props.jobdgbycat.map(job => (
                                                            <option>
                                                                {job.J_D_NAME}
                                                            </option>
                                                        ))}
                                                        <option selected>اختر الوظيفة</option>

                                                    </select>
                                                </div>
                                                <div class="input-group">
                                                    <span>المسمى الوظيفي :  </span>
                                                    <select required ref="sps" style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.supboxClickHandeler}>
                                                        {this.props.empavailsup.map(job => (
                                                            <option supboxid={job.SUP_BOX_ID}>
                                                                {job.SUP_BOX_NAME}
                                                            </option>
                                                        ))}
                                                        <option selected>اختر المسمى الوظيفي</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="input-group">
                                                    <span>نوع التخصص :  </span>
                                                    <select required style={{ marginTop: 5, marginRight: 6, height: 25, width: 188 }} onChange={this.gNameClickeHandeler}>
                                                        <option>فني</option>
                                                        <option>إداري</option>
                                                        <option selected>اختر نوع التخصص</option>
                                                    </select>
                                                </div>
                                                <div class="input-group">
                                                    <span>طريقة شغل الوظيفة :  </span>
                                                    <select required style={{ marginTop: 5, marginRight: 6, height: 25, width: 188 }} onChange={this.jasiClickeHandeler}>
                                                        <option>أخرى</option>
                                                        <option>تعيين</option>
                                                        <option>نقل</option>
                                                        <option>ندب</option>
                                                        <option>اعاره</option>
                                                        <option>تكليف</option>
                                                        <option>محدد المدة</option>
                                                        <option>تدريب</option>
                                                        <option>ترقية</option>
                                                        <option>تثبيت</option>
                                                        <option>نقل طبقا لتعديل تنظيمي</option>
                                                        <option>إعادة تعيين</option>
                                                        <option>إلغاء ندب</option>
                                                        <option>إلغاء تكليف</option>
                                                        <option>تسكين</option>
                                                        <option>تعديل مسمى الوظيفة</option>
                                                        <option>عقد مؤقت</option>
                                                        <option>مكافئة شاملة</option>
                                                        <option>تعديل ندب</option>
                                                        <option>إشراف</option>
                                                        <option>الحاق</option>
                                                        <option>عقد إختبار</option>
                                                        <option>إنهاء خدمة</option>
                                                        <option>أستيعاب</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </div>
                                                <div class="input-group">
                                                    <span>حالة الوظيفة :  </span>
                                                    <select required style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.indClickeHandeler}>
                                                        <option>أصلية</option>
                                                        <option>حالية</option>
                                                        <option>سابقة</option>
                                                        <option selected>اختر  ...</option>

                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>

                                {this.state.addConfirmed ? <div style={{ width: "70%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة تدرج جديد ؟ <button onClick={this.handelInsertNewTrans} style={{ position: "absolute", left: "17%", top: "80%" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15, position: "relative", top: "5%", left: "62%" }} class="fas fa-times-circle"></i></div> : null}


                            </div>

                        </div>

                        {this.props.upjd && this.state.showStructWAdd ? this.props.upjd.length ? this.props.upjd.length >= 1 ?
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {this.props.upjd.map(up => (
                                    <Fragment>
                                        {up.length ? up[0].boxname && up[0].boxname !== "null" ?
                                            <Fragment><div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                                <h3>{up[0].boxname}</h3></div><span style={{ fontSize: 30 }}>&#8593;</span></Fragment>
                                            : null : null}
                                    </Fragment>
                                ))}
                                <div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                    <h3>{this.state.supboxname}</h3>
                                </div>
                            </div> : null : null : null}
                    </div> : null}

                {this.state.showNamesResults ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                        {this.props.empNameByName.map((name => (
                            <option>{name.NAME_ARABIC}</option>
                        )))}
                    </select>
                </div> : null}

                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                تدرج الموظفين
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="searchName" onKeyUp={this.nameInputHandler} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <button onClick={this.addNewButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة تدرج جديد</button>
                            </div>
                        </div>
                    </div>


                    {
                        this.props.upjd ? this.props.upjd.length && this.state.showStruct ? this.props.upjd.length >= 1 ?
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {this.props.upjd.map(up => (
                                    <Fragment>
                                        {up.length >= 1 ? up[0].boxname ?
                                            <Fragment><div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                                <h3>{up[0].boxname}</h3></div><span style={{ fontSize: 30 }}>&#8593;</span></Fragment>
                                            : null : null}
                                    </Fragment>
                                ))}
                                <div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                    <h3>{this.props.empTrans ? this.props.empTrans.length >= 1 ? this.props.empTrans[this.props.empTrans.length - 1].SUP_BOX_NAME : null : null}</h3>
                                </div>
                            </div> : null : null : null
                    }
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default" style={{ width: "100%" }}>
                            <div class="panel-heading" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", bottom: 10, left: 550 }} class="fas fa-times-circle"></i> : null}
                                <ExcelSheet colNames={colNames} data={this.handleDataSet()} />
                                {this.props.empname && !this.state.edit && !this.state.add ? this.props.empname.length >= 1 ? <h3>  بيان بحركة السيد / {this.props.empname[0].NAME_ARABIC}</h3> : null : null || this.props.empNameByName ? this.props.empNameByName.length >= 1 ? `  ${this.props.empNameByName[0].NAME_ARABIC} ` : null : null}
                                <img onClick={this.showStruct} src={structure} style={{ width: 50, height: 50 }} />

                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" >
                                        {this.state.edit ?
                                            <Fragment>
                                                <thead>
                                                    <tr>
                                                        <th>الإدارة</th>
                                                        <th>الوظيفة</th>
                                                        <th>المسمى الوظيفي</th>
                                                        <th>تاريخ الحركة</th>
                                                        <th>طريقة شغل الوظيفة</th>
                                                        <th>نوع التخصص</th>
                                                        <th>حالة الوظيفة</th>
                                                        <th>تعديل</th>
                                                        <th>حذف</th>
                                                    </tr>
                                                </thead>
                                                {this.props.empTrans.map(trans => (
                                                    <tbody>
                                                        <tr id={trans.TRANS_DATE}>
                                                            <td>{this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <select style={{ height: 34, width: 163.46, borderRadius: 5 }} onChange={this.catClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    {this.state.catname}
                                                                </option>
                                                            </select> : trans.catename}</td>
                                                            <td>
                                                                {this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <select style={{ height: 34, width: 163.46, borderRadius: 5 }} onChange={this.jdNameClickHandeler}>
                                                                    {this.props.jobdgbycat.map(job => (
                                                                        <option>
                                                                            {job.J_D_NAME}
                                                                        </option>
                                                                    ))}
                                                                    <option selected>{this.state.jdname}</option>
                                                                </select>
                                                                    :
                                                                    trans.MAIN_BOX_NAME}</td>
                                                            <td >{this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <select style={{ height: 34, width: 220, borderRadius: 5 }} required onChange={this.supboxClickHandeler}>
                                                                {this.props.empavailsup.map(job => (
                                                                    <option>
                                                                        {job.SUP_BOX_NAME}
                                                                    </option>
                                                                ))}
                                                                <option selected>{this.state.supboxname}</option>
                                                            </select> : trans.SUP_BOX_NAME}</td>
                                                            <td>{this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <input type="date" onChange={this.handelDateClick} className="form-control" /> : trans.TRANS_DATE}</td>
                                                            <td>{this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <select style={{ height: 34, width: 163.46, borderRadius: 5 }} required onChange={this.jasiClickeHandeler}>
                                                                <option>أخرى</option>
                                                                <option>تعيين</option>
                                                                <option>نقل</option>
                                                                <option>ندب</option>
                                                                <option>اعاره</option>
                                                                <option>تكليف</option>
                                                                <option>محدد المدة</option>
                                                                <option>تدريب</option>
                                                                <option>ترقية</option>
                                                                <option>تثبيت</option>
                                                                <option>نقل طبقا لتعديل تنظيمي</option>
                                                                <option>إعادة تعيين</option>
                                                                <option>إلغاء ندب</option>
                                                                <option>إلغاء تكليف</option>
                                                                <option>تسكين</option>
                                                                <option>تعديل مسمى الوظيفة</option>
                                                                <option>عقد مؤقت</option>
                                                                <option>مكافئة شاملة</option>
                                                                <option>تعديل ندب</option>
                                                                <option>إشراف</option>
                                                                <option>الحاق</option>
                                                                <option>عقد إختبار</option>
                                                                <option>إنهاء خدمة</option>
                                                                <option>أستيعاب</option>
                                                                <option selected>{this.state.jasi}</option>
                                                            </select> : trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                            <td>{this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <select style={{ height: 34, width: 163.46, borderRadius: 5 }} required onChange={this.gNameClickeHandeler}>
                                                                <option>فني</option>
                                                                <option>إداري</option>
                                                            </select> : trans.G_NAME}</td>
                                                            <td>{this.state.edit && this.state.rowTrans == trans.TRANS_DATE ? <select style={{ height: 34, width: 163.46, borderRadius: 5 }} required onChange={this.indClickeHandeler}>
                                                                <option>أصلية</option>
                                                                <option>حالية</option>
                                                                <option>سابقة</option>
                                                                <option selected>{this.state.indname}</option>
                                                            </select> : trans.INDICATOR_NAME}</td>
                                                            <td onClick={this.state.edit ? this.handelEdit_2 : this.handelEdit_1}><i style={{ marginTop: 7 }} empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} jdname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} jasform={trans.JOB_ASSIGNMENT_FORM_ARABIC} indname={trans.INDICATOR_NAME} class="fas fa-edit"></i></td>
                                                            <td><i style={{ marginTop: 7 }} class="fas fa-backspace"></i></td>
                                                        </tr>
                                                    </tbody>

                                                ))}
                                            </Fragment> : <Fragment>
                                                <thead>
                                                    <tr>
                                                        <th>الإدارة</th>
                                                        <th>الوظيفة</th>
                                                        <th>المسمى الوظيفي</th>
                                                        <th>تاريخ الحركة</th>
                                                        <th>طريقة شغل الوظيفة</th>
                                                        <th>نوع التخصص</th>
                                                        <th>حالة الوظيفة</th>
                                                        <th>تعديل</th>
                                                        <th>حذف</th>
                                                    </tr>
                                                </thead>
                                                {this.props.empTrans.map(trans => (
                                                    <tbody>
                                                        <tr id={trans.TRANS_DATE}>
                                                            <td>{trans.catename}</td>
                                                            <td>
                                                                {trans.MAIN_BOX_NAME}</td>
                                                            <td >{trans.SUP_BOX_NAME}</td>
                                                            <td>{trans.TRANS_DATE}</td>
                                                            <td>{trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                            <td>{trans.G_NAME}</td>
                                                            <td>{trans.INDICATOR_NAME}</td>
                                                            <td onClick={this.state.edit ? this.handelEdit_2 : this.handelEdit_1}><i style={{ marginTop: 7 }} empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} jdname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} jasform={trans.JOB_ASSIGNMENT_FORM_ARABIC} indname={trans.INDICATOR_NAME} class="fas fa-edit"></i></td>
                                                            <td><i style={{ marginTop: 7 }} class="fas fa-backspace"></i></td>
                                                        </tr>
                                                    </tbody>

                                                ))}
                                            </Fragment>
                                        }
                                    </table>
                                    {this.props.empTrans.length < 1 ? <h1>عفواً لا توجد بييانات</h1> : null}


                                </div>
                            </div>

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {this.state.editConfirmed ? <div style={{ width: "100%" }} class="alert alert-warning" role="alert"> هل انت متأكد من تعديل هذا التدرج  ؟ <button onClick={this.handelEdit_2} style={{ position: "absolute", left: "3%", top: "78%" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeEditConfirmHandler} style={{ fontSize: 15, position: "relative", top: "7%", left: "56%" }} class="fas fa-times-circle"></i></div> : null}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cates: state.posts.cates,
        jobdgbycat: state.posts.jobdgbycat,
        empTrans: state.posts.empTrans,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        empcurrentjd: state.posts.empcurrentjd,
        empavailsup: state.posts.empavailsup,
        upjd: state.posts.upjd,
        downJd: state.posts.downJd
    };
};
export default connect(mapStateToProps, {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd
})(EmpTrans);


{/* <table class="table table-striped table-bordered table-hover" id="dataTables-example">
{!this.state.edit && this.state.showTransResult ?
    <Fragment>
        <thead>
            <tr>
                {this.state.edit ? <th style={{ width: 250 }}>الإسم</th> : null}
                <th style={{width: 110}}>الوظيفة</th>
                <th style={{width: 220}}>المسمى الوظيفي</th>
                <th style={{width: 90}}>تاريخ الحركة</th>
                <th style={{width: 150}}>الإدارة</th>
                <th style={{width: 90}}>طريقة شغل الوظيفة</th>
                <th>نوع التخصص</th>
                <th>حالة الوظيفة</th>
                <th>تعديل</th>
                <th>حذف</th>
            </tr>
        </thead>
        {this.props.empTrans.map(trans => (
            <tbody>
                <tr>
                    <td ref="jdname">{trans.MAIN_BOX_NAME}</td>
                    <td ref="supboxname">{trans.SUP_BOX_NAME}</td>
                    <td >{trans.TRANS_DATE}</td>
                    <td ref="catname">{trans.catename}</td>
                    <td ref="jasi">{trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                    <td ref="gname">{trans.G_NAME}</td>
                    <td ref="indname">{trans.INDICATOR_NAME}</td>
                    <td onClick={this.handelEdit_1}><i empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} jdname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} jasform={trans.JOB_ASSIGNMENT_FORM_ARABIC} indname={trans.INDICATOR_NAME} class="fas fa-edit"></i></td>
                    <td><i class="fas fa-backspace"></i></td>
                </tr>
            </tbody>

        ))}



    </Fragment>

    : !this.state.add && this.state.edit ?
        <Fragment>

            <thead>
                <tr>
                    <th>الإسم</th>
                    <th>تاريخ الحركة</th>
                    <th>الإدارة</th>
                    <th>الوظيفة</th>
                    <th>المسمى الوظيفي</th>
                    <th>نوع التخصص</th>
                    <th>طريقة شغل الوظيفة</th>
                    <th>حالة الوظيفة</th>
                    <th>تعديل</th>
                    <th>حذف</th>
                </tr>
            </thead>
            <tbody>
                <tr>

                    <td style={{ width: 250 }} ><input type="text" placeholder={this.state.empname ? this.state.empname : null} disabled /></td>
                    {this.state.showDateUnlessEdit ? <td><input onClick={this.editDate} type="text" id="date" onChange={this.handelDateClick} value={this.state.transdate ? this.state.transdate : null} style={{ display: "inline", width: 80 }} /></td>
                        : <td><input type="date" id="date" onChange={this.handelDateClick} value={this.state.transdate ? this.state.transdate : null} style={{ display: "inline", width: 80 }} /></td>
                    }
                    <td><input placeholder={this.state.catname} /></td>
                    <td>
                        <select onChange={this.catClickHandeler}>
                            {this.props.cates.map(cate => (
                                <Fragment>
                                    <option id={cate.CAT_ID}>
                                        {cate.CAT_NAME}
                                    </option>
                                </Fragment>
                            ))}
                            <option selected>
                                {this.state.catname}
                            </option>
                        </select>
                    </td>
                    <td>
                        <select onChange={this.jdNameClickHandeler}>
                            {this.props.jobdgbycat.map(job => (
                                <option>
                                    {job.J_D_NAME}
                                </option>
                            ))}
                            <option selected>{this.state.jdname}</option>
                        </select>
                    </td>
                    <td>
                        <select required onChange={this.supboxClickHandeler}>
                            {this.props.empavailsup.map(job => (
                                <option>
                                    {job.SUP_BOX_NAME}
                                </option>
                            ))}
                            <option selected>{this.state.supboxname}</option>

                        </select>
                    </td>
                    <td>
                        <select required onChange={this.gNameClickeHandeler}>
                            <option>فني</option>
                            <option>إداري</option>
                        </select>
                    </td>
                    <td>
                        <select required onChange={this.jasiClickeHandeler}>
                            <option>أخرى</option>
                            <option>تعيين</option>
                            <option>نقل</option>
                            <option>ندب</option>
                            <option>اعاره</option>
                            <option>تكليف</option>
                            <option>محدد المدة</option>
                            <option>تدريب</option>
                            <option>ترقية</option>
                            <option>تثبيت</option>
                            <option>نقل طبقا لتعديل تنظيمي</option>
                            <option>إعادة تعيين</option>
                            <option>إلغاء ندب</option>
                            <option>إلغاء تكليف</option>
                            <option>تسكين</option>
                            <option>تعديل مسمى الوظيفة</option>
                            <option>عقد مؤقت</option>
                            <option>مكافئة شاملة</option>
                            <option>تعديل ندب</option>
                            <option>إشراف</option>
                            <option>الحاق</option>
                            <option>عقد إختبار</option>
                            <option>إنهاء خدمة</option>
                            <option>أستيعاب</option>
                            <option selected>{this.state.jasi}</option>
                        </select>
                    </td>
                    <td>
                        <select required onChange={this.indClickeHandeler}>
                            <option>أصلية</option>
                            <option>حالية</option>
                            <option>سابقة</option>
                            <option selected>{this.state.indname}</option>
                        </select></td>
                    <td onClick={this.editHandler}><i class="fas fa-edit"></i></td>
                    <td><i class="fas fa-backspace"></i></td>
                </tr>
            </tbody>
        </Fragment>
        : null}

</table> */}