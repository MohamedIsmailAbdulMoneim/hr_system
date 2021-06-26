import {
  fetchJobDgreeCodes, fetchMainCodes
} from "../actions/ActionTypes";

const initialState = {
  items: [],
  mainCodes: []
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

    default:
      return state;
  }
}
