import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">House Call</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Register for house calls</h6>
                        <p className="card-text">Enlist for provision of services and include your times, terms and geographic boundaries.</p>
                        <Link to="/services/house-call" className="card-link">Try Out This Service</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;