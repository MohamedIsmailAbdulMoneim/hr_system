import { NEW_APPRAISAL } from "../actions/ActionTypes";
import axios from "axios";

export const newAppraisal = (obj) => (dispatch) => {

    axios({
        method: "POST",
        data: obj,
        withCredentials: true,
        url: "http://localhost:5000/empappraisal",
        headers: { "Content-Type": "application/json" },
    }).then((res) => {

        dispatch({
            type: NEW_APPRAISAL,
            payload: {
                data: res.data.data,
                msg: res.data.msg
            }
        })
    })



}