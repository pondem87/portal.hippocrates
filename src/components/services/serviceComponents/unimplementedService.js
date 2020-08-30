import React from 'react';

const UnimplementedService = (props) => {

    return (
        <div className="row">
            <div className="col-12 text-center">
                <div className="my-3 py-3">
                    <i className="fas fa-exclamation-triangle fa-3x"></i>
                    <h4>Apologies, service not yet implemented...</h4>
                </div>
            </div>
        </div>
    )
}

export default UnimplementedService;