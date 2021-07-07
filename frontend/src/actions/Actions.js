import {
  fetchJobDgreeCodes,
  fetchMainCodes,
  fetchCates,
  fetchJobByCat,
  fetchSupBoxNamesandmanager,
  fetchJobGovern,
  fetchJobStation,
  fetchEmpStationAndGovern,
  fetchDeps,
  fetchEmpByDeps,
  fetchEmpName,
  fetchEmpAppraisal,
  fetchEmpTrans,
  fetchEmpEdu,
  fetchEmpNameByName,
  fetchCurrentjd,
  fetchavailjd,
  fetchavailsupbox,
  fetchupjd
} from "../actions/ActionTypes";
import axios from "axios";

let outDocsData = [];

export const getJobDgreeCodes = (value) => (dispatch) => {
  axios.get(`http://localhost:5000/getjobdgreecodes/${value}`).then((res) => {
    dispatch({
      type: fetchJobDgreeCodes,
      payload: { data: res.data[0].J_D_ID },
    });
  });
};

export const getMainCodes = (value) => (dispatch) => {
  axios.get(`http://localhost:5000/getmaincodes/${value}`).then((res) => {
    dispatch({
      type: fetchMainCodes,
      payload: { data: res.data },
    });
  });
};

export const getCates = () => (dispatch) => {
  axios.get(`http://localhost:5000/category`).then((res => {
    dispatch({
      type: fetchCates,
      payload: { data: res.data }
    })
  }))
}

export const getJobDgByCat = (val,jdidp) => (dispatch) => {
  axios.get(`http://localhost:5000/getjobdgbycat/${val}/${jdidp}`).then((res => {
    dispatch({
      type: fetchJobByCat,
      payload: { data: res.data }
    })
  }))
}

export const getSupBoxNamesandmanager = (val1, val2) => (dispatch) => {
  axios.get(`http://localhost:5000/getmaincode/${val1}/${val2}`).then(res => {
    axios.get(`http://localhost:5000/getboxandmangers/${res.data[0].MAIN_BOX_ID}`).then((data => {
      dispatch({
        type: fetchSupBoxNamesandmanager,
        payload: data.data
      })
    }))
  })

}

export const getDeps = () => (dispatch) => {
  axios.get("http://localhost:5000/getdeps").then(res => {
    dispatch({
      type: fetchDeps,
      payload: res.data
    })
  })
}

export const getEmpByDeps = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/getempbydeps/${val}`).then(res => {
    dispatch({
      type: fetchEmpByDeps,
      payload: res.data
    })
  })
}



export const getJobGovern = () => (dispatch) => {
  axios.get("http://localhost:5000/getjobgovern").then(res => {
    dispatch({
      type: fetchJobGovern,
      payload: { data: res.data }
    })
  })
}

export const getJobStation = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/getjobstation/${val}`).then(res => {
    dispatch({
      type: fetchJobStation,
      payload: { data: res.data }
    })
  })
}



export const getEmpStationAndGovern = (val_1, val_2) => (dispatch) => {
  axios.get(`http://localhost:5000/getempstationandgovern/${val_1}/${val_2}`).then(res => {
    dispatch({
      type: fetchEmpStationAndGovern,
      payload: { data: res.data }
    })
  })
}

export const getEmpName = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/empname/${val}`).then(res => {
    dispatch({
      type: fetchEmpName,
      payload: res.data
    })
  })
}

export const getEmpNameByName = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/empnamebyName/${val}`).then(res => {
    dispatch({
      type: fetchEmpNameByName,
      payload: res.data
    })
  })
}



export const getEmpAppraisal = (empid, appraisal, year) => (dispatch) => {
  axios.get(`http://localhost:5000/getempappraisal/${empid}/${appraisal}/${year}`).then(res => {
    dispatch({
      type: fetchEmpAppraisal,
      payload: res.data
    })
  })
}

export const getEmpTrans = (empid) => (dispatch) => {
  axios.get(`http://localhost:5000/getemptrans/${empid}`).then(res => {
    console.log("hit");
    dispatch({
      type: fetchEmpTrans,
      payload: res.data
    })
  })
}

export const getEmpEdu = (empid) => (dispatch) => {
  axios.get(`http://localhost:5000/getempedu/${empid}`).then(res => {
    dispatch({
      type: fetchEmpEdu,
      payload: res.data
    })
  })
}

export const getCurrentJd = (empid) =>(dispatch) => {
  axios.get(`http://localhost:5000/currentjd/${empid}`).then(res => {
    dispatch({
      type: fetchCurrentjd,
      payload: res.data
    })
  })
}

export const getavailJd =  (catname,jdname) => (dispatch)  =>{
  axios.get(`http://localhost:5000/availjd/${catname}/${jdname}`).then(res => {
    dispatch({
      type: fetchavailjd,
      payload: res.data
    })
  })
}

export const getAvailSupBox =  (catname,jdname) => (dispatch)  =>{
  axios.get(`http://localhost:5000/getavailsupbox/${catname}/${jdname}`).then(res => {
    dispatch({
      type: fetchavailsupbox,
      payload: res.data
    })
  })
}

export const getUpJd = (len, supboxname) => (dispatch) => {
  axios.get(`http://localhost:5000/getUpJd/${len}/${supboxname}`).then(res => {
    dispatch({
      type: fetchupjd,
      payload: res.data
    })
  })

}