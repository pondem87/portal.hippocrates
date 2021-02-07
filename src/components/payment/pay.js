import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';
import { getRequestForPayment, pollTransactionUrl, requestTransaction } from '../../functions/paymentFunctions';
import DashHeader from '../dashboard/dashHeader';
import Loader from '../shared/Loader';

const Pay = ({match}) => {
    const user = useContext(UserContext)
    const [request, setRequest] = useState(null);
    const requestId = match.params.requestId;
    const [loading, setLoading] = useState(true);
    const [operator, setOperator] = useState('ecocash');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(null);

    useEffect(() => {
        getRequest();
    },[])

    const getRequest = async () => {
        try {
            let req = await getRequestForPayment(user.token, requestId);
            setRequest(req)
        } catch (error) {
            alert("Cannot find request: " + error)
        } finally {
            setLoading(false)
        }
    }

    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    const submitTransaction = async (e) => {
        e.preventDefault();

        if (operator.length === 0) {
            alert("Please select mobile wallet")
        }

        if (!phoneNumber.match(/07[0-9]{8}/)) {
            alert("Phone number should be digits only with no spaces starting with 07...")
        }

        let data = {
            idservice_requests: request.idservice_requests,
            service: request.service_type,
            email: email,
            amount: request.amount,
            method: operator,
            number: phoneNumber
        }

        try {
            setLoading(true)
            let response = await requestTransaction(user.token, data);
            console.log(response)
            setResponse(response.response)
        } catch (error) {
            alert("Failed to initiate transaction: " + error)
        } finally {
            setLoading(false)
        }
    }

    const paymentDone = async () => {
        try {
            setLoading(true)
            let msg = await pollTransactionUrl(user.token, response.pollUrl)
            alert(msg);
        } catch (error) {
            alert("Failed to update payment status: " + error);
        } finally {
            history.push('/payments')
        }
    }

    return(
        <div>
            <DashHeader user={user} />
            <div className="row">
                <div className="col-12 border-bottom border-info">
                    <button onClick={goToHome} className="btn btn-outline-info mt-1 float-right"><i className="fas fa-home mr-1"></i>Go back to dashboard</button>
                    <h2 className="text-muted">Make A Payment</h2>
                </div>
            </div>
            {
                loading ? <Loader /> : request ?
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <h3>Pay for the following service</h3>
                            <ul className="list-group">
                                <li className="list-group-item">Service requested: <span className="text-capitalize font-weight-bold">{request.service_type}</span></li>
                                <li className="list-group-item">Date of request: {new Date(request.created_at).toDateString()}</li>
                                {
                                    Object.keys(JSON.parse(request.service_params)).map((key, i) => {
                                        return (
                                            <li key={i} className="list-group-item"><span className="text-capitalize">{key}</span>: {JSON.parse(request.service_params)[key]}</li>
                                        )
                                    })
                                }
                            </ul>

                        <h2 className="my-4 py-4 text-center">Amount (ZWL): {request.amount}</h2>
                            <div className="text-center border rounded border-primary p-3 mb-4">
                                <p>Currently only mobile wallet payments are accepted!</p>
                                {
                                    response ?
                                        <div>
                                            <p className="font-weight-bold text-success">{response.instructions}</p>
                                            <button onClick={paymentDone} className="btn btn-success">Done</button>
                                        </div>
                                        :
                                        <form onSubmit={submitTransaction}>
                                            <div className="form-group">
                                                <label htmlFor="operator">Choose wallet</label>
                                                <select className="form-control" id="operator" onChange={(e) => setOperator(e.target.value)} value={operator} >
                                                    <option value="ecocash">Ecocash</option>
                                                    <option value="onemoney">One Money</option>
                                                    <option value="telecash">Telecash</option>
                                                </select>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">Email Address</span>
                                                </div>
                                                <input type="email" className="form-control" aria-label="email" aria-describedby="basic-addon1" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon2">Phone Number</span>
                                                </div>
                                                <input type="text" className="form-control" aria-label="phonenumber" aria-describedby="basic-addon2" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-success">Begin Transaction</button>
                                            </div>
                                            <p className="pt-4"><Link to="/termsandconditions">Terms and Conditions apply.</Link></p>
                                        </form>
                                }
                                
                            </div>
                    </div>
                </div>
                : <p>The service request you selected is not available.</p>
            }
        </div>
    )
}

export default Pay;