import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Live Chat</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Instant Medical Advice</h6>
                        <p className="card-text">Get medical advice on which service best suits your current situation through our chat service</p>
                        <Link to="/services/livechat" className="card-link">Start a chat now!</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">House Call</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Medical services on the go</h6>
                        <p className="card-text">Request a medical professional to come and assist you at home, school or at work.</p>
                        <Link to="/services/house-call" className="card-link">Check Out This Service</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Telemedicine</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Medical services online</h6>
                        <p className="card-text">Consult a medical professional using voice or video call on your preferred platform.</p>
                        <Link to="/services/telemedicine" className="card-link">Try Out This Service</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Payments</h5>
                        <h6 className="card-subtitle mb-2 text-muted">View your payment history</h6>
                        <p className="card-text">Here you can see payments that you have made and if they have been successfully captured.</p>
                        <Link to="/payments" className="card-link">View your payments</Link>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Services;