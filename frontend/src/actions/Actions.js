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
  fetchavailsupbox
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

export const getJobDgByCat = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/getjobdgbycat/${val}`).then((res => {
    dispatch({
      type: fetchJobByCat,
      payload: { data: res.data }
    })
  }))
}

export const getSupBoxNamesandmanager = (val1, val2) => (dispatch) => {
  axios.get(`http://localhost:5000/getmaincode/${val1}/${val2}`).then(res => {
    console.log(res.data[0].MAIN_BOX_ID);
    axios.get(`http://localhost:5000/getboxandmangers/${res.data[0].MAIN_BOX_ID}`).then((data => {
      console.log(data.data);
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
    console.log(res.data);
    dispatch({
      type: fetchEmpByDeps,
      payload: res.data
    })
  })
}



export const getJobGovern = () => (dispatch) => {
  console.log('hit');
  axios.get("http://localhost:5000/getjobgovern").then(res => {
    dispatch({
      type: fetchJobGovern,
      payload: { data: res.data }
    })
  })
}

export const getJobStation = (val) => (dispatch) => {
  console.log('hit');
  axios.get(`http://localhost:5000/getjobstation/${val}`).then(res => {
    dispatch({
      type: fetchJobStation,
      payload: { data: res.data }
    })
  })
}



export const getEmpStationAndGovern = (val_1, val_2) => (dispatch) => {
  console.log('hit');
  axios.get(`http://localhost:5000/getempstationandgovern/${val_1}/${val_2}`).then(res => {
    console.log(res.data);
    dispatch({
      type: fetchEmpStationAndGovern,
      payload: { data: res.data }
    })
  })
}

export const getEmpName = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/empname/${val}`).then(res => {
    console.log(res.data);
    dispatch({
      type: fetchEmpName,
      payload: res.data
    })
  })
}

export const getEmpNameByName = (val) => (dispatch) => {
  axios.get(`http://localhost:5000/empnamebyName/${val}`).then(res => {
    console.log(res.data);
    dispatch({
      type: fetchEmpNameByName,
      payload: res.data
    })
  })
}



export const getEmpAppraisal = (empid, appraisal, year) => (dispatch) => {
  axios.get(`http://localhost:5000/getempappraisal/${empid}/${appraisal}/${year}`).then(res => {
    console.log(res.data);
    dispatch({
      type: fetchEmpAppraisal,
      payload: res.data
    })
  })
}

export const getEmpTrans = (empid) => (dispatch) => {
  axios.get(`http://localhost:5000/getemptrans/${empid}`).then(res => {
    console.log(res.data);
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
  console.log(catname,jdname);
  axios.get(`http://localhost:5000/getavailsupbox/${catname}/${jdname}`).then(res => {
    dispatch({
      type: fetchavailsupbox,
      payload: res.data
    })
  })
}





// export const handlePostType = (e) => (dispatch) => {
//   dispatch({
//     type: postType,
//     payload: e.target.name,
//   });
// };

// export const getInt = () => (dispatch) => {
//   console.log('called');
//   axios.get("http://localhost:3000/intdocs").then((res) => {
//     dispatch({
//       type: fetchInt,
//       payload: { data: res.data, fLength: res.data[0].length, sLength: res.data[1].length, sliced:false },
//     });
//   });
// };

// export const getPost = () => (dispatch) => {
//   console.log('called');
//   axios.get("http://localhost:3000/outdocs").then((res) => {
//     outDocsData.push(res.data);
//     dispatch({
//       type: fetchEgas,
//       payload: { data: res.data, fLength: res.data[0].length, sLength: res.data[1].length, sliced:false },
//     });
//   });
// };

// export const sliceEPost = (pageNumber, type) => (dispatch) => {
//   console.log('called');
//   axios.get(`http://localhost:3000/outdocs`).then((res) => {
//     let minusOne = pageNumber - 1;
//     let firstArg = minusOne * 15;
//     let secondArg = firstArg + 15;

//     type === "export" ?

//     dispatch({
//       type: sliceEgas,
//       payload: { data: res.data[0].slice(firstArg, secondArg), sliced: true },
//     }) :     dispatch({
//       type: sliceEgas,
//       payload: { data: res.data[1].slice(firstArg, secondArg), sliced: true },
//     })
//   })
// };

// export const sliceIPost = (pageNumber, type) => (dispatch) => {
//   console.log('called');
//   axios.get(`http://localhost:3000/intdocs`).then((res) => {
//     let minusOne = pageNumber - 1;
//     let firstArg = minusOne * 15;
//     let secondArg = firstArg + 15;
//     console.log(res.data[0]);
//     type === "export" ?
//     dispatch({
//       type: sliceIntDocs,
//       payload: { data: res.data[0].slice(firstArg, secondArg), sliced: true },
//     }) :     dispatch({
//       type: sliceIntDocs,
//       payload: { data: res.data[1].slice(firstArg, secondArg), sliced: true },
//     })
//   });
// };

// export const sliceWaiting = (pageNumber) => (dispatch) => {
//   console.log('called');
//   axios.get(`http://localhost:3000/pended`).then((res) => {
//     let minusOne = pageNumber - 1;
//     let firstArg = minusOne * 15;
//     let secondArg = firstArg + 15;
//     dispatch({
//       type: sliceWaitingPost,
//       payload: { data: res.data.slice(firstArg, secondArg) },
//     });
//   });
// };

// export const searchPost = (value) => (dispatch) => {
//   axios.get(`http://localhost:3000/searchPost/${value}`).then((res) => {
//     dispatch({
//       type: searchValue,
//       payload: { data: res.data },
//     });
//   });
// };

// // export const searchPost = (value) => (dispatch) => {
// //     dispatch({
// //       type: searchValue,
// //       payload: { data: value },
// //     });
// // };

// export const testTry = (e) => (dispatch) => {

//   dispatch({
//     type: test,
//     payload: { data: e.target.name, sliced: false },
//   });
// };

// export const waitingPost = () => (dispatch)  =>{
//   console.log('called');
//   axios.get("http://localhost:3000/pended").then((data) => {
//     dispatch({
//       type: pendingPost,
//       payload: {data: data.data, length: data.data.length}
//     })
//   });
// };

// export const getImage = () => (dispatch) => {
//   console.log('called')
//   axios.get("http://localhost:3000").then(res => {
//     console.log(res)
//     dispatch({
//       type: fetchImage,
//       payload: res.data
//     })
//   })
// };
