import axios from './axios';
import { URL } from '../variables';

export const getCertificatesFunction = (jwt) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + jwt
            }
        }

        axios.get(`${URL}/professionals/getcertificates`, config)
            .then((res) => {
                if (res.data.certificates) {
                    resolve(res.data.certificates);
                } else {
                    reject(res.data.error ? res.data.error.message : "Server error")
                }
            })
            .catch(error => {
                reject("Network Error")
            })
    })
}