import * as actionTypes from './actionType';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};


export const checkAuthTimeout = expirationTime => {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const authLogin = (username, password) => {
    return dispatch =>{
        dispatch(authStart());
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post("https://cors-anywhere.herokuapp.com/"+ 'http://84.201.147.3:8080/index.php/api/auth/login',{
            username: username,
            password: password
        }, axiosConfig).then(res => {
            const token = res.data.token;
            console.log(token);
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
};
/*
export const authSignUp = (username, email,  password1, password2) => {
    return dispatch =>{
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/api/rest-auth/registration/',{
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
            .catch(err => {
                dispatch(authFail(err));
            })
    }
};
*/
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined){
            console.log("UNDEF");
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}