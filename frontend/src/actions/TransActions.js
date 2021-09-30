import {
  NEW_APPRAISAL, updatetrans, fetchEmpTrans, updateAppraisal, fetchEmpFamily,
  FETCHEMPEXP, NEW_EXP, fetchEmpPenalties, postNewFamilyMember,postNewTrans, postEmpEdu,fetchEmpEdu,fetchEmpTraining,deleteTraining,deleteFamily,
  deletePenalty,deleteTrans,deleteAppraisal,deleteExperience,deleteEdu

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
  let nameOrId;
  if (empname.length > 0) {
    nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${empname}")`
} else if (empid.length > 0) {
    nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${empid})`
}
  axios.get(`http://localhost:5000/getemptrans/?nameOrId=${nameOrId}`).then(res => {
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


export const getEmpExp = (data) => (dispatch) => {
  axios.get(`http://localhost:5000/getempexp/?data=${data}`).then(res => {
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

export const getempspenalties = (data) => (dispatch) => {

  axios.get(`http://localhost:5000/getempspenalties/?data=${data}`).then(res => {
    console.log(res.data);

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

export const deleteEmpTraining = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: 'http://localhost:5000/deleteemptraining',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data.data.data[1]);
    dispatch({
      type: deleteTraining,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

export const deleteEmpFamily = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: 'http://localhost:5000/deleteempfamily',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteFamily,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

export const deleteEmpPenalty = (id) => (dispatch) => {
  axios({
    method: "PUT",
    data: id,
    url: 'http://localhost:5000/deletepenalty',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deletePenalty,
      payload: { data: data.data, result: data.data.status }
    })
  })
}

export const deleteEmpTrans = (query) => (dispatch) => {
  axios({
    method: "PUT",
    data: query,
    url: 'http://localhost:5000/deletetrans',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data);
    dispatch({
      type: deleteTrans,
      payload: { data: data.data.data[2], result: data.data.status }
      })
  })
}

export const deleteEmpAppraisal = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: 'http://localhost:5000/deleteappraisal',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteAppraisal,
      payload: { data: data.data, result: data.data.status }
    })
  })
}

export const deleteEmpExperience = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: 'http://localhost:5000/deleteexp',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data);
    dispatch({
      type: deleteExperience,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

export const deleteEmpEdu = (id,nat) => (dispatch) => {
  axios({
    method: "PUT",
    data: id,
    url: 'http://localhost:5000/deleteedu',
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteEdu,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}