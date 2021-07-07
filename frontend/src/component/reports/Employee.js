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
                                <div>
                                    <div style={{display: "flex"}}>
                                        <div class="input-group">
                                            <span>رقم الأداء</span>
                                            <input />
                                        </div>
                                        <div class="input-group">
                                            <span>الإسم</span>
                                            <input />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <span>تاريخ العقد</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الوظيفة الحالية</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>تاريخ شغلها</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الإدارة</span>
                                        <input style={{ width: 200 }} />
                                    </div>

                                    <div class="input-group">
                                        <span>النطاق الإشرافي</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>المحطة</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الحالة الوظيفية</span>
                                        <input />
                                    </div>
                                    <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                    <div class="input-group">
                                        <span>الرقم القومي</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الرقم التأميني</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الرقم التأميني</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الموبايل</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>البريد الألكتروني</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>نوع النقابة</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>الموقف من التجنيد</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>النوع</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>تاريخ الميلاد</span>
                                        <input />
                                    </div>


                                    <div class="input-group">
                                        <span>تاريخ التعيين</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>طريقة شغلها</span>
                                        <input />
                                    </div>
                                    <div class="input-group">
                                        <span>المستوى الوظيفي</span>
                                        <input />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div style={{ display: "flex" }} className="col-lg-4">
                            <div style={{ background: "#f3f1f1", boxShadow: "0 10px 6px -6px #777", borderRadius: 5, height: 500, width: "100%" }} >
                                <img style={{ borderTop: 3 }} src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                            </div>
                        </div>
                    </div>


                </div>



            </div>
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