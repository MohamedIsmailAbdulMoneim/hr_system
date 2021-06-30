import {
  fetchCates,
  fetchJobDgreeCodes, fetchMainCodes, fetchJobByCat,fetchSupBoxNamesandmanager
} from "../actions/ActionTypes";

const initialState = {
  items: [],
  mainCodes: [],
  cates: [],
  jobdgbycat: [],
  supandmang: []
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

    default:
      return state;
  }
}
