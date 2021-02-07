import React, { useContext } from 'react';
import { UserContext } from '../../../context/user/userContext';
import DashHeader from '../../dashboard/dashHeader';
import HouseCallClient from './houseCallService/houseCallClient';
import HouseCallProvider from './houseCallService/houseCallProvider';
import UnimplementedService from './unimplementedService';
import { useHistory } from 'react-router-dom';
import TelemedicineProvider from './telemedicineService/telemedicineProvider';
import TelemedicineClient from './telemedicineService/telemedicineClient';
import LocumWorker from './locumsService/locumWorker';

const ServicesRoot = (props) => {
    const user = useContext(UserContext);
    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    let serviceId = props.match.params.serviceId;

    //select a service based on url extension /services/:extension
    let service = null;
    switch(serviceId) {
        case 'house-call':
            if ( user.account_type === 'CLIENT') service = <HouseCallClient user={user} />
            else service = <HouseCallProvider user={user} />;
            break;
        case 'telemedicine':
            if (user.account_type === 'CLIENT') service = <TelemedicineClient user={user} />
            else service = <TelemedicineProvider user={user} />;
            break;
        case 'locums':
            if (user.account_type === 'PROFESSIONAL') service = <LocumWorker user={user} />
            else service = <UnimplementedService />
            break;
        default:
            service = <UnimplementedService />
    }

    return (
        <div>
            <DashHeader user={user} />
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