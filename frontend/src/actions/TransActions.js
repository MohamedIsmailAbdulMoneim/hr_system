import { NEW_APPRAISAL, updatetrans, fetchEmpTrans, updateAppraisal } from "../actions/ActionTypes";
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

export const getEmpTrans = (empid, empname) => (dispatch) => {
  axios.get(`http://localhost:5000/getemptrans/?empid=${empid}&empname=${empname}`).then(res => {
    dispatch({
      type: fetchEmpTrans,
      payload: res.data
    })
  })
}


export const updateEmpTrans = (obj) => (dispatch) => {
  axios({
    method: "PUT",
    data: obj,
    url: `http://localhost:5000/updateemptrans`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: updatetrans,
      payload: data.data[1]
    })
  })
}

export const updateEmpAppraisal = (obj) => (dispatch) => {
  axios({
    method: "PUT",
    data: obj,
    url: 'http://localhost:5000/appraisalupdate',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type:updateAppraisal,
      data: data.data[1]
    })
  })
}