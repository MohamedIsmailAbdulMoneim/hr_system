import './App.css';
import Home from './component/Home';
import Sidebar from './component/Sidebar';
import Header from './component/Header';
import Table from './component/Table';
import React from 'react'
import Form from './component/Form';
import AssisstantChairman from './component/mainCodes/AssisstantChairman';
import GeneralManager from './component/mainCodes/GeneralManager';
import { Provider } from "react-redux";
import store from "./store";
import AssisstantGeneralManager from './component/mainCodes/AssisstantGeneralManager';
import OrgStructre from './component/transactions/OrgStructre';
import EmpTrans from './component/transactions/EmpTrans'
import Employee from './component/reports/Employee';
import Empbystation from './component/reports/Empbystation';
import EmpByDeps from './component/reports/Empbydeps';
import NatIdExpired from './component/reports/NatIdExpired';
import EmpsAppraisal from './component/transactions/EmpsAppraisal';
import EmpExperience from './component/transactions/EmpExperience'
import EmpEdu from './component/transactions/EmpEduDeg';
import EmpTraining from './component/transactions/EmpTraining';
import EmpFamily from './component/transactions/EmpFamily';
import outsourceEmployee from './component/outsource/outsourceEmployee';
import outsourceEmpEduDeg from './component/outsource/outsourceEmpEduDeg';
import outsourceEmpFamily from './component/outsource/outsourceEmpFamily';
import outsourceEmpPenalty from './component/outsource/outsourceEmpPenalty';
import outsourceEmpTraining from './component/outsource/outsourceEmpTraining';
import outsourceEmpsAppraisal from './component/outsource/outsourceEmpsAppraisal';
import Login from './component/Login';
import Register from './component/register';
import EmpPenalty from './component/transactions/EmpPenalty';
import { loadUser, tokenConfig } from './actions/AuthActions';
import { getemps, getGid } from './actions/Actions'
import { countEmpsInGoverns,getNatIdExpired } from './actions/ReportActions'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import axios from "./shared/axiosInterceptor";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNamesResults: false };

  }
  componentDidMount() {
    store.dispatch(getemps())
    store.dispatch(getGid())
    store.dispatch(countEmpsInGoverns())

        var d = new Date();
        var n = d.getDate();
        if(!localStorage.getItem('day')){

            localStorage.setItem('day', n)
        }
        if(d.getDate() > localStorage.getItem('day')){
            store.dispatch(getNatIdExpired(1))
            localStorage.setItem('day', n)

        }else{
        }
        // if(!store.getState().auth.token){
        //   this.props.history.push('login');
        // }

        axios.get('http://localhost:5000/protected', store.dispatch(tokenConfig(store.getState()))).then(res =>
      {

        store.dispatch(loadUser(res.data))

      }
      ).catch(err => {

          {
            store.dispatch(loadUser(false))
            this.props.history.push('login');
          }
      });

          
  }
  render() {
    return (
      <Provider store={store} >
          <div className="App" id="wrapper">
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
              <Header />
              <Sidebar />
            </nav>

            
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/table" exact component={Table} />
            <Route path="/form" exact component={Form} />
            <Route path="/assisstantchairman" exact component={AssisstantChairman} />
            <Route path="/generalmanager" exact component={GeneralManager} />
            <Route path="/assisstantgeneralmanager" exact component={AssisstantGeneralManager} />
            <Route path="/orgstructure" exact component={OrgStructre} />
            <Route path="/emptrans" exact component={EmpTrans} />
            <Route path="/employee" exact component={Employee} />
            <Route path="/empbystation" exact component={Empbystation} />
            <Route path="/empbydeps" exact component={EmpByDeps} />
            <Route path="/natidexpire" excact component={NatIdExpired} />
            <Route path="/empsappraisal" exact component={EmpsAppraisal} />
            <Route path="/empedudeg" exact component={EmpEdu} />
            <Route path="/EmpTraining" exact component={EmpTraining} />
            <Route path="/empfamily" exact component={EmpFamily} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/empexperience" exact component={EmpExperience} />
            <Route path="/emppenalty" exact component={EmpPenalty} />
            <Route path="/outsourceEmployee" exact component={outsourceEmployee} />
            <Route path="/outsourceEmpEduDeg" exact component={outsourceEmpEduDeg} />
            <Route path="/outsourceEmpFamily" exact component={outsourceEmpFamily} />
            <Route path="/outsourceEmpPenalty" exact component={outsourceEmpPenalty} />
            <Route path="/outsourceEmpTraining" exact component={outsourceEmpTraining} />
            <Route path="/outsourceEmpsAppraisal" exact component={outsourceEmpsAppraisal} />

          </Switch>
          </div>
      </Provider>
    );
  }

}

export default withRouter(App);

