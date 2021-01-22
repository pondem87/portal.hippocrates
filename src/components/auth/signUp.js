import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';
import { signupFunc } from '../../functions/auth';
import Loader from '../shared/Loader';

const SignUp = () => {
    const { dispatch } = useContext(UserContext);
    const [state, setState] = useState({
        error: null,
        email: '',
        forenames: '',
        surname: '',
        accountType: 'CLIENT',
        password: '',
        repeatpassword: ''
    })
    const [isLoading, setLoader] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (state.error) setLoader(false);
    }, [state.error])

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.password === state.repeatpassword) {
            signupFunc(dispatch, setState, done, {
                email: state.email,
                forenames: state.forenames,
                surname: state.surname,
                accountType: state.accountType,
                password: state.password
            });
            setState({
                error: null,
                email: '',
                forenames: '',
                surname: '',
                accountType: 'CLIENT',
                password: '',
                repeatpassword: ''
            })
            setLoader(true)
        } else {
            setState(prevState => ({
                ...prevState,
                error: 'Passwords do not match'
            }))
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
                        <h4>Create your account</h4>
                    </div>
                    <form onSubmit={handleSubmit} className="border border-info rounded py-2 px-5">
                        <p className="error-message">{state.error && state.error}</p>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type='email' id='email' onChange={handleChange} value={state.email} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="forenames">Forenames</label>
                            <input className="form-control" type='text' id='forenames' onChange={handleChange} value={state.forenames} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input className="form-control" type='text' id='surname' onChange={handleChange} value={state.surname} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="accountType">Account Type</label>
                            <select className="form-control" id="accountType" onChange={handleChange} value={state.accountType}>
                                <option value="CLIENT">Client</option>
                                <option value="PROFESSIONAL">Health Professional</option>
                                <option value="REPRESENTATIVE" disabled={true}>Company Representative</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <label htmlFor="password"></label>
                            <input className="form-control" type='password' id='password' minLength={8} onChange={handleChange} value={state.password} required />
                        </div>
                        <div className="form-group">
                            <label>Repeat password</label>
                            <label htmlFor="repeatpassword"></label>
                            <input className="form-control" type='password' id='repeatpassword' minLength={8} onChange={handleChange} value={state.repeatpassword} required />
                        </div>
                        <div className="text-center">
                            <input type='submit' className="btn btn-primary" value="Create Account" />
                        </div>
                    </form>
                    <div className="my-2 text-center">
                        <p><Link to="/">Sign In</Link></p>
                    </div>
                </div>
            </div>
        )
}

export default SignUp;