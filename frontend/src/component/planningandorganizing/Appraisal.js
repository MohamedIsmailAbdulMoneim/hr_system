import React, { Fragment } from "react";
import {
    getCates,
    getJobDgByCat,
    getSupBoxNamesandmanager
} from "../../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class Appraisal extends React.Component {
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
        console.log(this.state.catid, e.target.getAttribute("jdid"))
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
        console.log(this.props.supandmang);

        return (
            <div id="page-wrapper" >
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tables</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                DataTables Advanced Tables
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th>تاريخ الحركة</th>
                                                <th>كود الإدارة</th>
                                                <th>الإدارة</th>
                                                <th>كود الوظيفة</th>
                                                <th>الوظيفة</th>
                                                <th>المستوى الوظيفي</th>
                                                <th>كود المسمى الوظيفي</th>
                                                <th>نوع التخصص</th>
                                                <th>طريقة شغل الوظيفة</th>
                                                <th>حالة الوظيفة</th>
                                                <th>المسمى الغير موجود بالهيكل</th>

                                            
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
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {

        cates: state.posts.cates,
        jobdgbycat: state.posts.jobdgbycat,
        supandmang: state.posts.supandmang

    };
};
export default connect(mapStateToProps, {
    getCates, getJobDgByCat, getSupBoxNamesandmanager
})(Appraisal);