import React, { Fragment } from "react";
import {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName
} from "../actions/Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mainName: null }
    }


    handleSidebarClick = (e) => {
        console.log();
        this.setState({ mainName: e.target.innerHTML })
        this.props.getJobDgreeCodes(e.target.innerHTML)
    }

    render() {
        this.props.getMainCodes(this.props.posts)

        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </li>
                        <li>
                            <a onClick={this.handle} className="active" href="/"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-sitemap fa-fw"></i>  أكواد الوزارة<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                    <a href="#">الإدارة العليا<span className="fa arrow"></span></a>
                                    <ul className="nav nav-third-level">
                                        <li>
                                            <a href="#">رئيس مجلس الإدارة والعضو المنتدب</a>
                                        </li>
                                        <li>
                                            <a href="/assisstantchairman">مساعد رئيس الشركة</a>
                                        </li>
                                        <Link to={`/generalmanager`}>
                                            <li>
                                                <a onClick={this.handleSidebarClick} href="/generalmanager">مدير عام</a>
                                            </li>
                                        </Link>
                                        <Link to={`/assisstantgeneralmanager`}>
                                            <li style={{ marginTop: 20 }}>
                                                <a onClick={this.handleSidebarClick} href="assisstantgeneralmanager">مدير عام مساعد</a>
                                            </li>
                                        </Link>

                                    </ul>
                                </li>
                                <li>
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
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i>  الحركات<span className="fa arrow"></span></a>
                            <ul className="nav nav-first-level">
                                <li>
                                    <a href="flot.html">البيانات الأساسية</a>
                                </li>
                                <li>
                                    <a href="morris.html">البيانات الأساسية للعمالة المؤقتة</a>
                                </li>

                                <li>
                                    <a href="/EmpTrans">تدرج</a>
                                </li>
                                <Link to={`/empedudeg`}>
                                    <li>
                                        <a onClick={this.props.getJobGovern} href="/empedudeg">مؤهلات الموظفين</a>
                                    </li>
                                </Link>
                                <Link to={`/emptraining`}>
                                    <li>
                                        <a href="/emptraining">تدريب</a>
                                    </li>
                                </Link>
                                <li>
                                    <a href="morris.html">خبرات سابقة</a>
                                </li>
                                <li>
                                    <a href="/empsappraisal">تقييمات سنوية</a>
                                </li>
                                <li>
                                    <a href="morris.html">تدريب</a>
                                </li>
                                <li>
                                    <a href="morris.html">سفر</a>
                                </li>
                                <li>
                                    <a href="morris.html">جزاءات</a>
                                </li>
                                <li>
                                    <a href="morris.html">البيانات العائلية</a>
                                </li>
                                <li>
                                    <a href="/orgstructure">الهيكل</a>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> تقارير<span className="fa arrow"></span></a>
                            <ul className="nav nav-first-level">
                                <li>
                                    <a href="/Employee">بيانات الموظفين</a>
                                </li>
                                <Link to={`/empbystation`}>

                                    <li>
                                        <a onClick={this.props.getJobGovern} href="/empbystation">الموظفون بالمحطات</a>
                                    </li>
                                </Link>

                                <Link to={`/empbydeps`}>

                                    <li>
                                        <a onClick={this.props.getDeps} href="/empbydeps">الموظفون بالإدارات</a>
                                    </li>
                                </Link>




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
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName
})(Sidebar);