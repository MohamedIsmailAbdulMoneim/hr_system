import React, { Component, Fragment } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from "react-redux";
import {
    getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd, getQn
} from "../../actions/Actions";
import { updateEmpTrans, getEmpTrans } from "../../actions/TransActions";


class Chart extends Component {



    render() {
        return (
            <Fragment>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "30%" }}>
                        <Bar
                            data={{
                                labels: ['دراسات عليا', 'مؤهل عال', 'مؤهل فوق المتوسط', 'مؤهل متوسط', 'إعدادية', 'ابتدائية', 'محو أمية', 'بدونة مؤهل'],
                                datasets: [
                                    {
                                        label: 'مؤهلات',
                                        data: [
                                            this.props.qn.length ? this.props.qn[0][0].postgraduate : null, this.props.qn.length ? this.props.qn[1][0].academicqualifications : null, this.props.qn.length ? this.props.qn[2][0].aboveaverage : null, this.props.qn.length ? this.props.qn[3][0].averagequalification : null, this.props.qn.length ? this.props.qn[4][0].preparatory : null, this.props.qn.length ? this.props.qn[5][0].primarydg : null, this.props.qn.length ? this.props.qn[6][0].literacy : null, this.props.qn.length ? this.props.qn[7][0].without : null
                                        ],
                                        backgroundColor: [
                                            '#d1830e',
                                            'rgb(76, 104, 72)',
                                            '#0e92d1',
                                            'rgb(72, 106, 114)',
                                            '#7d0ed1',
                                            '#d10e8c',
                                            '#d10e0e',
                                            '#b3d10e',
                                        ]
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: false, legend: {
                                    display: false
                                }, tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                }
                            }}

                            width={200}
                            height={300}
                        />
                    </div>
                    <div style={{ width: "30%" }}>
                        <Pie data={{
                            labels: ['إناث', 'ذكور'],
                            datasets: [
                                {
                                    label: 'asdasdasd',
                                    data: [
                                        this.props.emps[1] ? this.props.emps[1].length ? this.props.emps[1][0].FEMALE : null : null,
                                        this.props.emps[0] ? this.props.emps[0].length ? this.props.emps[0][0].MALE : null : null
                                    ],
                                    backgroundColor: [
                                        'rgb(202, 184, 198)',
                                        'rgb(76, 104, 72)',

                                    ]
                                }
                            ]
                        }}
                            options={{
                                maintainAspectRatio: false, legend: {
                                    display: false
                                }, tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                }
                            }}

                            width={200}
                            height={200}
                        />
                    </div>
                    <div style={{ width: "30%", display:"flex" }}>
                        <div>
                        <i class="fas fa-male" style={{fontSize: "150pt", color: "blue"}}></i>
                        </div>
                        <div>
                        <i class="fas fa-female" style={{fontSize: "150pt", color: "pink"}}></i>
                        </div>
                    </div>
                </div>


            </Fragment>

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
        qn: state.posts.qn,
        emps: state.posts.emps,
        gid: state.posts.gid
    };
};

export default connect(mapStateToProps, {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd, getQn
})(Chart);