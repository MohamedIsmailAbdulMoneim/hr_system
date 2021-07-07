import React, { Fragment } from "react";
import {
    getMainCodes
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };

    }


    clickHandler = (e) => {
        console.log(e.target.getAttribute('name'));
    }

    deleteHandler = (e) => {
        console.log(e.target.getAttribute('name'));
        const nameVal = e.target.getAttribute("name") // getting the J_D_ID from name attr

    }

    editHandler = (e) => {
        this.setState({ jDId: e.target.getAttribute("jDID") }) // getting the element details come from database
        this.setState({ mainBoxName: e.target.getAttribute("mainBoxName") })
        this.setState({ supBoxId: e.target.getAttribute("supBoxId") })
        this.setState({ supBoxName: e.target.getAttribute("supBoxName") })
        this.setState({ edit: true })

    }

    render() {


        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Forms</h1>
                        <div style={{ display: "flex" }} className="col-lg-8">
                            <div style={{ background: "#f3f1f1", boxShadow: "0 10px 6px -6px #777", borderRadius: 5, height: "100%", width: "100%" }} >
                                <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                <div style={{ display: "flex" }}>
                                    <label style={{ marginLeft: 20, marginRight: 20 }} for="payroll"> رقم الأداء :</label>
                                    <input style={{ width: 100, marginRight: 15 }} type="text" id="payroll"></input>
                                    <label style={{ marginRight: 150, marginLeft: 20 }} for="name">الإسم :</label>
                                    <input style={{ width: 500 }} type="text" id="name"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: 10, marginLeft: 20 }} for="doa">تاريخ العقد  :</label>
                                    <input style={{ width: 176, marginRight: 20 }} type="text" id="doa"></input>
                                    <label style={{ marginRight: 150, marginLeft: 20 }} for="doj">تاريخ التعيين :</label>
                                    <input type="text" id="doj"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: 10, marginLeft: 20 }} for="cj">الوظيفة الحالية  :</label>
                                    <input type="text" id="cj"></input>
                                    <label style={{ marginRight: 150, marginLeft: 20 }} for="js">طريقة شغلها :</label>
                                    <input type="text" id="js"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginRight: 55, marginLeft: 20 }} for="dep">الإدارة  :</label>
                                    <input style={{ width: 650 }} type="text" id="dep"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20, marginRight: 10 }} for="m">النطاق الإشرافي  :</label>
                                    <input style={{ width: 650 }} type="text" id="m"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="station">المحطة  :</label>
                                    <input type="text" id="station"></input>
                                    <label style={{ marginLeft: 20 }} for="area">المنطقة  :</label>
                                    <input type="text" id="area"></input>
                                    <label style={{ marginLeft: 20 }} for="city">المحافظة  :</label>
                                    <input type="text" id="city"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="js">الحالة الوظيفية  :</label>
                                    <input type="text" id="js"></input>
                                    <label style={{ marginLeft: 20 }} for="c">التقسيم السنوي للعالم الحالي :</label>
                                    <input type="text" id="c"></input>
                                </div>
                                <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="id">الرقم القومي  :</label>
                                    <input type="text" id="id"></input>
                                    <label style={{ marginLeft: 20 }} for="w">جهة الإصدار :</label>
                                    <input type="text" id="w"></input>
                                    <label style={{ marginLeft: 20 }} for="d">تاريخ الإصدار :</label>
                                    <input type="text" id="d"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="ii">الرقم التأميني  :</label>
                                    <input type="text" id="ii"></input>
                                    <label style={{ marginLeft: 20 }} for="io">مكتب التأمينات :</label>
                                    <input type="text" id="io"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="adress">العنوان  :</label>
                                    <input type="text" id="adress"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="mob">الموبايل  :</label>
                                    <input type="text" id="mob"></input>
                                    <label style={{ marginLeft: 20 }} for="h">ت المنزل :</label>
                                    <input type="text" id="h"></input>
                                    <label style={{ marginLeft: 20 }} for="office">المكتب :</label>
                                    <input type="text" id="office"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="email">البريد الألكتروني  :</label>
                                    <input type="text" id="email"></input>
                                    <label style={{ marginLeft: 20 }} for="ms">الحالة الإجتماعية :</label>
                                    <input type="text" id="ms"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="syt">نوع النقابة  :</label>
                                    <input type="text" id="syt"></input>
                                    <label style={{ marginLeft: 20 }} for="memnum">رقم العضوية :</label>
                                    <input type="text" id="memnum"></input>
                                    <label style={{ marginLeft: 20 }} for="memdate">تاريخ العضوية :</label>
                                    <input type="text" id="memdate"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="milstate">الموقف من التجنيد  :</label>
                                    <input type="text" id="milstate"></input>
                                    <input style={{ width: 50, marginLeft: 5, marginRight: 5 }} type="text"></input>
                                    <input style={{ width: 50, marginLeft: 5, marginRight: 5 }} type="text"></input>
                                    <input style={{ width: 50, marginLeft: 5, marginRight: 5 }} type="text"></input>
                                    <label style={{ marginLeft: 20 }} for="memdate">تاريخ التقاعد :</label>
                                    <input type="text" id="memdate"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="sex">النوع  :</label>
                                    <input type="text" id="sex"></input>
                                    <label style={{ marginLeft: 20 }} for="rel">الديانة :</label>
                                    <input type="text" id="rel"></input>
                                </div>
                                <div style={{ display: "flex", marginTop: 15 }}>
                                    <label style={{ marginLeft: 20 }} for="dob">تاريخ الميلاد  :</label>
                                    <input type="text" id="dob"></input>
                                    <label style={{ marginLeft: 20 }} for="aob">جهة الميلاد :</label>
                                    <input type="text" id="aob"></input>
                                    <label style={{ marginLeft: 20 }} for="cob">محافظة الميلاد :</label>
                                    <input type="text" id="cob"></input>
                                </div>
                            </div>

                        </div>
                        <div style={{ display: "flex" }} className="col-lg-4">
                            <div style={{ background: "#f3f1f1", boxShadow: "0 10px 6px -6px #777", borderRadius: 5, height: 500, width: "100%" }} >
                                <img style={{ borderTop: 3 }} src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <div style={{ display: "flex" }}>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">المؤهل</button>
                                        <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">التدرج</button>
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
                                    <button style={{ display: "block", border: "1px solid black", marginRight: 5, marginLeft: 5 }} type="button" class="btn btn-outline btn-lg">التقييمات السنوية</button>
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
        posts: state.posts.mainCodes,
        val: state.posts.items

    };
};
export default connect(mapStateToProps, {
    getMainCodes
})(Employee);