import React, { Fragment } from "react";
import {
    getCates,
    getJobDgByCat,
    getSupBoxNamesandmanager
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class OrgStructre extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobbycat: null || this.props.jobdgbycat, catid: null };

    }

    componentDidMount() {
        this.props.getCates()
    }

    clickHandler = (e) => {
        this.props.getJobDgByCat(e.target.getAttribute("catid"))
        this.setState({ catid: e.target.getAttribute("catid") })
        this.setState({ clicked: true })
    }

    clickHandler_2 = (e => {
        console.log(e.target.getAttribute("jdid"), this.state.catid);
        this.props.getSupBoxNamesandmanager(e.target.getAttribute("jdid"), this.state.catid)
    })

    render() {

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
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Forms</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                أكواد مديري العموم
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label style={{ display: "block" }} for="pet-select">الإدارة</label>
                                        <select style={styles} multiple name="pets" id="pet-select">
                                            {this.props.cates.map((cat => (
                                                <option onClick={this.clickHandler} catname={cat.CAT_NAME} catid={cat.CAT_ID} >{cat.CAT_NAME}</option>
                                            )))}
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label style={{ display: "block" }} for="pet-select">الوظائف</label>
                                        <select style={styles} multiple name="pets" id="pet-select">
                                            {this.state.clicked === false ? null : this.props.jobdgbycat.map((job) => (
                                                <option jdid={job.J_D_ID}>{job.J_D_NAME}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                Striped Rows
                                            </div>
                                            <div className="panel-body">
                                                <div style={{ overflow: "scroll", height: 320 }} className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead style={{ textAlign: "center" }}>
                                                            <tr>
                                                                <th>رقم البوكس</th>
                                                                <th>المسمى الوظيفي</th>
                                                                <th>اسم شاغل البوكس</th>
                                                                <th>عدد شاغلي البوكس</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                Striped Rows
                                            </div>
                                            <div className="panel-body">
                                                <div style={{ overflow: "scroll", height: 320 }} className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead style={{ textAlign: "center" }}>
                                                            <tr>
                                                                <th>كود المستوى الإشرافي الأعلى</th>
                                                                <th>المستوى الإشرافي الأعلى</th>
                                                                <th>مفعل / عير مفعل</th>
                                                                <th>مشغول / شاغر</th>
                                                                <th>نوع الوظيفة</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
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
        jobdgbycat: state.posts.jobdgbycat

    };
};
export default connect(mapStateToProps, {
    getCates, getJobDgByCat, getSupBoxNamesandmanager
})(OrgStructre);