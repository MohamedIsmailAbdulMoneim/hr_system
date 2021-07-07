import {
  fetchCates,
  fetchJobDgreeCodes, fetchMainCodes, fetchJobByCat, fetchSupBoxNamesandmanager, fetchJobGovern, fetchJobStation, fetchEmpStationAndGovern, fetchDeps, fetchEmpByDeps, fetchEmpName, fetchEmpAppraisal, fetchEmpTrans, fetchEmpEdu,fetchEmpNameByName,fetchCurrentjd,fetchavailjd, fetchavailsupbox, fetchupjd

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
  empavailjd: [],
  empavailsup: [],
  empcurrentjd: [],
  upjd: []
  
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
    case fetchEmpTrans:
      return {
        ...state,
        empTrans: action.payload
      }
    case fetchEmpEdu:
      return {
        ...state,
        empEdu: action.payload
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

    default:
      return state;
  }
}
