import React, { useState, useContext, useEffect } from 'react';
import FileUploads from '../shared/fileUploads';
import { professionalRegistration } from '../../functions/registration';
import { UserContext } from '../../context/user/userContext';
import ProgressBar from '../shared/progressBar';

const ProfessionRegistration = ({user}) => {
    const { token, dispatch } = useContext(UserContext);
    const [files, setFiles] = useState(null);
    const [state, setState] = useState({
        surname: user.surname,
        forenames: user.forenames,
        profession: '',
        phone: '',
        address: ''
    });

    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [errorState, setError] = useState({error: ''});

    useEffect(() => {
        if (errorState.error !== '') setUploading(false);
    }, [errorState])

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const addFile = (e) => {
        let newFiles = files ? [...files, e.target.files[0]] : [e.target.files[0]];
        e.target.value = '';
        setFiles(newFiles);
    };

    const removeFile = (name) => {
        let newFiles = files.filter((file) => {
            return file.name !== name;
        });
        setFiles(newFiles);
    };

    const handleSubmit = (e)  => {
        e.preventDefault();
        let data = new FormData();
        Object.keys(state).forEach((item) => {
            data.append(item, state[item]);
        })

        files.forEach((file) => {
            data.append('files', file);
        })

        setUploading(true);
        professionalRegistration(dispatch, setProgress, setError, data, token);
    }

    return (
        <div className="text-muted">
            <div className="row">
                <div className="col-12">
                    <div className="text-center py-2 px-2">
                        <h4>Upload credentials for verication of your identity and profession</h4>
                        <p className="error-message">{errorState.error}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row border border-info rounded">
                    <div className="col-md-6">
                        <h5 className="my-2">Personal and professional details</h5>
                        <div className="form-group">
                            <label htmlFor="forenames">Forenames</label>
                            <input className="form-control" type='text' id='forenames' onChange={handleChange} value={state.forenames} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input className="form-control" type='text' id='surname' onChange={handleChange} value={state.surname} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profession">Profession</label>
                            <input className="form-control" type='text' id='profession' aria-describedby="profession-help" onChange={handleChange} value={state.profession} required />
                            <small id="profession-help" className="form-text text-muted">You can enter multiple values separated by commas</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input className="form-control" type='text' id='phone' onChange={handleChange} value={state.phone} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Location</label>
                            <input className="form-control" type='text' id='address' onChange={handleChange} value={state.address} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className="my-2">Supporting Documents</h5>
                        <p>To complete verification upload 1 identity document (ID, passport or driver's licence) and valid practicing licences and any additional documents supporting your scope of practice as stipulated by regulatory bodies for your profession.
                            You can submit without documents and then upload documents later.
                        </p>
                        <p>**Accepted file formats: pdf and jpg(jpeg) images<br />**The list of uploads can have more than 1 file. Click on the red 'x' to remove from list.</p>
                        <FileUploads files={files} addFile={addFile} removeFile={removeFile} />
                    </div>
                    <div className="col-12 py-2 my-2 text-center">
                        { uploading ? <ProgressBar percent={progress} /> : <input className="btn btn-primary" type="submit" /> }   
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfessionRegistration;