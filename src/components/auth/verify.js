import React, { useState, useContext, useEffect } from 'react';
import Loader from '../shared/Loader';
import { UserContext } from '../../context/user/userContext';
import { VerifyAccount } from '../../functions/auth';
import { useHistory } from 'react-router-dom';

const Verify = () => {
        const { dispatch } = useContext(UserContext);
        const [state, setState] = useState({ error: null, token: ''});
        const [isLoading, setLoder] = useState();
        const history = useHistory();

        useEffect(() => {
            if (state.error) setLoder(false);
        }, [state.error])

        const handleChange = (e) => {
            let id = e.target.id;
            let value = e.target.value;
            setState((...prevState) => ({
                ...prevState,
                [id]: value
            }))
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            VerifyAccount(dispatch, setState, done, {token: state.token});
            setState({ error: null, token: ''});
            setLoder(true);
        }

        const done = () => {
            history.push('/');
        }
        
        return (
            isLoading ? <Loader /> :
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="py-3 text-center">
                        <h4>Verify your email address</h4>
                    </div>
                    <form onSubmit={handleSubmit} className="border border-info rounded py-2 px-5 mb-5">
                        <p className="error-message">{state.error && state.error}</p>
                        <p>Enter the six character code that was sent to your email</p>
                        <div className="form-group">
                            <label htmlFor="username">Verication Code</label>
                            <input className="form-control" type='text' id='token' onChange={handleChange} value={state.token} required/>
                        </div>
                        <div className="text-center">
                            <input type='submit' className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )

}

export default Verify;