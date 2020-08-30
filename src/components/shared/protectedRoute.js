import React from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../context/user/userContext';
import Verify from '../auth/verify';

class ProtectedRoute extends React.Component {
    static contextType = UserContext;
    render() {
        const { component, computedMatch, location, path } = this.props;
        const Component = component;
        console.log('comp render:', this.context);
        const isAuthenticated = this.context.signedIn;
        const isVerified = this.context._doc && this.context._doc.verification.accountVerified;

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