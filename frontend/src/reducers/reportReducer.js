import { fetchCountEmpsInGoverns } from "../actions/ActionTypes";
const initialState = {
    ceig: []

};

export default function (state = initialState, action) {
    switch (action.type) {

        case fetchCountEmpsInGoverns:
            return {
                ...state,
                ceig: action.payload
            }

        default:
            return state

    }

}
