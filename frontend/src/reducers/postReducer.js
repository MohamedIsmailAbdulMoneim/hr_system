import {
  fetchCates,
  fetchJobDgreeCodes, fetchMainCodes, fetchJobByCat, fetchSupBoxNamesandmanager,
  fetchJobGovern, fetchJobStation, fetchEmpStationAndGovern, fetchDeps, fetchEmpByDeps,
  fetchEmpName, fetchEmpAppraisal, fetchEmpNameByName, fetchCurrentjd, fetchavailjd,
  fetchavailsupbox, fetchupjd, fetchEmpDetails, fetchDownJd, fetchqn, fetchemps, fetchgid,
  fetchStations
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
  empavailjd: [],
  empavailsup: [],
  empcurrentjd: [],
  upjd: [],
  empdetails: [],
  downJd: [],
  empNameByName: [],
  qn: [],
  emps: [],
  gid: [],
  empname:[],
  stations: []


};

export default function (state = initialState, action) {
  switch (action.type) {
    case fetchJobDgreeCodes:
      return {
        ...state,
        items: action.payload.data,
      };

    case fetchMainCodes:
      return {
        ...state,
        mainCodes: action.payload.data
      }

    case fetchCates:
      return {
        ...state,
        cates: action.payload.data
      }
    case fetchJobByCat:
      return {
        ...state,
        jobdgbycat: action.payload.data
      }

    case fetchSupBoxNamesandmanager:
      return {
        ...state,
        supandmang: action.payload
      }
    case fetchJobGovern:
      return {
        ...state,
        jobgovern: action.payload.data
      }
    case fetchJobStation:
      return {
        ...state,
        jobstation: action.payload.data
      }

    case fetchEmpStationAndGovern:
      return {
        ...state,
        empstationandgovern: action.payload.data
      }

    case fetchDeps:
      return {
        ...state,
        deps: action.payload
      }

    case fetchEmpByDeps:
      return {
        ...state,
        empdep: action.payload
      }

    case fetchEmpName:
      return {
        ...state,
        empname: action.payload
      }

    case fetchEmpAppraisal:
      return {
        ...state,
        empApp: action.payload
      }

    case fetchCurrentjd:
      return {
        ...state,
        empcurrentjd: action.payload
      }
    case fetchEmpNameByName:
      return {
        ...state,
        empNameByName: action.payload
      }

    case fetchavailjd:
      return {
        ...state,
        empavailjd: action.payload
      }

    case fetchavailsupbox:
      return {
        ...state,
        empavailsup: action.payload
      }

    case fetchupjd:
      return {
        ...state,
        upjd: action.payload
      }
    case fetchEmpDetails:
      return {
        ...state,
        empdetails: action.payload.data
      }

    case fetchDownJd:
      return {
        ...state,
        downJd: action.payload.data
      }

    case fetchqn:
      return {
        ...state,
        qn: action.payload
      }

    case fetchemps:
      return {
        ...state,
        emps: action.payload
      }
    case fetchgid:
      return {
        ...state,
        gid: action.payload
      }
    case fetchStations:
      return {
        ...state,
        stations: action.payload

      }


    default:
      return state;
  }
}
