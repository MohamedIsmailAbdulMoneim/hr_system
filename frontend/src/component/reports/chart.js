import React, { Component } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from "react-redux";
import {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd,getQn
} from "../../actions/Actions";


class Chart extends Component {



    render() {
        console.log(this.props.qn);
        return (
                <div style={{width :"30%"}}>
                <Pie
                    data={{
                        labels: ['دراسات عليا', 'مؤهل عال', 'مؤهل فوق المتوسط', 'مؤهل متوسط', 'إعدادية', 'ابتدائية', 'محو أمية', 'بدونة مؤهل'],
                        datasets:[
                            {
                                label: 'asdasdasd',
                                data: [
                                    this.props.qn.length ? this.props.qn[0][0].postgraduate:null , this.props.qn.length ? this.props.qn[1][0].academicqualifications : null,this.props.qn.length ? this.props.qn[2][0].aboveaverage : null,this.props.qn.length ? this.props.qn[3][0].averagequalification : null,this.props.qn.length ? this.props.qn[4][0].preparatory : null,this.props.qn.length ? this.props.qn[5][0].primarydg : null,this.props.qn.length ? this.props.qn[6][0].literacy: null,this.props.qn.length ? this.props.qn[7][0].without : null
                                ],
                                backgroundColor: [
                                    '#d1830e',
                                    '#0ed15c',
                                    '#0e92d1',
                                    '#1a0ed1',
                                    '#7d0ed1',
                                    '#d10e8c',
                                    '#d10e0e',
                                    '#b3d10e',
                                ]
                            }
                        ]
                    }}
                    options={{maintainAspectRatio: false ,legend: {
                        display: false
                    },tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }}}}

                    width = {400}
                    height={400}
                /> 
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
        qn : state.posts.qn
    };
};

export default connect(mapStateToProps, {
    getEmpTrans, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd,getQn
})(Chart);