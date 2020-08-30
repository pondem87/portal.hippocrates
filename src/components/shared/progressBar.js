import React from 'react';

const ProgressBar = ({percent}) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: percent + '%' }} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )
}

export default ProgressBar;