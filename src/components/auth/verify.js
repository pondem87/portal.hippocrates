import React, { useState, useContext, useEffect } from 'react';
import Loader from '../shared/Loader';
import { UserContext } from '../../context/user/userContext';
import { VerifyAccount } from '../../functions/auth';
import { useHistory } from 'react-router-dom';
import axios from '../../functions/axios';
import { URL } from '../../variables';

const Verify = () => {
        const user = useContext(UserContext);
        const [state, setState] = useState({ error: null, token: ''});
        const [isLoading, setLoder] = useState();
        const history = useHistory();
        const [disableButton, setDisableButton] = useState(false);

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
            VerifyAccount(user.dispatch, setState, done, {token: state.token});
            setState({ error: null, token: ''});
            setLoder(true);
        }

        const done = () => {
            history.push('/');
        }

        const resendVerification = () => {
            const config = {
                headers: {
                    'authorization': 'bearer ' + user.token
                }
            }
            
            setDisableButton(true);

            axios.post(`${URL}/auth/resendverification`, {}, config)
                .then((res) => {
                    if (res.data.success) {
                        alert(res.data.success.message);
                    } else if (res.data.error) {
                        alert(res.data.error.message);
                    }
                })
                .catch(error => {
                    alert("Network Error");
                })
                .finally(() => {
                    setDisableButton(false)
                })
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
                    <div className="text-center">
                        <p className="text-center">Did not receive code in your email inbox? Try sending again.</p>
                        <button disabled={disableButton} onClick={resendVerification} className="btn btn-primary">send code to email</button>
                    </div>
                </div>
            </div>
        )

}

export default Verify;