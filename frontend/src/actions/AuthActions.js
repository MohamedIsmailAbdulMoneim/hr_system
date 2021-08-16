import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./ActionTypes"
import { returnErrors } from "./ErrorActions";


import axios from 'axios'

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

    axios.get('http://localhost:5000/protected', tokenConfig(getState)).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch(err => {
        console.log(err);
        // dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    });
}

export const register = ({ uname, pw }) => (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        },
    };
    const body = JSON.stringify({ uname, pw })
    axios.post('http://localhost:5000/register', body, config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                id: res.data.data.id,
                token: res.data.data.token
            }
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: REGISTER_FAIL
        })
    })

}

export const tokenConfig = getState => {
    const token = getState().auth.token


    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['Authorization'] = token
    }

    return config;

}


export const logOut = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}