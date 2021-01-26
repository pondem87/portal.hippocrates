import axios from './axios';
import { URL } from '../variables';

export const registerHouseCall = (token, data) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.post(`${URL}/professionals/registerhousecall`, data, config)
            .then((result) => {
                if (result.data.registration) {
                    resolve(result.data.registration);
                } else {
                    reject(result.data.error ? result.error.message : "Unknown server error")
                }
            })
            .catch((error) => {
                reject("Network error")
            })
    })
}

export const getHouseCallRegistration = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.get(`${URL}/professionals/gethousecallreg`, config)
            .then((result) => {
                if (result.data.registration) {
                    resolve(result.data.registration);
                } else if (result.data.unregistered) {
                    reject("unregistered")
                } else {
                    reject(result.data.error ? result.error.message : "Unknown server error");
                }
            })
            .catch((error) => {
                reject("Network error")
            })
    })
}