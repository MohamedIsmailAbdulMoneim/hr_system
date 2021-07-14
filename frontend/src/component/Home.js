import React, { Fragment } from "react";
import {
    getCates,
    getJobDgByCat,
    getQn

} from "../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Chart from "./reports/chart"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobbycat: null || this.props.jobdgbycat, catid: null };

    }

    componentDidMount(){
        this.props.getCates()
        this.props.getQn()
    }

    render(){
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">سيستم إدارة الموارد البشرية</h1>
                    </div>
                </div>
                <div className="chart">
                <Chart />
                </div>

            </div>
        )
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
    getCates, getJobDgByCat,getQn
})(Home);