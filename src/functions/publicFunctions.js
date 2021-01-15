import axios from 'axios';
import { URL } from '../variables';

export const uploadNewFile = (setProgress, setError, jwt, done, data) => {
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

    axios.post(`${URL}/public/upload`, data, config)
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

export const retriveUploads = (jwt) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + jwt
            }
        }

        axios.get(`${URL}/public/getuploads`, config)
            .then((res) => {
                if (res.data.uploads) {
                    resolve(res.data.uploads);
                } else {
                    reject(res.data.error ? res.data.error.message : "Server error")
                }
            })
            .catch(error => {
                reject("Network Error")
            })
    })
}

export const deleteUploadFunc = (jwt, uploadId) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + jwt
            }
        }

        axios.post(`${URL}/public/deleteupload`, {uploadId: uploadId}, config)
        .then((res) => {
            if (res.data.success) {
                resolve(res.data.success.message);
            } else if (res.data.error) {
                //failed to upload
                reject(res.data.error.message);
            } else {
                reject('Unexpected server response')
            }
        })
        .catch((error) => {
            reject('Network Error')
        });
    })
}

export const updateUserField = (jwt, field, value) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + jwt
            }
        }

        axios.post(`${URL}/public/updateuser`, {field, value}, config)
        .then((res) => {
            if (res.data.success) {
                resolve({ field: res.data.field, value: res.data.value})
            } else if (res.data.error) {
                //failed to upload
                reject(res.data.error.message);
            } else {
                reject('Unexpected server response')
            }
        })
        .catch((error) => {
            reject('Network Error')
        });
    })
}