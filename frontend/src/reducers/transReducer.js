import {
    NEW_APPRAISAL, fetchEmpTrans, updatetrans, updateAppraisal,
    FETCHEMPEXP, NEW_EXP, fetchEmpPenalties, postNewFamilyMember,
     fetchEmpFamily, postNewTrans,postEmpEdu,fetchEmpEdu,fetchEmpTraining,deleteTraining,deleteFamily,
     deletePenalty,deleteTrans,deleteAppraisal,deleteExperience,deleteEdu
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
    empTraining: [],
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

        case deleteTrans:
            return{
                ...state,
                empTrans: action.payload.data
            }
        case deleteTraining:
            return{
                ...state,
                empTraining: action.payload.data
            }
        case deleteFamily:
            return{
                ...state,
                empfamily:action.payload.data
            }
        case deletePenalty:
            return{
                ...state,
            }
        case deleteAppraisal:
            return{
                ...state,
            }
        case deleteExperience:
            return{
                ...state,
                empexp: action.payload.data
            }
        case deleteEdu:
            return{
                ...state,
                empEdu: action.payload.data
            }

        default:
            return state

    }

}

