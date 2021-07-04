import React, { Fragment } from "react";
import {
    getCates,
    getJobDgByCat,

} from "../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobbycat: null || this.props.jobdgbycat, catid: null };

    }

    componentDidMount(){
        this.props.getCates()
    }

    render(){
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">سيستم إدارة الموارد البشرية</h1>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-4">
                                        <i className="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div className="col-xs-8 text-right">
                                        <div className="huge">26</div>
                                        <div>New Comments!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-green">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-4">
                                        <i className="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div className="col-xs-8 text-right">
                                        <div className="huge">12</div>
                                        <div>New Tasks!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-4">
                                        <i className="fa fa-shopping-cart fa-5x"></i>
                                    </div>
                                    <div className="col-xs-8 text-right">
                                        <div className="huge">124</div>
                                        <div>New Orders!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-red">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-4">
                                        <i className="fa fa-support fa-5x"></i>
                                    </div>
                                    <div className="col-xs-8 text-right">
                                        <div className="huge">13</div>
                                        <div>Support Tickets!</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">View Details</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div> */}
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
    getCates, getJobDgByCat
})(Home);