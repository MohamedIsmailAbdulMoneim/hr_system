import React, { Fragment } from "react";
import {
    getEmpDetails, getEmpTrans, getUpJd, getEmpAppraisal
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };

    }


    empidHandler = (e) => {
        this.props.getEmpDetails(e.target.value)
    }

    empTransButtonHandler = (e) => {
        this.props.getEmpTrans(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
        this.props.getUpJd(10, this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null)
    }

    empAppraisalHandler = (e) => {
        this.props.getEmpAppraisal(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null, "","")

    }

    render() {
        console.log(this.props.empdetails);

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Forms</h1>
                        <div style={{ display: "flex" }} className="col-lg-8">
                            <div style={{ background: "#f3f1f1", boxShadow: "0 10px 6px -6px #777", borderRadius: 5, height: "100%", width: "100%" }} >
                                <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                <div style={{ display: "flex" }}>
                                    <label style={{ marginLeft: "5%", marginRight: 20 }} for="payroll"> رقم الأداء :</label>
                                    <input onChange={this.empidHandler} style={{ width: "10%", marginRight: "5%" }} type="text" id="payroll"></input>
                                    <label style={{ marginRight: "5%", marginLeft: "5%" }} for="name">الإسم :</label>
                                    <input style={{ width: "50%" }} type="text" id="name" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null} />
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "5%" }} for="doa">تاريخ العقد  :</label>
                                    <input style={{ width: "20%" }} type="text" id="doa" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SECTOR_JOIN_DATE : null : null}></input>
                                    <label style={{ marginRight: "5%", marginLeft: "5%" }} for="doj">تاريخ التعيين :</label>
                                    <input type="text" id="doj" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].TRANS_DATE : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: "5%" }} for="cj">الوظيفة الحالية  :</label>
                                    <input type="text" id="cj" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null}></input>
                                    <label style={{ marginLeft: "5%" }} for="js">طريقة شغلها :</label>
                                    <input type="text" id="js" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].WOG : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: "1%", marginLeft: "1%" }} for="dep">الإدارة  :</label>
                                    <input style={{ width: "80%" }} type="text" id="dep" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label for="m">النطاق الإشرافي  :</label>
                                    <input style={{ width: "80%" }} type="text" id="m"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label for="station">المحطة  :</label>
                                    <input type="text" id="station" style={{ width: "20%" }} value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} ></input>
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
                                    <input type="text" id="id" style={{ width: "30%" }} value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NATIONAL_ID_CARD_NO : null : null} ></input>
                                    <label for="w">جهة الإصدار :</label>
                                    <input type="text" id="w" style={{ width: "10%" }}></input>
                                    <label for="d">تاريخ الإصدار :</label>
                                    <input type="text" id="d" style={{ width: "15%" }}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="ii">الرقم التأميني  :</label>
                                    <input type="text" id="ii" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SOCIAL_INSURANCE_NUMBER : null : null}></input>
                                    <label style={{ marginLeft: 20 }} for="io">مكتب التأمينات :</label>
                                    <input type="text" id="io"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="adress">العنوان  :</label>
                                    <input type="text" id="adress" style={{ width: "70%" }} value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].ADDRESS : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: "1%" }} for="mob">الموبايل  :</label>
                                    <input type="text" id="mob" style={{ width: "20%" }} value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_3_MOBILE : null : null}></input>
                                    <label style={{ marginLeft: "1%" }} for="h">ت المنزل :</label>
                                    <input type="text" id="h" style={{ width: "20%" }} value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_1_HOME : null : null}></input>
                                    <label style={{ marginLeft: "1%" }} for="office">المكتب :</label>
                                    <input type="text" id="office" style={{ width: "20%" }} value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_1_OFFICE : null : null}></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="email">البريد الألكتروني  :</label>
                                    <input type="text" id="email" value={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMP_EMAIL : null : null}></input>
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
                                </div>
                            </div>

                        </div>
                        <div style={{ display: "flex" }} className="col-lg-4">
                            <div style={{ background: "#f3f1f1", boxShadow: "0 10px 6px -6px #777", borderRadius: 5, height: 500, width: "100%" }} >
                                <img style={{ borderTop: 3 }} src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">المؤهل</button>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg" > <Link to={`/EmpTrans`}><a onClick={this.empTransButtonHandler} href="/EmpTrans">التدرج</a></Link></button>
                                    </div>
                                </div>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">الخبرات</button>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">العائلية</button>
                                    </div>
                                </div>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">التدريب</button>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">الجزاءات</button>
                                    </div>
                                </div>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">الهيكل</button>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">بطاقة الوصف</button>
                                    </div>
                                </div>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empsappraisal`}><a onClick={this.empAppraisalHandler} href="/empsappraisal">التقييمات السنوية</a></Link></button>
                                </div>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">طباعة البيانات الوظيفية</button>
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
        empdetails: state.posts.empdetails
    };
};
export default connect(mapStateToProps, {
    getEmpDetails, getEmpTrans, getUpJd, getEmpAppraisal
})(Employee);