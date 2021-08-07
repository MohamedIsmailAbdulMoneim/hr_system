import { NEW_APPRAISAL, fetchEmpTrans, updatetrans, updateAppraisal,FETCHEMPEXP } from "../actions/ActionTypes";
const initialState = {
    empTrans: [],
    msg: null,
    result: null,
    updatedInf: null,
    empexp: []

};

export default function (state = initialState, action) {
    switch (action.type) {

        case fetchEmpTrans:
            return {
                ...state,
                empTrans: action.payload
            }

        case updatetrans:
            return {
                ...state,
                msg: action.payload
            }

        case updateAppraisal:
            return {
                ...state,
                updatedInf: action.payload.data,
                result: action.payload.result

            }

        case NEW_APPRAISAL:
            return {
                ...state,
                result: action.payload.data,
                msg: action.payload.msg
            }

      case FETCHEMPEXP:
          return { 
              ...state,
              empexp: action.payload

          }


        default:
            return state

    }

}

