import axios from './axios';
import { URL } from '../variables';

export const getRequestForPayment = (token, requestId) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.get(`${URL}/public/getrequestforpay/${requestId}`, config)
            .then((result) => {
                if (result.data.request) {
                    resolve(result.data.request);
                } else {
                    reject(result.data.error ? result.error.message : "Unknown server error")
                }
            })
            .catch((error) => {
                reject("Network error")
            })
    })
}

export const requestTransaction = (token, data) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.post(`${URL}/public/requesttransaction`, data, config)
            .then((result) => {
                if (result.data.success) {
                    resolve(result.data.success);
                } else {
                    reject(result.data.error ? result.error.message : "Unknown server error")
                }
            })
            .catch((error) => {
                reject("Network error")
            })
    })
}

export const pollTransactionUrl = (token, url) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.post(`${URL}/public/updatepaymentstatus`, {url}, config)
            .then((result) => {
                if (result.status === 200) {
                    resolve("Payment status updated");
                } else {
                    reject(result.data.error ? result.error.message : "Unknown server error")
                }
            })
            .catch((error) => {
                reject("Network error")
            })
    })
}

export const getTransactionsList = (token) => {
    return new Promise((resolve, reject) => {
        const config = {
            headers: {
                'authorization': 'bearer ' + token
            }
        }

        axios.get(`${URL}/public/gettransactions`, config)
            .then((result) => {
                if (result.data.transactions) {
                    resolve(result.data.transactions);
                } else {
                    reject(result.data.error ? result.error.message : "Unknown server error")
                }
            })
            .catch((error) => {
                reject("Network error")
            })
    })
}
