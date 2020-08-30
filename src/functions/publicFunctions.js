import axios from 'axios';
import { URL } from '../variables';

export const uploadNewFile = (userContextDispatch, setProgress, setError, jwt, done, data) => {
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
            if (res.data.uploads) {
                userContextDispatch({
                    type: 'SET-UPLOADS',
                    data: {
                        uploads: res.data.uploads
                    }
                })
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

export const deleteUploadFunc = (userContextDispatch, jwt, done, uploadId) => {
    const config = {
        headers: {
            'authorization': 'bearer ' + jwt
        }
    }

    axios.post(`${URL}/public/deleteupload`, {uploadId: uploadId}, config)
        .then((res) => {
            if (res.data.uploads) {
                userContextDispatch({
                    type: 'SET-UPLOADS',
                    data: {
                        uploads: res.data.uploads
                    }
                })
                done(null);
            } else if (res.data.error) {
                //failed to upload
                done(res.data.error.message);
            } else {
                done('Unexpected server response')
            }
        })
        .catch((error) => {
            done('Network Error')
        });
}