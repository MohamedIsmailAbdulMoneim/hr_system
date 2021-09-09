import {
    NEW_APPRAISAL, fetchEmpTrans, updatetrans, updateAppraisal,
    FETCHEMPEXP, NEW_EXP, fetchEmpPenalties, postNewFamilyMember,
     fetchEmpFamily, postNewTrans,postEmpEdu,fetchEmpEdu,fetchEmpTraining
} from "../actions/ActionTypes";
const initialState = {
    empTrans: [],
    msg: null,
    result: null,
    updatedInf: null,
    empexp: [],
    empsPenalties: [],
    empfamily: [],
    empEdu: [],
    empTraining: []
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
                msg: action.payload,
                empTrans: action.payload[1]
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

        case NEW_EXP:
            return {
                ...state,
                result: action.payload.data,
                msg: action.payload.msg
            }
        case fetchEmpPenalties:
            return {
                ...state,
                empsPenalties: action.payload
            }

        case fetchEmpFamily:
            return {
                ...state,
                empfamily: action.payload
            }

        case postNewFamilyMember:
            return {
                ...state,
                empfamily: action.payload.data[1],
                msg: action.payload.msg
            }
        case fetchEmpEdu:
                return {
                  ...state,
                  empEdu: action.payload
                }
        case postNewTrans:
            return {
                ...state,
                empTrans: action.payload.data[2],
                msg: action.payload.msg
            }

        case postEmpEdu:
            return{
                ...state,
                empEdu : action.payload.data[1],
                msg: action.payload.msg
            }

        case fetchEmpTraining :
            return{
                ...state,
                empTraining: action.payload
            }


        default:
            return state

    }

}

