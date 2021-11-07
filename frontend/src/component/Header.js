import React, { Fragment } from 'react'
import logo from './logo.png'
import dashboard from './dashboard.png'
import { Button } from '@material-ui/core';
import { logOut } from '../actions/AuthActions'
import { connect } from "react-redux";
import { getNatIdExpired } from "../actions/ReportActions"


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notNum: 0, idCardExpired: false };

    }


    handleLogout = (e) => {
        e.preventDefault()
        this.props.logOut()
    }

    componentDidMount() {

        <ul className="dropdown-menu dropdown-alerts">
            <Fragment>
                <li>
                    <a href="/natidexpire">
                        <div>
                            {/* <i style={{marginTop: 5}} class="far fa-id-card"></i> */}
                            <div style={{ marginLeft: 5 }} className="pull-right">بطاقات رقم قومي منتهية</div>
                        </div>
                    </a>
                </li>
            </Fragment>


            {/* <li>
        <a href="#">
            <div>
                <i className="fa fa-comment fa-fw"></i> New Comment
                <span className="pull-right text-muted small">4 minutes ago</span>
            </div>
        </a>
    </li>
    <li className="divider"></li> */}
        </ul>
        this.props.getNatIdExpired()


    }

    render() {
        return (
            <Fragment>
                <div style={{ background: "#042903", width: "100%", height: "70px" }}>
                    <img style={{ height: "100%", float: "left" }} src={logo} />
                    <span style={{ float: "right", color: "#9ca084", fontFamily: `'Exo 2', sans-serif`, fontWeight: "900", fontSize: "30pt", marginTop: 10, marginRight: 5 }}>Admin Panel</span>
                    <i style={{ float: "right", color: "#9ca084", height: "100%", fontSize: "40pt", marginRight: 5, marginTop: 10 }} class="fas fa-tachometer-alt"></i>
                </div>
                <div style={{ color:'white', background: "#042903", width: "100%", height: "70px", fontFamily: "'Noto Kufi Arabic', sans-serif" , display:"flex"}}>
                        
                </div>
            </Fragment >

        )
    }

}

const mapStateToProps = (state) => {
    return {
        expiredIdCard: state.reports.expiredIdCard,
        notification: state.reports.notification
    };
};

export default connect(mapStateToProps, {
    logOut, getNatIdExpired
})(Header);