import {
  NEW_APPRAISAL, updatetrans, fetchEmpTrans, updateAppraisal, fetchEmpFamily,
  FETCHEMPEXP, NEW_EXP, fetchEmpPenalties, postNewFamilyMember,postNewTrans, postEmpEdu,fetchEmpEdu,fetchEmpTraining

} from "../actions/ActionTypes";
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

export const getEmpEdu = (empid, empname) => (dispatch) => {
  console.log(empid, empname);
  axios.get(`http://localhost:5000/getempedu/?empid=${empid}&empname=${empname}`).then(res => {
    dispatch({
      type: fetchEmpEdu,
      payload: res.data
    })
  })
}

export const getEmpTrans = (empid, empname) => (dispatch) => {
  console.log('hit getemptrans');
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
    console.log(data);
    dispatch({
      type: updatetrans,
      payload: data.data
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
    console.log(data.status);
    dispatch({
      type: updateAppraisal,
      payload: { data: data.data, result: data.data.status }
    })
  })
}


export const getEmpExp = (empid, empname) => (dispatch) => {
  axios.get(`http://localhost:5000/getempexp/?empid=${empid}&empname=${empname}`).then(res => {
    console.log(res);
    dispatch({
      type: FETCHEMPEXP,
      payload: res.data
    })
  })
}

export const newEmpExp = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: "http://localhost:5000/newempexp",
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    dispatch({
      type: NEW_EXP,
      payload: {
        data: res.data.data,
        msg: res.data.msg
      }
    })
  })
}

export const getempspenalties = (nameOrId, penalty, year) => (dispatch) => {

  axios.get(`http://localhost:5000/getempspenalties/?nameorid=${nameOrId}&penalty=${penalty}&year=${year}`).then(res => {
    dispatch({
      type: fetchEmpPenalties,
      payload: res.data
    })
  })

}

export const getEmpFamily = (empid, empname) => (dispatch) => {
  axios.get(`http://localhost:5000/getempfamily/?empid=${empid}&empname=${empname}`).then(res => {
    dispatch({
      type: fetchEmpFamily,
      payload: res.data
    })
  })

}

export const submitNewFamily = (data) => async (dispatch) => {
  let res = await axios({
    method: "POST",
    data,
    withCredentials: true,
    url: "http://localhost:5000/newfamily",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: postNewFamilyMember,
      payload: res.data
    })
  })
  return res;

}

export const insertNewTrans = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: "http://localhost:5000/postnewtrans",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: postNewTrans,
      payload: res.data
    })
  })
}

export const InsertNewEdu = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: "http://localhost:5000/postnewempedu",
    headers: { "Content-Type": "application/json" },
}).then((res) => {
  console.log(res.data);
  dispatch({
    type: postEmpEdu,
    payload: res.data
  })
})
}

export const getEmpTraining = (nameOrId) => (dispatch) => {
  axios.get(`http://localhost:5000/getemptraining/?nameOrId=${nameOrId}`).then(res => {
    dispatch({
      type: fetchEmpTraining,
      payload: res.data
    })
  })
}