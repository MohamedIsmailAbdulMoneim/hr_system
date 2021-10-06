import {
    fetchCountEmpsInGoverns, fetchNatIdExpired
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

export const getNatIdExpired = (addToNoti) => (dispatch) => {
    axios.get('http://localhost:5000/getnatidexpired').then(res => {
        dispatch({
            type: fetchNatIdExpired,
            payload: {data: res.data, notification: addToNoti} 
        })
    })
}

