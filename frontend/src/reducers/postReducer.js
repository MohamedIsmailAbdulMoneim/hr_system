import {
  fetchCates,
  fetchJobDgreeCodes, fetchMainCodes, fetchJobByCat, fetchSupBoxNamesandmanager, fetchJobGovern, fetchJobStation, fetchEmpStationAndGovern, fetchDeps, fetchEmpByDeps, fetchEmpName

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
  empdep: []
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



    default:
      return state;
  }
}
