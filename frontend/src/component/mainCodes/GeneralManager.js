import React from "react";
import {
    getMainCodes, getJobDgreeCodes
} from "../../actions/Actions";
import { connect } from "react-redux";

class GeneralManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = { new: false, edit: false, delete: false, jDId: null, mainBoxName: null, supBoxId: null, supBoxName: null, val: this.props.val };

    }

    componentDidMount() {
        this.props.getJobDgreeCodes("مدير عام")
    }

    editFalseHandeler = (e) => {
        this.setState({edit:false})
    }

    clickHandler = (e) => {
        console.log(e.target.getAttribute('name'));
    }

    deleteHandler = (e) => {
        console.log(e.target.getAttribute('name'));
        // const nameVal = e.target.getAttribute("name") // getting the J_D_ID from name attr

    }

    editHandler = (e) => {
        this.setState({ jDId: e.target.getAttribute("jDID") }) // getting the element details come from database
        this.setState({ mainBoxName: e.target.getAttribute("mainBoxName") })
        this.setState({ supBoxId: e.target.getAttribute("supBoxId") })
        this.setState({ supBoxName: e.target.getAttribute("supBoxName") })
        this.setState({ edit: true })

    }

    editFalseHandeler = (e) => {
        this.setState({edit:false})
    }

    render() {

        console.log(this.props.posts);
        return (
            <div id="page-wrapper" className="generalmanager">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Forms</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ height: "100%", width: 1000 }} className="panel panel-default">
                                <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} className="panel-heading">
                                    إضافة مسمى وظيفي جديد
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label>كود المستوى الوظيفي</label>
                                        <input className="form-control" placeholder="Enter text" disabled={(this.state.new ? false : true)} />
                                    </div>
                                    <div className="form-group">
                                        <label>كود الوصف الوظيفي</label>
                                        <input className="form-control" placeholder="Enter text" disabled={(this.state.new ? false : true)} />
                                    </div>
                                    <div className="form-group">
                                        <label>المستوى الوظيفي</label>
                                        <input className="form-control" placeholder="Enter text" disabled={(this.state.new ? false : true)} />
                                    </div>
                                    <div className="form-group">
                                        <label>الوصف الوظيفي</label>
                                        <input className="form-control" placeholder="Enter text" disabled={(this.state.new ? false : true)} />
                                    </div>
                                    <div className="form-group">
                                        <label>ملاحظات</label>
                                        <textarea className="form-control" rows="3" disabled></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    أكواد مديري العموم
                                </div>
                                <div className="panel-body">

                                    <div className="col-lg-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                أكواد مستوى مدير عام
                                                {this.state.edit ? <i onClick={this.editFalseHandeler} style={{fontSize: 15 ,position: "relative", left:530}} className="fas fa-times-circle"></i> : null } 

                                            </div>
                                            <div className="panel-body">
                                                {!this.state.edit ?
                                                    <div style={{ overflow: "scroll", height: 320 }} className="table-responsive">
                                                        <table className="table table-striped">
                                                            <thead style={{ textAlign: "center" }}>
                                                                <tr>
                                                                    <th>كود المستوى الوظيفي</th>
                                                                    <th>كود الوصف الوظيفي</th>
                                                                    <th>المستوى الوظيفي</th>
                                                                    <th>الوصف الوظيفي</th>
                                                                    <th>تعديل</th>
                                                                    <th>حذف</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.props.posts.map((gm) => (
                                                                    <tr>
                                                                        <td>{gm.J_D_ID}</td>
                                                                        <td>{gm.SUP_BOX_ID}</td>
                                                                        <td>{gm.J_D_NAME}</td>
                                                                        <td>{gm.SUP_BOX_NAME}</td>
                                                                        <td><i jDId={gm.J_D_ID} mainBoxName={gm.J_D_NAME} supBoxId={gm.SUP_BOX_ID} supBoxName={gm.SUP_BOX_NAME} onClick={this.editHandler} className="fas fa-edit"></i></td>
                                                                        <td><i className="fas fa-backspace"></i></td>
                                                                    </tr>
                                                                ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div> : <div style={{ height: 200 }} className="table-responsive">
                                                        <table className="table table-striped">
                                                            <thead style={{ textAlign: "center" }}>
                                                                <tr>
                                                                    <th>كود المستوى الوظيفي</th>
                                                                    <th>كود الوصف الوظيفي</th>
                                                                    <th>المستوى الوظيفي</th>
                                                                    <th>الوصف الوظيفي</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><input style={{ width: 50 }} type="text" placeholder={this.state.jDId} /></td>
                                                                    <td><input style={{ width: 50 }} type="text" placeholder={this.state.supBoxId} /></td>
                                                                    <td><input type="text" placeholder={this.state.mainBoxName} /></td>
                                                                    <td><input type="text" placeholder={this.state.supBoxName} /></td>
                                                                    <td><button type="button" className="btn btn-primary">تعديل</button></td>
                                                                </tr>
                                                            </tbody>

                                                        </table>
                                                        

                                                    </div>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        posts: state.posts.mainCodes,
        val: state.posts.items

    };
};
export default connect(mapStateToProps, {
    getMainCodes, getJobDgreeCodes
})(GeneralManager);