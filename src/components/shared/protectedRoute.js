import React from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../context/user/userContext';
import Verify from '../auth/verify';

class ProtectedRoute extends React.Component {
    static contextType = UserContext;
    render() {
        const { component, computedMatch, location, path } = this.props;
        const Component = component;
        const { signedIn, account_verified } = this.context
        const isAuthenticated = signedIn;
        const isVerified = account_verified;

        let passedOnProps = {
            match: computedMatch,
            location,
            path
        }
       
        return isAuthenticated && isVerified ? (
            <Component { ...passedOnProps } />
        ) : (
            isAuthenticated && !isVerified ? <Verify /> : <Redirect to='/signin' />
        );
    }
}

export default ProtectedRoute;