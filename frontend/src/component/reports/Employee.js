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
                            <div style={{ background: "#f3f1f1", boxShadow: "0 10px 6px -6px #777", borderRadius: 5, height: 500, width: "100%" }} >
                                <h2 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الأساسية</h2>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: 20 }}>
                                        <div class="input-group">
                                            <span>رقم الأداء :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 35, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>تاريخ العقد :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 31, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>تاريخ بداية الخبرة :  </span><input style={{ background: "white", marginBottom: 5, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>الوظيفة الحالية :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 15, width: 299, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>المستوى الوظيفي :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 2, width: 300, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                        <div class="input-group">
                                            <span>المسمى الوظيفي :  </span><input style={{ background: "white", marginBottom: 5, marginRight: 7, width: 300, border: "1px solid black" }} type="text" name="first_name" />
                                        </div>
                                    </div>
                                    <div>

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