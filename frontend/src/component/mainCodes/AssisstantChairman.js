function AssisstantChairman() {
    return (
        <div id="page-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Forms</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Basic Form Elements
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <form role="form">
                                        <div className="form-group">
                                            <label>كود المستوى الوظيفي</label>
                                            <input className="form-control" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>كود الوصف الوظيفي</label>
                                            <input className="form-control" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>المستوى الوظيفي</label>
                                            <input className="form-control" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>الوصف الوظيفي</label>
                                            <input className="form-control" placeholder="Enter text" />
                                        </div>
                                        <div className="form-group">
                                            <label>ملاحظات</label>
                                            <textarea className="form-control" rows="3"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-6">
                                    <form role="form">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                مساعدو رئيس الشركة
                                            </div>
                                            <div className="panel-body">
                                                <div className="tab-content">
                                                    <div style={{ height: 300, overflow: "auto" }} className="tab-pane fade in active" id="home-pills">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AssisstantChairman;