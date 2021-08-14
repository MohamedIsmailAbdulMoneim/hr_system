import {
    fetchCountEmpsInGoverns
} from "../actions/ActionTypes";
import axios from "axios";

export const countEmpsInGoverns = () => (dispatch) => {
    axios.get('http://localhost:5000/countempsingoverns').then(res => {
        console.log(res.data);
        dispatch({
            type: fetchCountEmpsInGoverns,
            payload: res.data
        })
    })
}

