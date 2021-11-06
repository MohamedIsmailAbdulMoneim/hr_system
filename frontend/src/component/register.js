import React, { Component } from "react";
import { connect } from "react-redux";
import {
    register,
} from "../actions/AuthActions";
import { clearErrors } from "../actions/ErrorActions"
import PropTypes from 'prop-types';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { username: null, password: null, msg: null };

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErorrs: PropTypes.func.isRequired
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

    newUserHandler = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        const newUser = {
            uname: username,
            pw: password
        }
        this.props.register(newUser)

    }

    componentDidUpdate(prevProps) {
        const { error } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                console.log('hit');

                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    render() {
        console.log(this.state.msg);
        return (

            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="login-panel panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">تسجيل مستخدم جديد</h3>

                        </div>
                        <div class="panel-body">
                            <fieldset>
                                {this.state.msg ? <div className="alert alert-danger" role="alert">{this.state.msg}</div> : null}

                                <div class="form-group">
                                    <input onChange={this.usernameHandler} class="form-control" placeholder="username" type="text" autofocus required />
                                </div>
                                <div class="form-group">
                                    <input onChange={this.passwordHandler} class="form-control" placeholder="Password" type="password" required />
                                </div>

                                <a onClick={this.newUserHandler} href="index.html" class="btn btn-lg btn-success btn-block">Register</a>

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
        error: state.error
    };
};

export default connect(mapStateToProps, {
    register, clearErrors
})(Register);