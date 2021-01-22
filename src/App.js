import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainHeader from './components/shared/mainHeader';
import { UserContext } from './context/user/userContext';
import { updateUserState } from './functions/auth';
import Loader from './components/shared/Loader';
import MainFooter from './components/shared/mainFooter';
import ProtectedRoute from './components/shared/protectedRoute';

//routes
import SignUp from './components/auth/signUp';
import Forgot from './components/auth/forgot';
import SignIn from './components/auth/signIn';
import Verify from './components/auth/verify';
import Dashboard from './components/dashboard/dashboard';
import ServicesRoot from './components/services/serviceComponents/servicesRoot';

function App() {
  const { dispatch } = useContext(UserContext);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    console.log('Checking user state');
    updateUserState(dispatch, setLoader);
  }, [])

  return (
    isLoading ? <Loader /> :
    <div>
        <MainHeader />
        <BrowserRouter>
          <div className="container full-height">
            <Switch>
              <ProtectedRoute exact path='/' component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/signin" component={SignIn} />
              <ProtectedRoute path="/verify" component={Verify} />
              <ProtectedRoute path="/services/:serviceId" component={ServicesRoot} />
              <ProtectedRoute component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
        <MainFooter />
    </div>
  );
}

export default App;
