import React, { Fragment } from "react";
import {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName, getCates
} from "../actions/Actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mainName: null }
    }
    componentDidMount() {
        this.props.getCates()
    }

    handleSidebarClick = (e) => {
        console.log();
        this.setState({ mainName: e.target.innerHTML })
        this.props.getJobDgreeCodes(e.target.innerHTML)
    }

    render() {
        this.props.getMainCodes(this.props.posts)

        const styles = {
            margin: 10,
            width: "100%",
        }

        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <a onClick={this.handle} className="active" href="/"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <NavLink style={styles} to={`/Employee`}>
                                <li>
                                    <a href="/Employee">الشاشة الرئيسية</a>
                                </li>
                            </NavLink>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-sitemap fa-fw"></i>  أكواد الوزارة<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="#">الإدارة العليا<span className="fa arrow"></span></a>
                                    <ul className="nav nav-third-level">
                                        {/* <li>
                                            <a href="#">رئيس مجلس الإدارة والعضو المنتدب</a>
                                        </li>
                                        <li>
                                            <a href="/assisstantchairman">مساعد رئيس الشركة</a>
                                        </li> */}
                                        <NavLink style={styles} to={`/generalmanager`}>
                                            <li>
                                                <a onClick={this.handleSidebarClick} href="/generalmanager">مدير عام</a>
                                            </li>
                                        </NavLink >
                                        <NavLink style={styles} to={`/assisstantgeneralmanager`}>
                                            <li>
                                                <a onClick={this.handleSidebarClick} href="assisstantgeneralmanager">مدير عام مساعد</a>
                                            </li>
                                        </NavLink >
                                    </ul>
                                </li>
                                {/* <li>
                                    <a href="#">المستوى الأول<span className="fa arrow"></span></a>
                                    <ul className="nav nav-third-level">
                                        <li>
                                            <a href="#">مدير إدارة</a>
                                        </li>
                                        <li>
                                            <a href="#">رئيس قسم</a>
                                        </li>
                                        <li>
                                            <a href="#">أخصائي</a>
                                        </li>
                                        <li>
                                            <a href="#"> أخصائي أول</a>
                                        </li>
                                        <li>
                                            <a href="#"> أخصائي ممتاز</a>
                                        </li>
                                        <li>
                                            <a href="#">محاسب</a>
                                        </li>
                                        <li>
                                            <a href="#"> محاسب ممتاز</a>
                                        </li>
                                        <li>
                                            <a href="#">محام</a>
                                        </li>
                                        <li>
                                            <a href="#">محام ممتاز</a>
                                        </li>
                                        <li>
                                            <a href="#">مهندس</a>
                                        </li>
                                        <li>
                                            <a href="#">مهندس ممتاز</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">المستوى الثاني<span className="fa arrow"></span></a>
                                    <ul className="nav nav-third-level">
                                        <li>
                                            <a href="#"></a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">المستوى الثالث<span className="fa arrow"></span></a>
                                    <ul className="nav nav-third-level">
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
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
                                <NavLink style={styles} to={`/orgstructure`}>
                                    <li>
                                        <a href="/orgstructure">الهيكل</a>
                                    </li>
                                </NavLink>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> تقارير<span className="fa arrow"></span></a>
                            <ul className="nav nav-first-level">
                                <NavLink style={styles} to={`/empbystation`}>
                                    <li>
                                        <a onClick={this.props.getJobGovern} href="/empbystation">الموظفون بالمحطات</a>
                                    </li>
                                </NavLink >
                                <NavLink style={styles} to={`/empbydeps`}>
                                    <li>
                                        <a onClick={this.props.getDeps} href="/empbydeps">الموظفون بالإدارات</a>
                                    </li>
                                </NavLink >
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-files-o fa-fw"></i> Sample Pages<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="blank.html">Blank Page</a>
                                </li>
                                <li>
                                    <a href="login.html">Login Page</a>
                                </li>
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
        posts: state.posts.items,

    };
};
export default connect(mapStateToProps, {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName, getCates
})(Sidebar);