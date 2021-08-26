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
  fetchEmpNameByName,
  fetchCurrentjd,
  fetchavailjd,
  fetchavailsupbox,
  fetchupjd,
  fetchEmpDetails,
  fetchDownJd,
  fetchqn,
  fetchemps,
  fetchgid
} from "../actions/ActionTypes";
import axios from "axios";

export const gitDownJd = () => (dispatch) => {
  axios.get(`http://localhost:5000/gitDownJd`).then((res) => {
    console.log(res.data.length);
    var obj = []
    for (var i = 0; i < res.data.length; i++) {
      for (var b = 0; b < res.data.length; b++) {
        if (res.data[i].SUP_BOX_ID = res.data[i].SUP_BOX_ID_P)
          obj.push(res.data[i].SUP_BOX_NAME)

      }
    }
    console.log(obj);
    dispatch({
      type: fetchDownJd,
      payload: { data: res.data },
    });
  });

}

export const getEmpDetails = (empid, empname) => (dispatch) => {
  axios.get(`http://localhost:5000/getempdetails/?empid=${empid}&empname=${empname}`).then((res) => {
    dispatch({
      type: fetchEmpDetails,
      payload: { data: res.data },
    });
  });

}

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

export const getJobDgByCat =  (val) => async (dispatch) => {
  axios.get(`http://localhost:5000/getjobdgbycat/${val}`).then((res => {
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
  axios.get(`http://localhost:5000/empnamebyid/${val}`).then(res => {
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



export const getEmpAppraisal = (empid, empname, appraisal, year) => (dispatch) => {
  console.log(empid, appraisal, year);
  // axios.get(`http://localhost:5000/getempappraisal/${empid}/${appraisal}/${year}`).then(res => {
  axios.get(`http://localhost:5000/empappraisal/?empid=${empid}&empname=${empname}&appraisal=${appraisal}&year=${year}`).then(res => {
    dispatch({
      type: fetchEmpAppraisal,
      payload: res.data
    })
  })
}



export const getCurrentJd = (empid) => (dispatch) => {
  axios.get(`http://localhost:5000/currentjd/${empid}`).then(res => {
    dispatch({
      type: fetchCurrentjd,
      payload: res.data
    })
  })
}

export const getavailJd = (catname, jdname) => (dispatch) => {
  axios.get(`http://localhost:5000/availjd/${catname}/${jdname}`).then(res => {
    dispatch({
      type: fetchavailjd,
      payload: res.data
    })
  })
}

export const getAvailSupBox = (catname, jdname) => (dispatch) => {
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


export const getQn = () => (dispatch) => {
  axios.get(`http://localhost:5000/getqn`).then(res => {
    dispatch({
      type: fetchqn,
      payload: res.data
    })
  })

}

export const getemps = () => (dispatch) => {
  axios.get('http://localhost:5000/getemps').then(res => {
    dispatch({
      type: fetchemps,
      payload: res.data
    })
  })
}


export const getGid = () => (dispatch) => {
  axios.get('http://localhost:5000/getgid').then(res => {
    dispatch({
      type: fetchgid,
      payload: res.data
    })
  })
}