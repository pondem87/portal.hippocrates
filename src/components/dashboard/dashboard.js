import React, { useContext } from 'react';
import PublicHome from './public';
import Professional from './professional';
import Corporate from './corporate';
import { UserContext } from '../../context/user/userContext';

const Dashboard = () => {
    const { _doc, token, dispatch } = useContext(UserContext);

    let content = null;

    switch (_doc.accountType) {
        case 'CLIENT':
            content = <PublicHome user={_doc} token={token} dispatch={dispatch} />
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