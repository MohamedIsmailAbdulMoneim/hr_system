import React, { Component } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from "react-redux";
import {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd, getQn
} from "../actions/Actions";
import axios from "axios"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: null, password: null };

    }

    usernameHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        })
    }

    passwordHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
    }

    loginUserHandler = (e) => {
        e.preventDefault()
        const fd = {
            uname: this.state.username,
            pw: this.state.password,
        };
        axios({
            method: "POST",
            data: fd,
            withCredentials: true,
            url: "http://localhost:5000/login",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log(res.data);
        })
    }

    render() {
        return (

            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="login-panel panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">تسجيل مستخدم جديد</h3>
                        </div>
                        <div class="panel-body">
                            <fieldset>
                                <div class="form-group">
                                    <input onChange={this.usernameHandler} class="form-control" placeholder="username" type="text" autofocus />
                                </div>
                                <div class="form-group">
                                    <input onChange={this.passwordHandler} class="form-control" placeholder="Password" type="password" />
                                </div>

                                <a onClick={this.loginUserHandler} href="index.html" class="btn btn-lg btn-success btn-block">Register</a>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
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
        empavailsup: state.posts.empavailsup,
        upjd: state.posts.upjd,
        downJd: state.posts.downJd,
        qn: state.posts.qn
    };
};

export default connect(mapStateToProps, {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd, getQn
})(Login);