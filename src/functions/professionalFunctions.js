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

export const suspendService = (token, service) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.post(`${URL}/professionals/suspendservice`, {service}, config)
            .then((res) => {
                if (res.data.success) {
                    resolve(res.data.success.message);
                } else {
                    reject(res.data.error ? res.data.error.message : "Server error")
                }
            })
            .catch(error => {
                reject("Network Error")
            })
    })
}

export const resumeService = (token, service) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.post(`${URL}/professionals/resumeservice`, {service}, config)
            .then((res) => {
                if (res.data.success) {
                    resolve(res.data.success.message);
                } else {
                    reject(res.data.error ? res.data.error.message : "Server error")
                }
            })
            .catch(error => {
                reject("Network Error")
            })
    })
}

export const updateServiceHours = (token, service, data) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.post(`${URL}/professionals/updateservice`, {service, data}, config)
            .then((res) => {
                if (res.data.success) {
                    resolve(res.data.success.message);
                } else {
                    reject(res.data.error ? res.data.error.message : "Server error")
                }
            })
            .catch(error => {
                reject("Network Error")
            })
    })
}