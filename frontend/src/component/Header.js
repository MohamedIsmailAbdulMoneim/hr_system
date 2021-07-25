import React, { Fragment } from 'react'
import logo from './logo.png'
import dashboard from './dashboard.png'
import { Button } from '@material-ui/core';
import { logOut } from '../actions/AuthActions'
import { connect } from "react-redux";


class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { : false };

    }


    handleLogout = (e) => {
        e.preventDefault()
        this.props.logOut()
    }

    render() {
        return (
            <Fragment>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: "#042903", width: "100%", height: "70px" }}>
                        <img style={{ height: "100%", float: "left" }} src={logo} />
                        <span style={{ float: "right", color: "#9ca084", fontFamily: `'Exo 2', sans-serif`, fontWeight: "900", fontSize: "30pt", marginTop: 10, marginRight: 5 }}>Admin Panel</span>
                        <i style={{ float: "right", color: "#9ca084", height: "100%", fontSize: "40pt", marginRight: 5, marginTop: 10 }} class="fas fa-tachometer-alt"></i>



                    </div>
                </div>
                <div className="navbar-header">

                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>

                    <a className="navbar-brand" href="index.html">لوحة التحكم</a>
                    
                </div>

                

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-messages">
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span className="pull-right text-muted">
                                            <em>Yesterday</em>
                                        </span>
                                    </div>
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span className="pull-right text-muted">
                                            <em>Yesterday</em>
                                        </span>
                                    </div>
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <strong>John Smith</strong>
                                        <span className="pull-right text-muted">
                                            <em>Yesterday</em>
                                        </span>
                                    </div>
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a className="text-center" href="#">
                                    <strong>Read All Messages</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="fa fa-tasks fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-tasks">
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 1</strong>
                                            <span className="pull-right text-muted">40% Complete</span>
                                        </p>
                                        <div className="progress progress-striped active">
                                            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}>
                                                <span className="sr-only">40% Complete (success)</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 2</strong>
                                            <span className="pull-right text-muted">20% Complete</span>
                                        </p>
                                        <div className="progress progress-striped active">
                                            <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}>
                                                <span className="sr-only">20% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 3</strong>
                                            <span className="pull-right text-muted">60% Complete</span>
                                        </p>
                                        <div className="progress progress-striped active">
                                            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                                                <span className="sr-only">60% Complete (warning)</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <p>
                                            <strong>Task 4</strong>
                                            <span className="pull-right text-muted">80% Complete</span>
                                        </p>
                                        <div className="progress progress-striped active">
                                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>
                                                <span className="sr-only">80% Complete (danger)</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a className="text-center" href="#">
                                    <strong>See All Tasks</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-alerts">
                            <li>
                                <a href="#">
                                    <div>
                                        <i className="fa fa-comment fa-fw"></i> New Comment
                                        <span className="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                        <span className="pull-right text-muted small">12 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i className="fa fa-envelope fa-fw"></i> Message Sent
                                        <span className="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i className="fa fa-tasks fa-fw"></i> New Task
                                        <span className="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                        <span className="pull-right text-muted small">4 minutes ago</span>
                                    </div>
                                </a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a className="text-center" href="#">
                                    <strong>See All Alerts</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                            </li>
                            <li className="divider"></li>

                            <li><a href="/register"><i className="fa fa-sign-out fa-fw"></i> Register</a></li>
                            <li><a href="/login"><i className="fa fa-sign-out fa-fw"></i> Login</a></li>
                            <li ><a href="#"><i className="fa fa-sign-out fa-fw"></i> Logout</a>

                            </li>
                        </ul>
                    </li>

                </ul>
                <ul class="nav navbar-top-links navbar-left" style={{ marginTop: "1%" }}>
                    <li><button className="header-buttons"><a href="/login">Login</a></button></li>

                    <li ><button onClick={this.handleLogout} className="header-buttons"><a href="">Logout</a></button></li>

                    <li ><button className="header-buttons"><a href="/register">Register</a></button></li>
                </ul>
            </Fragment >
        )
    }

}
export default connect(null, {
    logOut
})(Header);