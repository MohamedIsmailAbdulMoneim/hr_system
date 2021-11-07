import React from "react";
import {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName, getCates, getStations
} from "../actions/Actions";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mainName: null, sidebar: false }
    }
    componentDidMount() {
        this.props.getCates()
        this.props.getStations()
    }

    handleSidebarClick = (e) => {
        this.setState({ mainName: e.target.innerHTML })
        this.props.getJobDgreeCodes(e.target.innerHTML)
    }

    showSidebar = (e) => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render() {
        // this.props.getMainCodes(this.props.posts)
        console.log(this.state.sidebar);
        const styles = {
            margin: 10,
            width: "100%",
        }

        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul onClick={this.showSidebar}>
                        <Link to="/#" className="menu-bars">
                            <FaIcons.FaBars onClick={this.showSidebar} />
                        </Link>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i>  الحركات<span className="fa arrow"></span></a>
                            <ul className="nav nav-first-level">
                                {/* <li>
                                    <a href="morris.html">البيانات الأساسية للعمالة المؤقتة</a>
                                </li> */}
                                <NavLink style={styles} to={`/EmpTrans`}>
                                    <li>
                                        <a href="/EmpTrans">تدرج</a>
                                    </li>
                                </NavLink>
                                <NavLink style={styles} to={`/empedudeg`}>
                                    <li>
                                        <a onClick={this.props.getJobGovern} href="/empedudeg">مؤهلات الموظفين</a>
                                    </li>
                                </NavLink >
                                {/* <Link to={`/emptraining`}>
                                    <li>
                                        <a href="/emptraining">تدريب</a>
                                    </li>
                                </Link> */}
                                <NavLink style={styles} to={`/empexperience`}>
                                    <li>
                                        <a href="/empexperience">خبرات سابقة</a>
                                    </li>
                                </NavLink>
                                <NavLink style={styles} to={`/empsappraisal`}>
                                    <li>
                                        <a href="/empsappraisal">تقييمات سنوية</a>
                                    </li>
                                </NavLink>
                                {/* <li>
                                    <a href="morris.html">سفر</a>
                                </li> */}
                                <NavLink style={styles} to={`/emppenalty`}>
                                    <li>
                                        <a href="/emppenalty">جزاءات</a>
                                    </li>
                                </NavLink>
                                <NavLink style={styles} to={`/empfamily`}>
                                    <li >
                                        <a href="/empfamily">البيانات العائلية</a>
                                    </li>
                                </NavLink>
                                <NavLink style={styles} to={`/EmpTraining`}>
                                    <li>
                                        <a href="/EmpTraining">تدريب العاملين</a>
                                    </li>
                                </NavLink>
                                <NavLink style={styles} to={`/orgstructure`}>
                                    <li>
                                        <a href="/orgstructure">الهيكل</a>
                                    </li>
                                </NavLink>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        )

    }

}


const mapStateToProps = (state) => {
    return {
        posts: state.posts.items

    };
};
export default connect(mapStateToProps, {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName, getCates, getStations
})(Sidebar);