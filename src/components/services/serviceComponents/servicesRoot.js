import React, { useContext } from 'react';
import { UserContext } from '../../../context/user/userContext';
import DashHeader from '../../dashboard/dashHeader';
import HouseCallClient from './houseCallService/houseCallClient';
import HouseCallProvider from './houseCallService/houseCallProvider';
import UnimplementedService from './unimplementedService';
import { useHistory } from 'react-router-dom';

const ServicesRoot = (props) => {
    const {_doc, token, dispatch } = useContext(UserContext);
    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    console.log('ServiceRoot props:', props);

    let serviceId = props.match.params.serviceId;

    //select a service based on url extension /services/:extension
    let service = null;
    switch(serviceId) {
        case 'house-call':
            if ( _doc.accountType === 'CLIENT') service = <HouseCallClient user={_doc} token={token} dispatch={dispatch} />
            else service = <HouseCallProvider user={_doc} token={token} dispatch={dispatch} />;
            break;
        default:
            service = <UnimplementedService />
    }

    return (
        <div>
            <DashHeader user={_doc} dispatch={dispatch} />
            <div className="row">
                <div className="col-12 border-bottom border-info">
                    <button onClick={goToHome} className="btn btn-outline-info mt-1 float-right"><i className="fas fa-home mr-1"></i>Go back to dashboard</button>
                    <h2 className="text-muted">Services</h2>
                </div>
            </div>
            {service}
        </div>
    )
}

export default ServicesRoot;