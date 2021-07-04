import React, { Fragment } from "react";
import {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Reactmoment from "react-moment"


class EmpTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = { add: false, edit: false, empid: null, empname: null, transdate: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, catname: null, date: null, catid: null, maninboxname: null };

    }
    clickHandler = (e) => {
        e.preventDefault()
        this.setState({ edit: false })
        this.props.getEmpTrans(e.target.value)
        this.setState({ catname: e.target.value })

    }

    addButtonClickHandeler = () => {
        this.setState({add : true})
    }

    handelInsert = (e) => {
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
            console.log(res);
        })
    }

    getNameAndCurrent = (e) => {
        this.setState({
            empid: e.target.value
        })
        this.props.getEmpName(e.target.value)
        this.props.getCurrentJd(e.target.value)
    }

    handelDateClick = (e) => {
        console.log(e.target.value)
        this.setState({ transdate: e.target.value })
    }



    handelSearch = (e) => {
        this.props.getEmpNameByName(e.target.value)
    }

    catClickHandeler = (e) => {
        console.log('hit');
        this.props.getJobDgByCat(e.target.value)
        this.setState({ catname: e.target.value })

    }

    jdNameClickHandeler = (e) => {
        this.setState({ jdname: e.target.value })
        this.props.getAvailSupBox(this.state.catname, e.target.value)

    }

    supboxClickHandeler = (e) => {
        this.setState({
            supboxname: e.target.value
        })
        console.log(e.target.value);
    }

    gNameClickeHandeler = (e) => {
        this.setState({
            gname: e.target.value
        })
        console.log(e.target.value);
    }

    jasiClickeHandeler = (e) => {
        this.setState({
            jasi: e.target.value
        })
        console.log(e.target.value);
    }

    indClickeHandeler = (e) => {
        this.setState({
            indname: e.target.value
        })
        console.log(e.target.value);
    }




    handelEdit_1 = (e) => {
        var myCurrentDate = e.target.getAttribute("transdate").slice(0, 10);
        var myFutureDate = new Date(myCurrentDate);
        myFutureDate.setDate(myFutureDate.getDate() + 1);//myFutureDate is now 8 days in the future
        let newDate = myFutureDate.getUTCFullYear() + "-" + (myFutureDate.getUTCMonth() + 1) + "-" + myFutureDate.getUTCDate()
        this.setState({ edit: true, date: newDate, catname: e.target.getAttribute("catname"), catid: e.target.getAttribute("catid"), mainboxname: e.target.getAttribute("mainboxname"), supboxname: e.target.getAttribute("supboxname"), gname: e.target.getAttribute("jobgroup"), jasi: e.target.getAttribute("jasform"), indname: e.target.getAttribute("indname") })
        console.log(e.target.getAttribute("transdate"));
    }

    handelEdit_2 = (e) => {
        e.preventDefault()
        // let data = { empNat: this.state.empNat, appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }

        let data = { data: document.getElementById("date") ? document.getElementById("date").value : null }
        axios({
            method: "PUT",
            data: data,
            url: `http://localhost:5000/updateemptrans`,
            headers: { "Content-Type": "application/json" },
        }).then(data => {
            console.log(data);
        })



    }


    render() {
        console.log(this.props.empcurrentjd);
        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "100%",
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
                {this.state.add ? <form> <div class="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: "100%", width: 750 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <span style={{position: "relative", right:50}}>إضافة تدرج جديد</span>
                                <input style={{ position: "relative", right:250 ,fontSize: 20}} type="submit" class="btn btn-primary" onSubmit={this.handelInsert} value="Add" />

                            </div>

                            <div style={{ display: "flex", marginTop: 5 }}>
                                <div style={{ marginRight: 20, marginTop: 5 }}>
                                    <div className="col-lg-4">
                                        <div class="input-group">
                                            <span >رقم الأداء :  </span><input required onClick={this.getNameAndCurrent} style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>الإسم :  </span><input required style={{ background: "white", marginTop: 5, marginRight: 5, height: 25, width: 188, border: "1px solid black" }} type="text" name="first_name" value={this.props.empname ? this.props.empname[0].NAME_ARABIC : this.props.empNameByName ? this.props.empNameByName[0].NAME_ARABIC : null} />
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
                                                        <p>dd</p>
                                                    </Fragment>
                                                ))}
                                                <option selected>
                                                    اختر الإدارة
                                                </option>
                                            </select>
                                        </div>

                                        <div class="input-group">
                                            <span>الوظيفة :  </span>
                                            <select required style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.jdNameClickHandeler}>
                                                {this.props.jobdgbycat.map(job => (
                                                    <option>
                                                        {job.J_D_NAME}
                                                    </option>
                                                ))}
                                                <option selected>{this.props.empcurrentjd.length >= 1 ? this.props.empcurrentjd[0].J_D_NAME : null}</option>

                                            </select>
                                        </div>
                                        <div class="input-group">
                                            <span>المسمى الوظيفي :  </span>
                                            <select required style={{ marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.supboxClickHandeler}>
                                                {this.props.empavailsup.map(job => (
                                                    <option>
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
                    
                </div> </form> : null}

                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tables</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                تدرج الموظفين
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20 }} class="input-group">
                                    <span>رقم الأداء  </span><input style={{ background: "white", width: 20, marginBottom: 5, marginRight: 5, border: "1px solid black", width: 120 }} onDoubleClick={this.clickHandler} type="text" name="first_name" />
                                </div>
                                <button onClick={this.handelSubmit} style={{ position: "relative", right: 10, top: 8 }} type="button" class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة تدرج جديد</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                DataTables Advanced Tables
                                <i style={{fontSize: 40 , color: "green" ,position: "relative", right:480}} class="fas fa-file-excel"></i>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        {!this.state.edit ?
                                            <Fragment>
                                                <thead>
                                                    <tr>
                                                        <th>الإسم</th>
                                                        <th>تاريخ الحركة</th>
                                                        <th>كود الإدارة</th>
                                                        <th>الإدارة</th>
                                                        <th>كود الوظيفة</th>
                                                        <th>الوظيفة</th>
                                                        <th>كود المسمى الوظيفي</th>
                                                        <th>المسمى الوظيفي</th>
                                                        <th>نوع التخصص</th>
                                                        <th>طريقة شغل الوظيفة</th>
                                                        <th>حالة الوظيفة</th>
                                                        <th>تعديل</th>
                                                        <th>حذف</th>


                                                    </tr>
                                                </thead>
                                                {this.props.empTrans.map(trans => (
                                                    <tbody>
                                                        <tr>
                                                            <td ref="name">{trans.NAME_ARABIC}</td>
                                                            <td >{trans.TRANS_DATE}</td>
                                                            <td ref="catid">{trans.CAT_ID}</td>
                                                            <td ref="catname">{trans.CAT_NAME}</td>
                                                            <td ref="mainboxid">{trans.MAIN_BOX_ID}</td>
                                                            <td ref="mainboxname1">{trans.MAIN_BOX_NAME}</td>
                                                            <td ref="supboxid">{trans.SUP_BOX_ID}</td>
                                                            <td ref="supboxname">{trans.SUP_BOX_NAME}</td>
                                                            <td ref="gname">{trans.G_NAME}</td>
                                                            <td ref="jasi">{trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                            <td ref="indname">{trans.INDICATOR_NAME}</td>
                                                            <td onClick={this.handelEdit_1}><i empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} mainboxname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} onClick={this.editHandler} jasform={trans.JOB_ASSIGNMENT_FORM_ARABIC} indname={trans.INDICATOR_NAME} class="fas fa-edit"></i></td>
                                                            <td><i class="fas fa-backspace"></i></td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </Fragment>

                                            :
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
                                                        <td>{this.refs.name ? this.refs.name.innerHTML : null}</td>
                                                        <td><input id="date" ref onClick={this.handelEdit_2} value={this.state.date ? this.state.date : null} style={{ display: "inline" }} /></td>
                                                        {/* <td><input placeholder={this.state.catname} /></td> */}
                                                        <td>
                                                            <select onChange={this.catClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                        <p>dd</p>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    {this.state.catname}
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select>
                                                                {this.props.jobdgbycat.map(job => (
                                                                    <option>
                                                                        {job.J_D_NAME}
                                                                    </option>
                                                                ))}
                                                                <option selected>{this.state.mainboxname}</option>
                                                            </select>
                                                        </td>
                                                        <td><input placeholder={this.state.supboxname} /></td>
                                                        <td><input placeholder={this.state.gname} /></td>
                                                        <td><input placeholder={this.state.jasi} /></td>
                                                        <td><input placeholder={this.state.indname} /></td>
                                                        <td><i class="fas fa-edit"></i></td>
                                                        <td><i class="fas fa-backspace"></i></td>
                                                    </tr>
                                                </tbody>
                                            </Fragment>
                                        }

                                    </table>
                                    {this.props.empTrans.length < 1 ? <h1>عفواً لا توجد بييانات</h1> : null}
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
        cates: state.posts.cates,
        jobdgbycat: state.posts.jobdgbycat,
        empTrans: state.posts.empTrans,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        empcurrentjd: state.posts.empcurrentjd,
        empavailsup: state.posts.empavailsup
    };
};
export default connect(mapStateToProps, {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox
})(EmpTrans);