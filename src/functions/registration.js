import axios from './axios';
import { URL } from '../variables';

export const professionalRegistration = (userContextDispatch, setProgress, setError, data, jwt) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': 'bearer ' + jwt
        },
        onUploadProgress: (progressEvent) => {
            let { loaded, total } = progressEvent;
            console.log("progressEvent: ", progressEvent);
            let percent = Math.round((loaded/total) * 100);
            if (parseInt(percent)) setProgress(percent);
        }
    }

    axios.post(`${URL}/professionals/register`, data, config)
        .then((res) => {
            if (res.data.token) {
                userContextDispatch({
                    type: 'SET-USER',
                    data: {
                        ...res.data,
                        signedIn: true
                    }
                })
            } else if (res.data.error) {
                //failed to login
                setError((prevState) => ({
                    ...prevState,
                    error: res.data.error.message
                }))
            } else {
                setError((prevState) => ({
                    ...prevState,
                    error: 'Unexpected server response'
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

export const uploadNewFiles = (setProgress, setError, jwt, done, data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': 'bearer ' + jwt
        },
        onUploadProgress: (progressEvent) => {
            let { loaded, total } = progressEvent;
            console.log("progressEvent: ", progressEvent);
            let percent = Math.round((loaded/total) * 100);
            if (parseInt(percent)) setProgress(percent);
        }
    }

    axios.post(`${URL}/professionals/upload`, data, config)
        .then((res) => {
            if (res.data.success) {
                done();
            } else if (res.data.error) {
                //failed to upload
                setError((prevState) => ({
                    ...prevState,
                    error: res.data.error.message
                }))
            } else {
                setError((prevState) => ({
                    ...prevState,
                    error: 'Unexpected server response'
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