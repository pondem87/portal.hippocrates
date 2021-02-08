import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 my-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">House Call</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Register for house calls</h6>
                        <p className="card-text">Enlist for provision of services and include your times, terms and geographic boundaries.</p>
                        <Link to="/services/house-call" className="card-link">Check Out This Service</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 my-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Telemedicine</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Register for telemedicine</h6>
                        <p className="card-text">Enlist for provision of telemedicine services and state your preferred platform.</p>
                        <Link to="/services/telemedicine" className="card-link">Check Out This Service</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 my-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Locums</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Register for locums</h6>
                        <p className="card-text">Enlist for locums. Let us know where and when you can be available for locums.</p>
                        <Link to="/services/locums" className="card-link">Check Out This Service</Link>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 my-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Q And A </h5>
                        <h6 className="card-subtitle mb-2 text-muted">Questions people ask</h6>
                        <p className="card-text">Answer a few non-urgent medical questions asked by the people.</p>
                        <Link to="/services/questions" className="card-link">Let's take a look</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;