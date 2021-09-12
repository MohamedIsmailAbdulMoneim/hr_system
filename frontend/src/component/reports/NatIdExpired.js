import React, { Fragment } from "react";
import {
    getEmpByDeps
} from "../../actions/Actions";
import {
    getNatIdExpired
} from "../../actions/ReportActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class NatIdExpired extends React.Component {
    constructor(props) {
        super(props);
        this.state = { govern: null, station: null }

    }

    componentDidMount() {
        this.props.getNatIdExpired()
    }


    handel = (e) => {
        this.props.getEmpByDeps(e.target.getAttribute('depart'))
    }


    render() {

        console.log(this.props.empdep);
        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "100%",
            height: 250,
            backgroundColor: "#fff",
            color: "#212529",
            fontSize: "2rem",
            lineHeight: 1.5,
            fontWeight: "bold",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            appearance: "none",
            transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"

        }

        return (
            <div id="page-wrapper" >
                <div class="row">

                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                بيان ببطاقات الرقم القومي المنتهية
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>رقم الأداء</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>رقم البطاقة</th>
                                            </tr>
                                        </thead>

                                        {this.props.expiredIdCard.map(card => (
                                            <tbody>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{card.EMPLOYEE_ID}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{card.NAME_ARABIC}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{card.NATIONAL_ID_CARD_EXPIRE_DATE}</td>
                                            </tbody>
                                        ))}

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {

        deps: state.posts.deps,
        empdep: state.posts.empdep,
        expiredIdCard: state.reports.expiredIdCard


    };
};
export default connect(mapStateToProps, {
    getEmpByDeps,getNatIdExpired
})(NatIdExpired);