import React from 'react';

const Profile = ({ user }) => {
    return (
        <div className="row">
            <div className="col-md-6 col-sm-12">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-capitalize">Surname: {user.surname}</li>
                    <li className="list-group-item text-capitalize">Forenames: {user.forenames}</li>
                    <li className="list-group-item">Account Type: {user.accountType}</li>
                    <li className="list-group-item text-capitalize">Gender: {user.profession.toString()}</li>
                    <li className="list-group-item text-capitalize">Age: {user.profession.toString()}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">Phone: {user.phone}</li>
                    <li className="list-group-item">Address: {user.address}</li>
                </ul>
            </div>
            <div className="col-md-6 col-sm-12">
                
            </div>
        </div>
    )
}

export default Profile;