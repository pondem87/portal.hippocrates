import React, { useEffect, useState } from 'react';
import { getLocumRegistration, registerLocum } from '../../../../functions/locumWorkerFunctions';
import { resumeService, suspendService, updateServiceHours } from '../../../../functions/professionalFunctions';
import Loader from '../../../shared/Loader';
import SetDaysAndHours, {getDaysAndHours} from '../../../shared/setDaysAndHours';

const LocumWorker = ({user}) => {
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState(false);
    const [registration, setRegistration] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'everyday'];

    useEffect(() => {
        checkRegistration();
    }, [])

    const checkRegistration = async () => {
        try {
            let reg = await getLocumRegistration(user.token)
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
    const [city, setCity] = useState('');
    const [suburbs, setSuburbs] = useState('');
    

    const submitHandler = async (e) => {
        e.preventDefault();

        let hours = getDaysAndHours(state);

        if (!hours) return;

        let catchment = '';

        if (city === '') {
            alert("Please provide a city");
            return;
        }

        catchment = `{"city": "${city}", "areas": "${suburbs}"}`

        try {
            let reg = await registerLocum(user.token, {hours, catchment});
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

        let catchment = '';

        if (city === '') {
            alert("Please provide a city");
            return;
        }

        catchment = `{"city": "${city}", "areas": "${suburbs}"}`

        try {
            setDisableSaveButton(true);
            await updateServiceHours(user.token, "locum", {hours, catchment});
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
                await resumeService(user.token, "locum")
            } else {
                await suspendService(user.token, "locum")
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
                    <h3>Locum information</h3>
                    <p>You are registered for locums. We will contact you via your provided contacts for assignment according to the
                        information you provided. More information will be communicated here and/or by other convenient means.
                    </p>
                    {
                        registration.suspended ?
                            <p className="font-weight-bold text-danger">You have voluntarily suspended this service! Click on "resume service" to lift the suspension.</p>
                            : <span />
                    }
                    <h3>Terms</h3>
                    <p className="text-capitalize"><b>City/Town: </b>{JSON.parse(registration.catchment).city}</p>
                    <p className="text-capitalize"><b>Areas: </b>{JSON.parse(registration.catchment).areas}</p>
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

                                <p className="pt-4">Which locations can you cover?</p>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-default">City/Town</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setCity(e.target.value)} value={city} />
                                </div>
                                <p className="mt-3">If more than one area put a comma to seperate the listed areas e.g Budiriro, Avondale, Mbare</p>
                                <div className="input-group mb-3 mt-0 pt-0">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-default">Suburbs/Areas</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setSuburbs(e.target.value)} value={suburbs} />
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
                    <h3>Locums</h3>
                    <p>
                        You can register for locums by filling in the form below which informs us on
                        when and where you are available for locums.
                    </p>
                    <form onSubmit={submitHandler}>
                        <h4>Locum registration form</h4>
                        <div>
                            <p>Which days and hours are you available?</p>
                            <SetDaysAndHours state={state} setState={setState} />
                            
                            <p className="pt-4">Which locations can you cover?</p>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">City/Town</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setCity(e.target.value)} value={city} />
                            </div>
                            <p className="mt-3">If more than one area put a comma to seperate the listed areas e.g Budiriro, Avondale, Mbare</p>
                            <div className="input-group mb-3 mt-0 pt-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Suburbs/Areas</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => setSuburbs(e.target.value)} value={suburbs} />
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

export default LocumWorker;