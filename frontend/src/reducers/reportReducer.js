import {
    fetchCates,
    fetchJobDgreeCodes, fetchMainCodes, fetchJobByCat, fetchSupBoxNamesandmanager, fetchJobGovern, fetchJobStation, fetchEmpStationAndGovern, fetchDeps, fetchEmpByDeps, fetchEmpName, fetchEmpAppraisal, fetchEmpTrans, fetchEmpEdu, fetchEmpNameByName, fetchCurrentjd, fetchavailjd, fetchavailsupbox, fetchupjd, fetchEmpDetails, fetchDownJd, fetchEmpFamily, fetchqn, fetchspecarabic, fetchuneschool

} from "../actions/ActionTypes";

const initialState = {
    items: [],
    mainCodes: [],
    cates: [],
    jobdgbycat: [],
    supandmang: [],
    jobgovern: [],
    jobstation: [],
    empstationandgovern: [],
    deps: [],
    empdep: [],
    empApp: [],
    empTrans: [],
    empEdu: [],
    empfamily: [],
    empavailjd: [],
    empavailsup: [],
    empcurrentjd: [],
    upjd: [],
    empdetails: [],
    downJd: [],
    empNameByName: [],
    qn: [],
    specarabic: [],
    uneshcool: []
};