import React from 'react';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const SetDaysAndHours = ({state, setState}) => {
    const handleCheckbox = (e) => {
        let id = e.target.id;
        let value = e.target.checked;
        setState(prev => ({
            ...prev,
            [id]: {
                checked: value,
                hours: prev[id].hours
            }
        }))
    }

    const handleSetTime = (e, variable, position) => {

        let time = e.target.value;

        setState(prev => ({
            ...prev,
            [variable]: {
                checked: prev[variable].checked,
                hours: {
                    start: position === 'start' ? time : prev[variable].hours.start,
                    end: position === 'end' ? time : prev[variable].hours.end
                }
            }
        }))
    }

    return (
        <div>
            <div className="form-group form-check mb-0 pb-0">
                <input type="checkbox" className="form-check-input" id="everyday" onChange={handleCheckbox} checked={state.everyday.checked} />
                <label className="form-check-label" htmlFor="monday">everyday</label>
            </div>
            {
                state.everyday.checked ?
                    <div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Available between (time):</span>
                            </div>
                            <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "everyday", "start")} value={state.everyday.hours.start} />
                            <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "everyday", "end")} value={state.everyday.hours.end} />
                        </div>
                    </div>
                    :
                    <div>
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="monday" onChange={handleCheckbox} checked={state.monday.checked} />
                            <label className="form-check-label" htmlFor="monday">Monday</label>
                        </div>
                        {
                            state.monday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "monday", "start")} value={state.monday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "monday", "end")} value={state.monday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="tuesday" onChange={handleCheckbox} checked={state.tuesday.checked} />
                            <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                        </div>
                        {
                            state.tuesday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "tuesday", "start")} value={state.tuesday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "tuesday", "end")} value={state.tuesday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="wednesday" onChange={handleCheckbox} checked={state.wednesday.checked} />
                            <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                        </div>
                        {
                            state.wednesday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "wednesday", "start")} value={state.wednesday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "wednesday", "end")} value={state.wednesday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="thursday" onChange={handleCheckbox} checked={state.thursday.checked} />
                            <label className="form-check-label" htmlFor="thursday">Thursday</label>
                        </div>
                        {
                            state.thursday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "thursday", "start")} value={state.thursday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "thursday", "end")} value={state.thursday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="friday" onChange={handleCheckbox} checked={state.friday.checked} />
                            <label className="form-check-label" htmlFor="friday">Friday</label>
                        </div>
                        {
                            state.friday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "friday", "start")} value={state.friday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "friday", "end")} value={state.friday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="saturday" onChange={handleCheckbox} checked={state.saturday.checked} />
                            <label className="form-check-label" htmlFor="saturday">Saturday</label>
                        </div>
                        {
                            state.saturday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "saturday", "start")} value={state.saturday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "saturday", "end")} value={state.saturday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="sunday" onChange={handleCheckbox} checked={state.sunday.checked} />
                            <label className="form-check-label" htmlFor="saturday">Sunday</label>
                        </div>
                        {
                            state.sunday.checked && !state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "sunday", "start")} value={state.sunday.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "sunday", "end")} value={state.sunday.hours.end} />
                                </div>
                                :
                                <span />
                        }
                        <div className="form-group form-check mb-0 pb-0">
                            <input type="checkbox" className="form-check-input" id="sameHours" onChange={handleCheckbox} checked={state.sameHours.checked} />
                            <label className="form-check-label" htmlFor="sameHours">Same hours on all days</label>
                        </div>
                        {
                            state.sameHours.checked ?
                                <div className="input-group pb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Available between (time):</span>
                                    </div>
                                    <input type="time" aria-label="First name" className="form-control" onChange={(e) => handleSetTime(e, "sameHours", "start")} value={state.sameHours.hours.start} />
                                    <input type="time" aria-label="Last name" className="form-control" onChange={(e) => handleSetTime(e, "sameHours", "end")} value={state.sameHours.hours.end} />
                                </div>
                                :
                                <span />
                        }
                    </div>
            }
        </div>
    )
}

export const getDaysAndHours = (state) => {
    let hours = [];

    if (state.everyday.checked) {
        if (state.everyday.hours.start === '' || state.everyday.hours.end === '') {
            alert("Please indicate during which time you will be available");
            return null;
        }
        hours.push(`"everyday": {"start" : "${state.everyday.hours.start}", "end" : "${state.everyday.hours.end}"}`)
    } else if (state.sameHours.checked) {
        if (state.monday.checked || state.tuesday.checked || state.wednesday.checked || state.thursday.checked || state.friday.checked || state.saturday.checked || state.sunday.checked) {
            if (state.sameHours.hours.start === '' || state.sameHours.hours.end === '') {
                alert(`Please indicate during which time you will be available`);
                return null;
            }

            for (const day of days) {                    
                if (state[day].checked) hours.push(`"${day}": {"start" : "${state.sameHours.hours.start}", "end" : "${state.sameHours.hours.end}"}`);
            }

        } else {
            alert("You should be available for at least one day in a week.");
            return null;
        }
    } else {
        if (state.monday.checked || state.tuesday.checked || state.wednesday.checked || state.thursday.checked || state.friday.checked || state.saturday.checked || state.sunday.checked) {
            for (const day of days) {
                if (state[day].checked) {
                    if (state[day].hours.start === '' || state[day].hours.end === '') {
                        alert(`Please indicate during which time you will be available on ${day}`);
                        return null;
                    }
                    hours.push(`"${day}": {"start" : "${state[day].hours.start}", "end" : "${state[day].hours.end}"}`);
                }
            }
        } else {
            alert("You should be available for at least one day in a week.");
            return null;
        }
    }

    return hours;
}

export default SetDaysAndHours