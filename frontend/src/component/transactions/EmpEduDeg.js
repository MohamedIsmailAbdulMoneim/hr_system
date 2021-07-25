import React, { Fragment } from "react";
import {
    getEmpEdu, getEmpName, getEmpNameByName, getQulSpeciality, getUneSchool
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactmoment from "react-moment"
import { TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 500,
        height: 500,
        margin: 100,
    },
    //style for font size
    resize: {
        fontSize: 100
    },
}

class EmpEduDeg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { add: false, edit: false, empid: null, empname: null, qual: null, showNamesResults: false, showSpeciality: false, showUneSchools: false, speciality: null, uneversity: null, graduationGrade: null, graduationYear: null };

    }
    /* 
    
    --------------------
    Create Methods
    --------------------
    
    */

    addButtonClickHandeler = () => {
        this.setState({ add: true, empid: null, empname: null, transdate: null, catname: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, shoshowStructWAddw: false, showStruct: false })
    }

    specialityHandler = (e) => {
        this.props.getQulSpeciality(e.target.value)
        this.setState({
            showSpeciality: true,
            showNamesResults: false,
            showUneSchools: false
        })
    }

    uneshcoolHandler = (e) => {
        this.props.getUneSchool(e.target.value)
        this.setState({
            showUneSchools: true,
            showSpeciality: false,
            showNamesResults: false
        })

    }

    handelInsertNewEdu = (e) => {
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

    closeAddSectionHandler = (e) => {
        this.setState({ add: false })
    }



    /* 
    
    --------------------
    Read Methods
    --------------------
    
    */


    idInputHandler = (e) => {
        this.refs.name.value = ''
        this.refs.name.placeholder = ''
        this.setState({ showFamilyResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpEdu(e.target.value, "")
            this.setState({ showStruct: false, showNamesResults: false, showTransResult: true, showStructWAdd: false, edit: false, empid: e.target.value })
        }
    }



    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showSpeciality: false, showUneSchools: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpEdu("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }

    namesOptionshandler = (e) => {
        this.refs.name.value = e.target.value
        this.props.getEmpEdu("", e.target.value)
        this.setState({ showFamilyResult: true })
    }

    /* 
    
    --------------------
    Update Methods
    --------------------
    
    */


    handelEdit_1 = (e) => {
        this.setState({ add: false, edit: true, empname: e.target.getAttribute("empname"), catname: e.target.getAttribute("catname"), catid: e.target.getAttribute("catid"), jdname: e.target.getAttribute("jdname"), supboxname: e.target.getAttribute("supboxname"), gname: e.target.getAttribute("jobgroup"), jasi: e.target.getAttribute("jasform"), indname: e.target.getAttribute("indname") })
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

    closeEditSectionHandler = (e) => {
        this.setState({ edit: false })
    }

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


    handelDateClick = (e) => {
        this.setState({ transdate: e.target.value })
    }



    // End Of Methods





    componentDidMount() {
    }

    idInputAddHandler = (e) => {
        console.log(e.target.value);
    }


    render() {
        console.log(this.props.uneshcool);
        // const styles = {
        //     display: "block",
        //     padding: "0.375rem 2.25rem 0.375rem 0.75rem",
        //     width: "55%",
        //     height: 250,
        //     backgroundColor: "#fff",
        //     color: "#212529",
        //     fontSize: "2rem",
        //     lineHeight: 1.5,
        //     fontWeight: "bold",
        //     border: "1px solid #ced4da",
        //     borderRadius: "0.25rem",
        //     appearance: "none",
        //     transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
        // }

        const { classes } = this.props;


        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ height: "100%", width: 750 }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                        <span style={{ position: "relative", right: 50 }}>إضافة مؤهل جديد</span> {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", left: 530 }} class="fas fa-times-circle"></i> : null}
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, position: "relative", top: 5, left: 380 }} class="fas fa-times-circle"></i> : null}
                                        <input onClick={this.addNewHandler} style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" value="اضف" />
                                    </div>

                                    <div style={{ display: "flex", marginTop: 5 }}>
                                        <div style={{ marginRight: 20, marginTop: 5 }}>

                                            <div className="col-lg-4">
                                                {/* <TextField
                                                    id="with-placeholder"
                                                    label={<span style={{ fontSize: '2rem' }}>dsdsa</span>}
                                                    placeholder="id"
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.resize,
                                                        },
                                                    }}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    autoFocus={true}
                                                    helperText={"Add an existing id or select "} /> */}

                                                <div class="input-group">
                                                    <span >رقم الأداء :  </span><input onChange={this.idInputAddHandler} type="number" style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" placeholder={this.props.empNameByName ? this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].EMPLOYEE_ID : null : null} />
                                                </div>
                                                <div class="input-group">
                                                    <span>الإسم :  </span><input onKeyUp={this.nameInputHandler} ref="insertName" onChange={this.nameInputAddHandler} required style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" placeholder={this.props.empname ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null || this.props.empNameByName ? this.props.empNameByName.length >= 1 ? this.props.empNameByName[0].NAME_ARABIC : null : null} />
                                                </div>
                                                <div class="input-group">
                                                    <span>الدرجة :  </span>
                                                    <select required style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.catClickHandeler}>
                                                        <option selected>
                                                            اختر الدرجة
                                                        </option>
                                                        <option>زمالة</option>
                                                        <option>دكتوراه</option>
                                                        <option>ماجستير</option>
                                                        <option>دبلوم دراسات عليا</option>
                                                        <option>ليسانس</option>
                                                        <option>بكالوريوس</option>
                                                        <option>دبلوم</option>
                                                        <option>الشهادة الأهلية</option>
                                                        <option>ثانوية</option>
                                                        <option>إعدادية</option>
                                                        <option>إبتدائية</option>
                                                        <option>شهادة محو الأمية</option>
                                                        <option>بدون مؤهل</option>
                                                        <option>مؤهل فوق متوسط</option>
                                                        <option>مؤهل متوسط</option>
                                                        <option>شهادة</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="input-group">
                                                    <span>التخصص :  </span><input ref="spec" onChange={this.specialityHandler} />
                                                </div>
                                                <div class="input-group">
                                                    <span>جهة التخرج :  </span><input ref="spec" onChange={this.uneshcoolHandler} />

                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="input-group">
                                                    <span>سنة التخرج :  </span><input type="number" onChange={this.graduationYearHandler} />
                                                </div>
                                                <div class="input-group">
                                                    <span>التقدير :  </span>
                                                    <select required style={{ marginTop: 5, marginRight: 6, height: 25, width: 188 }} onChange={this.gNameClickeHandeler}>
                                                        <option>امتياز مع مرتبة الشرف</option>
                                                        <option>ممتاز</option>
                                                        <option>جيد جداً مع مرتبة الشرف</option>
                                                        <option>جيد جداً</option>
                                                        <option>جيد</option>
                                                        <option>مقبول</option>
                                                        <option selected>اخترالتقدير</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.addConfirmed ? <div style={{ width: "70%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة تدرج جديد ؟ <button onClick={this.handelInsertNewTrans} style={{ position: "absolute", left: "17%", top: "80%" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15, position: "relative", top: "5%", left: "62%" }} class="fas fa-times-circle"></i></div> : null}
                            </div>
                        </div>
                    </div> : null}
                {this.state.showNamesResults ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                            {this.props.empNameByName.map((name => (
                                <option>{name.NAME_ARABIC}</option>
                            )))}
                        </select>
                    </div> : null}
                {this.state.showSpeciality ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                            {this.props.specarabic.map((spec => (
                                <option>{spec.SPECIALITY_ARABIC}</option>
                            )))}
                        </select>
                    </div> : null}
                {this.state.showUneSchools ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                            {this.props.uneshcool.map((us => (
                                <option>{us.UNIVERSITY_SCHOOL_ARABIC}</option>
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
                                مؤهلات العاملين
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandler} placeholder={this.props.empname && !this.state.edit ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة مؤهل جديد</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading" style={{ display: "flex", justifyContent: "space-evenly" }}>
                                {this.state.edit ? <i onClick={this.closeEditSectionHandler} style={{ fontSize: 15, position: "relative", bottom: 10, left: 550 }} class="fas fa-times-circle"></i> : null}
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <h4 style={{ textAlign: "right", fontWeight: "bolder" }}>مؤهلات العاملين</h4>

                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الدرجة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المؤهل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التخصص</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة التخرج</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة التخرج</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التقدير</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {!this.state.add && !this.state.edit ? this.props.empEdu.map((edu) => (
                                            <tbody>
                                                <tr>
                                                    <td><input style={{ border: 0 }} placeholder={edu.DEGREE_ARABIC} disabled /></td>
                                                    <td>{edu.DEGREE_DESCRIPTION}</td>
                                                    <td>{edu.SPECIALITY_ARABIC}</td>
                                                    <td>{edu.UNIVERSITY_SCHOOL_ARABIC}</td>
                                                    <td>{edu.GRADUATION_YEAR}</td>
                                                    <td>{edu.GRADE_ARABIC}</td>
                                                    <td ><i onClick={this.handelEdit_1} class="fas fa-edit"></i></td>
                                                    <td><i class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        )) : !this.state.add && this.state.edit ?
                                            <Fragment>
                                                <thead>
                                                    <tr>
                                                        <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الدرجة</th>
                                                        <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المؤهل</th>
                                                        <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التخصص</th>
                                                        <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة التخرج</th>
                                                        <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة التخرج</th>
                                                        <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التقدير</th>
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
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

// const useStyles = (theme) => ({
//     styledLine: {
//         color: "red"
//     }
// });


const mapStateToProps = (state) => {
    return {
        empEdu: state.posts.empEdu,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        cates: state.posts.cates,
        specarabic: state.posts.specarabic,
        uneshcool: state.posts.uneshcool
    };
};
export default connect(mapStateToProps, {
    getEmpEdu, getEmpName, getEmpNameByName, getQulSpeciality, getUneSchool
})(withStyles(styles)(EmpEduDeg));

