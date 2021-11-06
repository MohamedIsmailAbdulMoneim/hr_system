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
        console.log();
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
            <div className="navbar-default sidebar" role="navigation" style={{marginTop: 1050}}>
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
                            <NavLink to={`/Employee`}>
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
                        <li>
                            <a href="#"><i className="fa fa-sitemap fa-fw"></i> العمالة المؤقتة<span className="fa arrow"></span></a>
                            <ul className="nav nav-first-level">
                                <NavLink style={styles} to={`/outSourceEmployee`}>
                                    <li>
                                        <a href="/outSourceEmployee">بيانات العامل</a>
                                    </li>
                                </NavLink >
                                <NavLink style={styles} to={`/outSourceEmpEduDeg`}>
                                    <li>
                                        <a href="/outSourceEmpEduDeg">المؤهلات</a>
                                    </li>
                                </NavLink >
                                <NavLink style={styles} to={`/outSourceEmpsAppraisal`}>
                                    <li>
                                        <a href="/outSourceEmpsAppraisal">التقييمات</a>
                                    </li>
                                </NavLink >
                                <NavLink style={styles} to={`/outSourceEmpPenalty`}>
                                    <li>
                                        <a href="/outSourceEmpPenalty">جزاءات</a>
                                    </li>
                                </NavLink >
                                <NavLink style={styles} to={`/outSourceEmpFamily`}>
                                    <li>
                                        <a href="/outSourceEmpFamily">بيانات عائلية</a>
                                    </li>
                                </NavLink >
                                <NavLink style={styles} to={`/outSourceEmpTraining`}>
                                    <li>
                                        <a href="/outSourceEmpTraining">تدريب</a>
                                    </li>
                                </NavLink >
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
                                <NavLink style={styles} to={`/natidexpire`}>
                                    <li>
                                        <a onClick={this.props.getDeps} href="/natidexpire">بطاقات رقم قومي منتهية</a>
                                    </li>
                                </NavLink >
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