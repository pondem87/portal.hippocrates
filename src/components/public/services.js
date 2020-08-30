import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">House Call</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Medical services on the go</h6>
                        <p className="card-text">Get medical assistance at home, work or other place 24hours a day and seven days per week.</p>
                        <Link to="/services/house-call" className="card-link">Try Out This Service</Link>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Services;