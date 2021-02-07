import React, { useEffect, useState } from 'react';
import { getServiceRequests, serviceRequest } from '../../../../functions/publicFunctions';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const TelemedicineClient = ({user}) => {
    const [form, setForm] = useState({
        profession: '',
        platform: '',
        platform_id: '',
        phone: '',
        reason: ''
    });
    const [requesting, setRequesting] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        getRequests();
    }, [])

    const getRequests = async () => {
        try {
            let rqs = await getServiceRequests(user.token, "telemedicine");
            setRequests(rqs);
        } catch (error) {
            alert("Failed to get requests list: " + error)
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        setForm(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const submitRequest = async (e) => {
        e.preventDefault();

        try {
            setRequesting(true)
            let message = await serviceRequest(user.token, "telemedicine", form)
            alert(message);
        } catch (error) {
            alert("Request failed: " + error)
        } finally {
            setRequesting(false)
        }
    }

    return (
        <div className="row my-2">
            <div className="col-md-12 col-lg-5">
                {
                    requesting ? 
                        <div>
                            <div className="loader text-info text-center my-4">
                                <i className="fas fa-spinner fa-pulse fa-7x"></i>
                                <p className="font-weight-bold text-center">Loading...</p>
                            </div>
                        </div>
                        :
                        <div>
                            <h3>Telemedicine Service</h3>
                            <p>Here you can request for a health professional to have an online consultation.
                            Once your request has been processed you will be requested to make a payment and the
                            practitioner will contact you on your preferred medium. If you are not sure what kind of service you
                            require, go back to dashboard and select live chat for assistance.
                            </p>
                            <h4>Submit request</h4>
                            <form onSubmit={submitRequest}>
                                <div className="form-group">
                                    <label htmlFor="profession">Profession:</label>
                                    <input type="text" className="form-control" id="profession" aria-describedby="professionHelp" onChange={handleChange} value={form.profession} />
                                    <small id="professionHelp" className="form-text text-muted">Indicate which professional you need e.g medical doctor, nurse, physiotherapist</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="platform">Platform:</label>
                                    <input type="text" className="form-control" id="platform" aria-describedby="platformHelp" onChange={handleChange} value={form.platform} />
                                    <small id="platformHelp" className="form-text text-muted">Which platform should we use? e.g WhatsApp, Skype</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="platform_id">Contact/Platform specific ID:</label>
                                    <input type="text" className="form-control" id="platform_id" aria-describedby="platform_idHelp" onChange={handleChange} value={form.platform_id} />
                                    <small id="platform_idHelp" className="form-text text-muted">The number or ID for the service to be used.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone:</label>
                                    <input type="text" className="form-control" id="phone" aria-describedby="phoneHelp" onChange={handleChange} value={form.phone} />
                                    <small id="phoneHelp" className="form-text text-muted">How do we contact you for more information.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reason">Reason for request:</label>
                                    <textarea className="form-control" id="reason" rows="2" aria-describedby="reasonHelp" onChange={handleChange} value={form.reason}></textarea>
                                    <small id="reasonHelp" className="form-text text-muted">Describe your problem briefly</small>
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">Submit request</button>
                            </form>
                        </div>
                }              
            </div>
            <div className="col-md-12 col-lg-7">
                <h3>My Requests</h3>
                <h4>Pending</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Profession</th>
                            <th scope="col">Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loading && requests.map((request) => {
                                    if (request.processed === 0) {
                                        return (
                                            <tr key={request.idservice_requests}>
                                                <td>{moment(request.created_at).format("ddd D, HH:mm")}</td>
                                                <td>{JSON.parse(request.service_params).profession}</td>
                                                <td>{JSON.parse(request.service_params).platform}</td>
                                            </tr>
                                        )
                                    }
                                })
                        }
                    </tbody>
                </table>
                <h4>In progress</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Profession</th>
                            <th scope="col">Platform</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loading && requests.map((request) => {
                                    if (request.processed === 1 && request.fullfilled === 0 && request.reject === 0) {
                                        return (
                                            <tr key={request.idservice_requests}>
                                                <td>{moment(request.created_at).format("ddd D, HH:mm")}</td>
                                                <td>{JSON.parse(request.service_params).profession}</td>
                                                <td>{JSON.parse(request.service_params).platform}</td>
                                                <td>{
                                                        request.paid ?
                                                            "In progress (Paid)"
                                                            :
                                                            <button onClick={() => history.push(`/pay/${request.idservice_requests}`)} className="btn btn-success">Make Payment</button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                        }
                    </tbody>
                </table>
                <h4>History</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Profession</th>
                            <th scope="col">Platform</th>
                            <th scope="col">Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loading && requests.map((request) => {
                                    if (request.fullfilled === 1 || request.reject === 1) {
                                        return (
                                            <tr key={request.idservice_requests}>
                                                <td>{moment(request.created_at).format("ddd D, HH:mm")}</td>
                                                <td>{JSON.parse(request.service_params).profession}</td>
                                                <td>{JSON.parse(request.service_params).platform}</td>
                                                <td>
                                                    {
                                                        request.reject ? request.comment : "Completed"
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                        }
                    </tbody>
                </table>
                {
                    loading ?
                        <div>
                            <div className="loader text-info text-center my-4">
                                <i className="fas fa-spinner fa-pulse fa-7x"></i>
                                <p className="font-weight-bold text-center">Loading...</p>
                            </div>
                        </div> : <span />
                }
            </div>
        </div>
    )
}

export default TelemedicineClient;