import React, { useEffect, useState } from 'react';
import { getTelemedRegistration, registerTelemed } from '../../../../functions/telemedicineFunctions';
import { resumeService, suspendService, updateServiceHours } from '../../../../functions/professionalFunctions';
import Loader from '../../../shared/Loader';
import SetDaysAndHours, { getDaysAndHours } from '../../../shared/setDaysAndHours';

const TelemedicineProvider = ({user}) => {
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [registration, setRegistration] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'everyday'];

    useEffect(() => {
        checkRegistration();
    }, [])

    const checkRegistration = async () => {
        try {
            let reg = await getTelemedRegistration(user.token)
            setRegistration(reg);
            setRegistered(true);
            setLoading(false)
        } catch (error) {
            if (error === 'unregistered') {
                setRegistered(false);
                setLoading(false);
            } else {
                alert("Cannot open page: " + error)
            }
        }
    }

    const [state, setState] = useState({
        monday: {
            checked: false,
            hours: {start: '', end: ''}
        },
        tuesday: {
            checked: false,
            hours: {start: '', end: ''}
        },
        wednesday: {
            checked: false,
            hours: {start: '', end: ''}
        },
        thursday: {
            checked: false,
            hours: {start: '', end: ''}
        },
        friday: {
            checked: false,
            hours: {start: '', end: ''}
        },
        saturday: {
            checked: false,
            hours: {start: '', end: ''}
        },
        sunday: {
            checked: false,
            hours: {start: '', end: ''}            
        },
        everyday: {
            checked: false,
            hours: {start: '', end: ''}            
        },
        sameHours: {
            checked: false,
            hours: {start: '', end: ''}            
        }
    })
    const [medium, setMedium] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();

        let hours = getDaysAndHours(state);

        if (!hours) return;

        if (medium === '') {
            alert("Please provide at least one platform");
            return;
        }

        let platforms = `{"platforms": "${medium.toLowerCase()}"}`

        try {
            let reg = await registerTelemed(user.token, {hours, platforms});
            setRegistration(reg);
            setRegistered(true);
        } catch (error) {
            alert("Failed to register: " + error)
        }
    }

    //saving changes
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const saveChanges = async () => {
        let hours = getDaysAndHours(state);

        if (!hours) return;

        if (medium === '') {
            alert("Please provide at least one platform");
            return;
        }

        let platforms = `{"platforms": "${medium.toLowerCase()}"}`

        try {
            setDisableSaveButton(true);
            await updateServiceHours(user.token, "telemedicine", {hours, platforms});
            checkRegistration();
        } catch (error) {
            alert("Failed to update: " + error)
        } finally {
            setEditMode(false);
            setDisableSaveButton(false);
        }
    }

    //toggle service suspension
    const [disableToggleButton, setDisableToggleButton] = useState(false);
    const toggleSuspension = async () => {
        try {
            setDisableToggleButton(true);
            if (registration.suspended) {
                await resumeService(user.token, "telemedicine")
            } else {
                await suspendService(user.token, "telemedicine")
            } 
            checkRegistration();
        } catch (error) {
            alert("Action Failed: " + error)
        } finally {
            setDisableToggleButton(false);
        }
    }

    if (loading) {
        return <Loader />
    } else if (registered) {
        return (
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h3>Telemedicine service information</h3>
                    <p>You are registered for telemedicine. We will contact you via your provided contacts for assignment of clients
                        within your scope and terms of engagement. More information will be communicated here and/or by other convenient means.
                    </p>
                    {
                        registration.suspended ?
                            <p className="font-weight-bold text-danger">You have voluntarily suspended this service! Click on "resume service" to lift the suspension.</p>
                            : <span />
                    }
                    <h3>Terms</h3>
                    <p className="text-capitalize"><b>Platforms: </b>{JSON.parse(registration.platforms).platforms}</p>
                    <h5>Days</h5>
                    {
                        days.map((day) => {
                            if (JSON.parse(registration.hours)[day]) {
                                return (
                                    <p key={day} className="text-capitalize"><b>{day}: </b>{JSON.parse(registration.hours)[day].start} hours to {JSON.parse(registration.hours)[day].end} hours</p>
                                )
                            }
                        })
                    }
                    <h5>Actions</h5>
                    <div className="d-flex justify-content-center my-1">
                        <button disabled={disableToggleButton} onClick={toggleSuspension} className="btn btn-success">
                            {
                                registration.suspended ? "Resume service" : "Suspend service"
                            }
                        </button>
                    </div>
                    <div className="d-flex justify-content-center my-1">
                        <button onClick={() => setEditMode(true)} className="btn btn-success">Change hours</button>
                    </div>
                    {
                        editMode ?
                            <div className="py-3 px-3 my-4 border border-primary rounded">
                                <p>Would you like to change the above information?</p>
                                <p>Which days and hours are you available?</p>
                                <SetDaysAndHours state={state} setState={setState} />

                                <p className="pt-4">Which platforms do you prefer?</p>
                                <p>If more than one put a comma separated list e.g Whatsapp, Skype</p>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-default">platforms</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setMedium(e.target.value)} value={medium} />
                                </div>
                                <div>
                                    <button onClick={() => setEditMode(false)} className="btn btn-danger float-right">Cancel</button>
                                    <button disabled={disableSaveButton} onClick={saveChanges} className="btn btn-success float-right mr-3">Save</button>
                                </div>
                                <p>Save or cancel changes:</p>
                            </div>
                        : <span />
                    } 
                </div>
                <div className="col-md-6 col-sm-12">
                    <h3>Service History</h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row justify-content-center text-muted">
                <div className="col-md-6 col-sm-12 py-2">
                    <h4>Telemedicine service</h4>
                    <p>
                        You can register for telemedicine by filling in the form below which informs us on
                        which platform and what time you are available. This helps us to connect the right professional
                        to the right client at the right time.
                    </p>
                    <form onSubmit={submitHandler}>
                        <h3>Telemedicine registration form</h3>
                        <div>
                            <p>Which days and hours are you available?</p>
                            <SetDaysAndHours state={state} setState={setState} />
                            
                            <p className="pt-4">Which platforms do you prefer?</p>
                            <p>If more than one put a comma separated list e.g Whatsapp, Skype</p>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">platforms</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setMedium(e.target.value)} value={medium} />
                            </div>
                            
                            <div className="text-center">
                                <input className="btn btn-info" type="submit" value="Sign Me Up" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }  
}

export default TelemedicineProvider;