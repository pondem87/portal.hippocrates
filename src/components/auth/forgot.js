import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CheckEmailForReset, ResetPassword } from '../../functions/auth';
import { UserContext } from '../../context/user/userContext';
import Loader from '../shared/Loader';

const Forgot = () => {
    const user = useContext(UserContext);
    const [state, setState] = useState({
        email: null,
        error: null,
        typeemail: '',
        token: '',
        password: '',
        repeatpassword: '',
        gettoken: false
    })
    const [isLoading, setLoader] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setLoader(false)
    }, [state.error, state.email])

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleCheckbox = (e) => {
        let id = e.target.id;
        let value = e.target.checked;
        console.log(`Change event: id: ${id} value: ${value}`);
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.email) {
            if (state.password === state.repeatpassword) {
                ResetPassword(user.dispatch, setState, done, {
                    email: state.email,
                    token: state.token,
                    password: state.password
                });
                setLoader(true);
            } else {
                setState(prevState => ({
                    ...prevState,
                    error: 'Passwords do not match'
                }))
            }
        } else {
            CheckEmailForReset(setState, {email: state.typeemail, gettoken: state.gettoken});
            setLoader(true);
        }
    }

    const done = () => {
        history.push('/');
    }

    return (
        isLoading ? <Loader /> :
        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="py-3 text-center text-muted">
                    <h4>Reset your password</h4>
                </div>
                <form onSubmit={handleSubmit} className="border border-info rounded py-2 px-5">
                    <p className="error-message">{state.error && state.error}</p>
                    {
                        !state.email ?
                            <div>
                                <p>Enter the email used to create account</p>
                                <div className="form-group">
                                    <label htmlFor="username">Email</label>
                                    <input className="form-control" type='email' id='typeemail' onChange={handleChange} value={state.typeemail} required/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="gettoken" onChange={handleCheckbox} checked={state.gettoken} />
                                    <label className="form-check-label" htmlFor="gettoken">Send reset token to my email</label>
                                </div>
                                <div className="text-center">
                                    <input type='submit' className="btn btn-primary" value="Submit" />
                                </div>
                            </div>
                            :
                            <div>
                                <p className="center">{state.email}</p>
                                <div className="form-group">
                                    <label>Reset Token</label>
                                    <label htmlFor="token"></label>
                                    <input className="form-control" type='text' id='token' onChange={handleChange} value={state.token} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <label htmlFor="password"></label>
                                    <input className="form-control" type='password' id='password' minLength={8} onChange={handleChange} value={state.password} required />
                                </div>
                                <div className="form-group">
                                    <label>Repeat password</label>
                                    <label htmlFor="password"></label>
                                    <input className="form-control" type='password' id='repeatpassword' minLength={8} onChange={handleChange} value={state.repeatpassword} required />
                                </div>
                                <div className="text-center">
                                    <input type='submit' className="btn btn-primary" value="Login" />
                                </div>
                            </div>
                    }
                </form>
                <div className="my-2 text-center">
                    <p>If you want to try again, <Link to="/">Sign In</Link> here.</p>
                    <p>Or <Link to="/signup">Sign Up</Link> here.</p>
                </div>
            </div>
        </div>
    )
}

export default Forgot;