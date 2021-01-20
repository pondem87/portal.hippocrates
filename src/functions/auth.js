import axios from './axios';
import { URL } from '../variables'

//checks if user logged in and returns user object or error
export const updateUserState = (dispatch, setLoader) => {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
        setLoader(false);
        return;
    }
    let config = {
        headers: {
            'authorization': 'bearer ' + jwt
        }
    }
    axios.post(`${URL}/auth/getuser`, {},config)
        .then((res) => {
            if (res.data.token) {
                //login successful
                localStorage.setItem('jwt', res.data.token)
                dispatch({
                    type: 'SET-USER',
                    data: {
                        ...res.data,
                        signedIn: true
                    }
                })
                setLoader(false);
            } else {
                console.log('not logged in');
                setLoader(false);
            }
        })
        .catch((error) => {
            console.log('error checking state', error);
            setLoader(false)
        });
}

//login function
export const loginFunc = (dispatch, setErrorState, done, values) => {
    axios.post(`${URL}/auth/signin`, values)
        .then((res) => {
            if (res.data.token) {
                //login successful
                localStorage.setItem('jwt', res.data.token);
                dispatch({
                    type: 'SET-USER',
                    data: {
                        ...res.data,
                        signedIn: true
                    }
                })
                done();
            } else if (res.data.error) {
                //failed to login
                setErrorState((prevState) => ({
                    ...prevState,
                    error: res.data.error.message
                }))
            } else {
                setErrorState((prevState) => ({
                    ...prevState,
                    error: 'Unknown Error'
                }))
            }
        })
        .catch((error) => {
            setErrorState((prevState) => ({
                ...prevState,
                error: 'Network Error'
            }))
        });
}

//signup function
export const signupFunc = (dispatch, setErrorState, done, values) => {
    axios.post(`${URL}/auth/signup`, values)
        .then((res) => {
            if (res.data.token) {
                //login successful
                localStorage.setItem('jwt', res.data.token);
                dispatch({
                    type: 'SET-USER',
                    data: {
                        ...res.data,
                        signedIn: true
                    }
                })
                done();
            } else {
                //failed to login
                setErrorState((prevState) => ({
                    ...prevState,
                    error: res.data.error.message
                }))
            }
        })
        .catch((error) => {
            setErrorState((prevState) => ({
                ...prevState,
                error: 'Network Error'
            }))
        });
}

//one of two reset password fxns.. this one checks the email
export const CheckEmailForReset = (setState, values) => {
    axios.post(`${URL}/auth/setemailreset`, values)
        .then((res) => {   
            console.log(res.data);
            if (res.data.email) {
                setState((prevState) => ({
                    ...prevState,
                    email: res.data.email,
                    error: null
                }))
            } else if (res.data.error) {
                setState((prevState) => ({
                    ...prevState,
                    email: null,
                    error: res.data.error.message
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    email: null,
                    error: 'Unknown Error Occurred'
                }))
            }
        })
        .catch((error) => {
            setState(prevState => ({
                ...prevState,
                email: null,
                error: 'Network Error'
            }))
        });
}

//one of two reset password fxns.. this one resets the password
export const ResetPassword = (dispatch, setState, done, values) => {
    axios.post(`${URL}/auth/resetpassword`, values)
        .then((res) => {
            console.log(res.data);
            if (res.data.token) {
                localStorage.setItem('jwt', res.data.token);
                dispatch({
                    type: 'SET-USER',
                    data: {
                        ...res.data,
                        signedIn: true
                    }
                })
                done();
            } else if (res.data.error) {
                setState((prevState) => ({
                    ...prevState,
                    error: res.data.error.message
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    error: 'Unknown Error Occurred'
                }))
            }
        })
        .catch((error) => {
            setState((prevState) => ({
                ...prevState,
                error: 'Network Error'
            }))
        });
}

//verifies the account
export const VerifyAccount = (dispatch, setError, done, values) => {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
        setError((prevState) => ({
            ...prevState,
            error:'Error. Try refreshing page'
        }));
        return;
    };

    let config = {
        headers: {
            'authorization': 'bearer ' + jwt
        }
    };

    axios.post(`${URL}/auth/verify`, values, config)
    .then((res) => {
        console.log(res.data);
        if (res.data.token) {
            dispatch({
                type: 'SET-USER',
                data: {
                    ...res.data,
                    signedIn: true
                }
            })
            done();
        } else if (res.data.error) {
            setError((prevState) => ({
                ...prevState,
                error: res.data.error.message
            }))
        } else {
            setError((prevState) => ({
                ...prevState,
                error:'Unknown Error Occurred'
            }))
        }
    })
    .catch((error) => {
        setError((prevState) => ({
            ...prevState,
            error: 'Network Error'
        }))
    });
}

export const signoutFunc = (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({
        type: 'UNSET-USER'
    });
}