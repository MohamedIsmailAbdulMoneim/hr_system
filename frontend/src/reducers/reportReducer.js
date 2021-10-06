import { fetchCountEmpsInGoverns,fetchNatIdExpired,callFetchNatIdExpired } from "../actions/ActionTypes";
const initialState = {
    ceig: [],
    expiredIdCard: [],
    notification: 0

};

export default function (state = initialState, action) {
    switch (action.type) {

        case fetchCountEmpsInGoverns:
            return {
                ...state,
                ceig: action.payload
            }

            case fetchNatIdExpired :
                return {
                    ...state,
                    expiredIdCard: action.payload.data,
                    notification: action.payload.notification
                }

        default:
            return state

    }

}
