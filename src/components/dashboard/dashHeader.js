import React from 'react';
import dummyIcon from '../../assets/images/user-icon.png'
import { signoutFunc } from '../../functions/auth';

const DashHeader = ({ user }) => {
    const logout = () => {
        signoutFunc(user.dispatch);
    }

    return (
        <div className="row bg-secondary rounded-bottom text-light">
                <div className="col-sm-6">
                    <div className="py-1 px-1 float-left">
                        <img src={dummyIcon} height={75} width={75}  alt='user icon' />
                    </div>
                    <div>
                        <p><span className="font-italic">{user.email}</span><br />
                        <span className="font-weight-bold text-capitalize">{user.surname + ', ' + user.forenames}</span><br />
                        { (user.account_type === 'PROFESSIONAL' || user.account_type === 'REPRESENTATIVE') && user.profession ? user.profession.map((item, index) => {
                            return (
                                <span key={index} className="font-weight-bold text-capitalize">{index > 0 ? ', ' : ''}{item}</span>
                            )
                        }) : <span></span> //display gender and age here for clients
                        }</p>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div>
                        <button onClick={logout} className="float-right my-2 btn btn-outline-light">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                        <p>Identity: { user.identity_verified ? <span className="text-success font-weight-bold"><i className="fas fa-check-circle"></i> Verified</span> : <span className="text-danger font-weight-bold"><i className="fas fa-times-circle"></i> Unverified</span> }<br />
                        { user.accountType === 'PROFESSIONAL' ?
                            <span>Qualifications: {user.profession_verified ? <span className="text-success font-weight-bold"><i className="fas fa-check-circle"></i> Verified</span> : <span className="text-danger font-weight-bold"><i className="fas fa-times-circle"></i> Unverified</span> }</span> :
                            user.accountType === 'REPRESENTATIVE' ?
                                <span>Representative: {user.rep_verified ? <span className="text-success font-weight-bold"><i className="fas fa-check-circle"></i> Verified</span> : <span className="text-danger font-weight-bold"><i className="fas fa-times-circle"></i> Unverified</span> }</span> :
                                <span>Client Account</span>
                        }
                        </p>        
                    </div>
                </div>
        </div>
    )
}

export default DashHeader;