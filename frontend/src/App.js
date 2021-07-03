import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Sidebar from './component/Sidebar';
import Header from './component/Header';
import Table from './component/Table';
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
import EmpByDeps from './component/reports/Empbydeps'
import EmpsAppraisal from './component/transactions/EmpsAppraisal';
import EmpEdu from './component/transactions/EmpEduDeg';
import EmpTraining from './component/transactions/EmpTraining';



import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" id="wrapper">
          <nav nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
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
            <Route path="/empsappraisal" exact component={EmpsAppraisal} />
            <Route path="/empedudeg" exact component={EmpEdu} />
            <Route path="/EmpTraining" exact component={EmpTraining} />




          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
