import React, { Fragment } from "react";
import {
    getEmpFamily,getEmpName,getEmpNameByName
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactmoment from "react-moment"




class EmpFamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showFamilyResult: true, add: false, edit: false, empid: null, empname: null, transdate: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, catname: null, catid: null, supboxid: null, levels: null, showStructWAdd: false, showStruct: false, showNamesResults: false };

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
            this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true })
        }
    }


    nameInputHandler = (e) => {
        this.setState({showNamesResults:true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpFamily("",e.target.value)
            this.setState({showFamilyResult: true})
        }
    }


    namesOptionshandler = (e) =>{
        this.refs.name.value = e.target.value
        this.props.getEmpFamily("",e.target.value)
        this.setState({showFamilyResult: true})
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

        console.log(this.props.empfamily);
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
                {this.state.add ? <div> <form> <div class="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: "100%", width: 750 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <span style={{ position: "relative", right: 50 }}>إضافة تدرج جديد</span> {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", left: 530 }} class="fas fa-times-circle"></i> : null}
                                {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, position: "relative", top: 5, left: 380 }} class="fas fa-times-circle"></i> : null}

                                <input style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" onSubmit={this.handelInsertNewTrans} value="Add" />

                            </div>

                            <div style={{ display: "flex", marginTop: 5 }}>
                                <div style={{ marginRight: 20, marginTop: 5 }}>
                                    <div className="col-lg-4">
                                        <div class="input-group">
                                            <span >رقم الأداء :  </span><input type="number" onKeyUp={this.getNameAndCurrent} style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>الإسم :  </span><input required style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" value={this.props.empname || this.props.empNameByName ? this.props.empname.length >= 1 || this.props.empNameByName.length >= 1 ? this.props.empname[0].NAME_ARABIC || this.props.empNameByName[0].NAME_ARABIC : null : null} />
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
                                            </select>
                                        </div>

                                    </div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                </form>


                </div>: null}
                
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
                                <div style={{ marginTop: 20,marginLeft:0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name"  />
                                </div>
                                <div style={{ marginTop: 20,marginRight:0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandler} placeholder={this.props.empname && !this.state.edit ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null} style={{ background: "white", width: "80%", marginBottom: 5,marginRight: 0,marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name"/>
                                </div>
                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة تدرج جديد</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading" style={{display: "flex",justifyContent: "space-evenly"}}>
                            {this.props.empname ? this.props.empname.length >= 1 ? <h3>  بيان بحركة السيد / {this.props.empname[0].NAME_ARABIC}</h3> : null : null || this.props.empNameByName ? this.props.empNameByName.length >= 1 ? ` السيد ${this.props.empNameByName[0].NAME_ARABIC} ` : null : null}
                                <button onClick={this.showStruct} style={{height:"50%", position: "relative", right: "20%" }} type="button" class="btn btn-primary">عرض الهيكل الخاص بالموظف</button>
                                {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", bottom: 10, left: 550 }} class="fas fa-times-circle"></i> : null}
                                <i style={{ fontSize: 40, position: "relative", right: "20%" }} class="fas fa-file-excel"></i>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        {!this.state.edit && !this.state.add && this.state.showFamilyResult ?
                                            <Fragment>
                                                <thead>
                                                    <tr>
                                                        {this.state.edit ? <th style={{ width: 250 }}>الإسم</th> : null}
                                                        <th>تاريخ الحركة</th>
                                                        {/* <th>كود الإدارة</th> */}
                                                        <th>الإدارة</th>
                                                        {/* <th>كود الوظيفة</th> */}
                                                        <th>الوظيفة</th>
                                                        {/* <th>كود المسمى الوظيفي</th> */}
                                                        <th>المسمى الوظيفي</th>
                                                        <th>نوع التخصص</th>
                                                        <th>طريقة شغل الوظيفة</th>
                                                        <th>حالة الوظيفة</th>
                                                        <th>تعديل</th>
                                                        <th>حذف</th>


                                                    </tr>
                                                </thead>
                                                {this.props.empfamily.map(trans => (
                                                    <tbody>
                                                        <tr>
                                                            {/* <td >{trans.TRANS_DATE.slice(0, 10)}</td> */}
                                                            {/* <td ref="catid">{trans.CAT_ID}</td> */}
                                                            <td ref="catname">{trans.CAT_NAME}</td>
                                                            {/* <td ref="mainboxid">{trans.MAIN_BOX_ID}</td> */}
                                                            <td ref="jdname">{trans.MAIN_BOX_NAME}</td>
                                                            {/* <td ref="supboxid">{trans.SUP_BOX_ID}</td> */}
                                                            <td ref="supboxname">{trans.SUP_BOX_NAME}</td>
                                                            <td ref="gname">{trans.G_NAME}</td>
                                                            <td ref="jasi">{trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                            <td ref="indname">{trans.INDICATOR_NAME}</td>
                                                            <td onClick={this.handelEdit_1}><i empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} jdname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} onClick={this.editHandler} jasform={trans.JOB_ASSIGNMENT_FORM_ARABIC} indname={trans.INDICATOR_NAME} class="fas fa-edit"></i></td>
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
                                                            <td><input type="date" id="date" onChange={this.handelDateClick} value={this.state.transdate ? this.state.transdate : null} style={{ display: "inline", width: 80 }} /></td>
                                                            {/* <td><input placeholder={this.state.catname} /></td> */}
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
                                                            <td onClick={this.handelEdit_2}><i class="fas fa-edit"></i></td>
                                                            <td><i class="fas fa-backspace"></i></td>
                                                        </tr>
                                                    </tbody>
                                                </Fragment>
                                                : null}

                                    </table>
                                    {this.props.empTrans.empfamily < 1 ? <h1>عفواً لا توجد بييانات</h1> : null}
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
        empfamily: state.posts.empfamily
    };
};
export default connect(mapStateToProps, {
    getEmpFamily,getEmpName,getEmpNameByName
})(EmpFamily);