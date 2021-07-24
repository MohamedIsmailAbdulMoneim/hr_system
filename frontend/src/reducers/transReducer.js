import { NEW_APPRAISAL } from "../actions/ActionTypes";
const initialState = {
    msg: null,
    result: null
};

export default function (state = initialState, action) {
    switch (action.type) {

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

