import { NEW_APPRAISAL, fetchEmpTrans ,updatetrans,updateAppraisal} from "../actions/ActionTypes";
const initialState = {
    empTrans: [],
    msg: null,
    result: null
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
            empTrans: action.payload
        }

        case updateAppraisal:
            return{
                ...state,
            }

        case NEW_APPRAISAL:
            return {
                ...state,
                result: action.payload.data,
                msg: action.payload.msg
            }

        default:
            return state

    }

}

