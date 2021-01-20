import React, { useEffect, useState } from 'react';
import { updateUserField } from '../../functions/publicFunctions';
import { getCertificatesFunction } from '../../functions/professionalFunctions';
import Loader from '../shared/Loader';

const Profile = ({ user }) => {
    const [state, setState] = useState({
        surname: {
            editMode: false,
            input: user.surname
        },
        forenames: {
            editMode: false,
            input: user.forenames
        },
        phone: {
            editMode: false,
            input: user.phone ? user.phone : ''
        },
        address: {
            editMode: false,
            input: user.address ? user.address : ''
        },
        profession: {
            editMode: false,
            input: user.profession ? user.profession : ''
        }
    })
    
    const [loading, setLoading] = useState(false);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        getCertificates();
    }, [])

    const getCertificates = async () => {
        try {
            let certs = await getCertificatesFunction(user.token);
            setCertificates(certs);
        } catch (error) {
            alert("Failed to load certificates list: " + error)
        }
    }

    const setEditMode = (field) => {
        setState(prev => ({
            ...prev,
            [field]: { editMode: true, input: prev[field].input }
        }))
    }

    const exitEditMode = (field) => {
        setState(prev => ({
            ...prev,
            [field]: { editMode: false, input: prev[field].input }
        }))
    }

    const saveChanges = (field) => {
        console.log(`save changes on "${field}" field`)

        let value = '';

        switch(field) {
            case 'surname':
                value = state.surname.input;
                if (value.length === 0) {
                    alert("Surname cannot be blank!");
                } else if (!value.match(/^[a-zA-Z]+-?[a-zA-Z]+$/)) {
                    alert("There are illegal characters in surname")
                } else if (value.localeCompare(user.surname) === 0) {
                    alert("There are no changes to surname!");
                } else {
                    updateChanges('surname', value);
                    exitEditMode('surname');
                }
                break;
            case 'forenames':
                value = state.forenames.input;
                if (value.length === 0) {
                    alert("Names cannot be blank!");
                } else if (!value.match(/^[a-zA-Z]+[a-zA-Z\s-]*[a-zA-Z]+$/)) {
                    alert("There are illegal characters in names")
                } else if (value.localeCompare(user.forenames) === 0) {
                    alert("There are no changes to names!");
                } else {
                    updateChanges('forenames', value);
                    exitEditMode('forenames');
                }
                break;
            case 'phone':
                value = state.phone.input;
                if (!value.match(/^\+?[0-9][0-9\s]+[0-9]$/)) {
                    alert("Invalid phone number");
                } else if (value.localeCompare(user.phone) === 0) {
                    alert("There are no changes to phone number!");
                } else {
                    updateChanges('phone', value);
                    exitEditMode('phone');
                }
                break;
            case 'address':
                value = state.address.input;
                if (value.length === 0) {
                    alert("Address field is empty!")
                } else if (value.localeCompare(user.address) === 0) {
                    alert("There are no changes to address")
                } else {
                    updateChanges('address', value);
                    exitEditMode('address');
                }
                break;
            case 'profession':
                value = state.profession.input;
                if (value.length === 0) {
                    alert("Profession cannot be blank!");
                } else if (!value.match(/^[a-zA-Z(]+[a-zA-Z\s-,()]*[a-zA-Z)]+$/)) {
                    alert("There are illegal characters in profession")
                } else if (value.localeCompare(user.profession) === 0) {
                    alert("There are no changes to profession!");
                } else {
                    updateChanges('profession', value);
                    exitEditMode('profession');
                }
            default:
        }
    }

    const updateChanges = async (field, value) => {
        try {
            setLoading(true);
            const result = await updateUserField(user.token, field, value);
            user.dispatch({
                type: 'UPDATE-USER',
                data: result
            })
        } catch (errMsg) {
            alert(errMsg);
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        setState(prev => ({
            ...prev,
            [id]: {
                editMode: true,
                input: value
            }
        }))
    }

    if (loading) return <Loader />;

    return (
        <div className="row">
            <div className="col-md-6 col-sm-12">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-capitalize">
                        {
                            state.surname.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit surname</label>
                                    <label htmlFor="surname"></label>
                                    <input className="form-control" type='text' id='surname' onChange={handleChange} value={state.surname.input} />
                                </div>
                                <button onClick={() => exitEditMode('surname')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('surname')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>
                                {
                                    user.identity_verified? 
                                        <span /> : 
                                        <span onClick={() => setEditMode('surname')} className="float-right btn btn-primary">edit</span>
                                }
                                Surname: {user.surname}
                            </span>
                        }
                    </li>
                    <li className="list-group-item text-capitalize">
                        {
                            state.forenames.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit first names</label>
                                    <label htmlFor="forenames"></label>
                                    <input className="form-control" type='text' id='forenames' onChange={handleChange} value={state.forenames.input} />
                                </div>
                                <button onClick={() => exitEditMode('forenames')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('forenames')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>
                                {
                                    user.identity_verified? 
                                        <span /> : 
                                        <span onClick={() => setEditMode('forenames')} className="float-right btn btn-primary">edit</span>
                                }
                                Forenames: {user.forenames}
                            </span>
                        }
                    </li>
                    <li className="list-group-item">Account Type: {user.account_type}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">
                        {
                            state.phone.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit Phone Number</label>
                                    <label htmlFor="phone"></label>
                                    <input className="form-control" type='text' id='phone' onChange={handleChange} value={state.phone.input} />
                                </div>
                                <button onClick={() => exitEditMode('phone')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('phone')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>     
                                <span onClick={() => setEditMode('phone')} className="float-right btn btn-primary">edit</span>
                                Phone: {user.phone && user.phone}
                            </span>
                        }
                    </li>
                    <li className="list-group-item">
                        {
                            state.address.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit Address</label>
                                    <label htmlFor="address"></label>
                                    <input className="form-control" type='text' id='address' onChange={handleChange} value={state.address.input} />
                                </div>
                                <button onClick={() => exitEditMode('address')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('address')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>     
                                <span onClick={() => setEditMode('address')} className="float-right btn btn-primary">edit</span>
                                Address: {user.address && user.address}
                            </span>
                        }
                    </li>
                    <li className="list-group-item text-capitalize">
                    {
                            state.profession.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit Profession</label>
                                    <label htmlFor="profession"></label>
                                    <input className="form-control" type='text' id='profession' onChange={handleChange} value={state.profession.input} />
                                </div>
                                <button onClick={() => exitEditMode('profession')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('profession')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>     
                                {
                                    user.profession_verified? 
                                        <span /> : 
                                        <span onClick={() => setEditMode('profession')} className="float-right btn btn-primary">edit</span>
                                }
                                Profession: {user.profession && user.profession}
                            </span>
                        }
                    </li>
                </ul>
            </div>
            <div className="col-md-6 col-sm-12">
                <h4>Verified Certificates</h4>
                <div className="list-group">
                    {
                        certificates && certificates.map((certificate) => {
                            return (
                                <div key={certificate.idcertificates} className="list-group-item list-group-item-action flex-column align-items-start active">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{certificate.certification}</h5>
                                        <small>{certificate.certificate_num}</small>
                                    </div>
                                    <p className="mb-1">Issued by {certificate.certifying_body} on {new Date(certificate.issue_date).toDateString()}</p>
                                </div>
                            )
                        })
                    }
                </div>
                { certificates && certificates.length > 0 ? <span /> :
                    <p>Certificates that you have uploaded and have passed verification will be listed in this section. Only qualified personnel will be able to subscribe to services provided by Hippocrates Health Alliance.</p>}
            </div>
        </div>
    )
}

export default Profile;