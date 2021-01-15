import React, { useState } from 'react';
import moment from 'moment';
import { updateUserField } from '../../functions/publicFunctions';
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
        gender: {
            editMode: false,
            input: user.gender ? user.gender : 'MALE'
        },
        birthday: {
            editMode: false,
            input: user.birthday ? moment(user.birthday).format("YYYY[-]MM[-]DD") : moment().format("YYYY[-]MM[-]DD")
        },
        phone: {
            editMode: false,
            input: user.phone ? user.phone : ''
        },
        address: {
            editMode: false,
            input: user.address ? user.address : ''
        }
    })
    
    const [loading, setLoading] = useState(false);

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
            case 'gender':
                value = state.gender.input;
                if (value.length === 0) {
                    alert("Please select gender!");
                } else if (value.localeCompare(user.gender) === 0) {
                    alert("There are no changes to gender!");
                } else {
                    updateChanges('gender', value);
                    exitEditMode('gender');
                }
                break;
            case 'birthday':
                value = state.birthday.input;
                if (!value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
                    alert("Invalid date format. User this format: yyyy-mm-dd")
                } else if (value.localeCompare(moment(user.birthday).format("YYYY[-]MM[-]DD")) === 0) {
                    alert("There are no changes to date of birth!");
                } else if (new Date(value).getTime() >= new Date().getTime()) {
                    alert("Invalid DOB. Date of birth cannot be in the future");
                } else if (moment().diff(value, 'years') < 16) {
                    alert("Your age is below accepted age. (Accepted age is 16 and above)")
                } else {
                    updateChanges('birthday', value);
                    exitEditMode('birthday');
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
                    <li className="list-group-item text-capitalize ">
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
                    <li className="list-group-item text-capitalize">
                        {
                            state.gender.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit gender</label>
                                    <label htmlFor="gender"></label>
                                    <select className="form-control" id="gender" onChange={handleChange} value={state.gender.input}>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <button onClick={() => exitEditMode('gender')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('gender')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>
                                {
                                    user.identity_verified? 
                                        <span /> : 
                                        <span onClick={() => setEditMode('gender')} className="float-right btn btn-primary">edit</span>
                                }
                                Gender: {user.gender && user.gender}
                            </span>
                        }   
                    </li>
                    <li className="list-group-item text-capitalize">
                        {
                            state.birthday.editMode ?
                            <span>
                                <div className="form-group">
                                    <label>Edit Date of Birth</label>
                                    <label htmlFor="birthday"></label>
                                    <input className="form-control" type='date' id='birthday' onChange={handleChange} value={state.birthday.input} />
                                </div>
                                <button onClick={() => exitEditMode('birthday')} className="float-right btn btn-danger">cancel</button>
                                <button onClick={() => saveChanges('birthday')} className="float-right btn btn-primary mr-2">save</button>
                            </span>
                            :
                            <span>
                                {
                                    user.identity_verified? 
                                        <span /> : 
                                        <span onClick={() => setEditMode('birthday')} className="float-right btn btn-primary">edit</span>
                                }
                                DOB: {user.birthday && new Date(user.birthday).toDateString()}
                            </span>
                        }
                    </li>
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
                </ul>
            </div>
        </div>
    )
}

export default Profile;