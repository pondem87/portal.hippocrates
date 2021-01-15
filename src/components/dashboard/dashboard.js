import React, { useContext } from 'react';
import PublicHome from './public';
import Professional from './professional';
import Corporate from './corporate';
import { UserContext } from '../../context/user/userContext';

const Dashboard = () => {
    const user = useContext(UserContext);

    let content = null;

    switch (user.account_type) {
        case 'CLIENT':
            content = <PublicHome user={user} />
            break;
        case 'PROFESSIONAL':
            content = <Professional />
            break;
        case 'REPRESENTATIVE':
            content = <Corporate />
            break;
        default:
            content = <p>Cannot access 'Dashboard'</p>
    }
    
    return content;
}

export default Dashboard;