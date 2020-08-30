import React from 'react';

const Profile = ({ user }) => {
    return (
        <div className="row">
            <div className="col-md-6 col-sm-12">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-capitalize">Surname: {user.surname}</li>
                    <li className="list-group-item text-capitalize">Forenames: {user.forenames}</li>
                    <li className="list-group-item">Account Type: {user.accountType}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">Phone: {user.phone}</li>
                    <li className="list-group-item">Address: {user.address}</li>
                    <li className="list-group-item text-capitalize">Profession: {user.profession.toString()}</li>
                </ul>
            </div>
            <div className="col-md-6 col-sm-12">
                <h4>Verified Certificates</h4>
                <div className="list-group">
                    {
                        user.certification && user.certification.map((certificate) => {
                            return (
                                <div key={certificate._id} className="list-group-item list-group-item-action flex-column align-items-start active">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{certificate.certification}</h5>
                                        <small>{certificate.identifyingNumber}</small>
                                    </div>
                                    <p className="mb-1">Issued by {certificate.certifyingBody} on {certificate.date}</p>
                                </div>
                            )
                        })
                    }
                </div>
                { user.certification && user.certification.length !== 0 ? <span /> :
                    <p>Certificates that you have uploaded and have passed verification will be listed in this section. Only qualified personnel will be able to subscribe to services provided by Hippocrates Health Alliance.</p>}
            </div>
        </div>
    )
}

export default Profile;