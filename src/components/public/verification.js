import React, { useState, useEffect } from 'react';
import ProgressBar from '../shared/progressBar';
import { uploadNewFile, deleteUploadFunc, retriveUploads } from '../../functions/publicFunctions';

const Verification = ({user}) => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState({error:''})
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        refreshUploads();
    }, [])

    const refreshUploads = async() => {
        try {
            let uploadsList = await retriveUploads(user.token);
            setUploads(uploadsList);
        } catch (error) {
            alert("Failed to get uploads list: " + error)
            console.log("Failed to retrieve uploads list")
        }
    }

    useEffect(() => {
        if (error.error !== '') setUploading(false);
    }, [error])

    const changeHandler = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //if there is no file, return
        if (!file) return;
        
        //if there is a file to upload
        let data = new FormData();
        data.append('file', file);
        uploadNewFile(setProgress, setError, user.token, done, data);
        setUploading(true);
    }

    const done = () => {
        refreshUploads();
        setUploading(false);
        setError({error: ''})
    }

    const deleteUpload = async(uploadId) => {
        try {
            let response = await deleteUploadFunc(user.token, uploadId);
        } catch (error) {
            setUploadError(error);
        } finally {
            refreshUploads();
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-sm-12">
                <h4 className="text-centre">Why verify your identity?</h4>
                <p>To verify your identity and age you need to upload one of these documents: ID, passport or driver's licence.
                    To access the full services or any service requiring prescription of medicines we need to verify age and identity.
                    Edit your profile before uploading. You wont be able to modify your profile after verification.
                </p>
                <div className="border border-info rounded py-3 px-4 mb-2">
                    <h5 className="text-centre">Uploaded files</h5>
                    <p className="error-message">{uploadError && uploadError}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Filename</th>
                                <th scope="col">Upload Date</th>
                                <th scope="col">Reviewed</th>
                                <th scope="col">Comments</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                uploads && uploads.map((upload, index) => {
                                    return (
                                        <tr key={upload.iduploads}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{upload.originalname}</td>
                                            <td>{new Date(upload.upload_time).toDateString()}</td>
                                            <td>{upload.reviewed ? 'Yes' : 'Not Yet'}</td>
                                            <td>{upload.comments && upload.comments}</td>
                                            <td>
                                                {
                                                    upload.readonly ? <span className="text-success">Read Only</span> :
                                                    <button onClick={(e) => { deleteUpload(upload.iduploads); e.target.disabled = true} } className="btn btn-danger">Delete</button>
                                                }
                                            </td>
                                        </tr>
                                        
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="border border-info rounded py-3 px-4">
                    <form onSubmit={handleSubmit}>
                        <p className="error-message">{error.error}</p>
                        <input onChange={changeHandler} type="file" accept=".pdf, .jpg, .jpeg" />
                        <div className="py-2 my-2 text-center">
                            { uploading ? <ProgressBar percent={progress} /> : <input className="btn btn-primary" type="submit" value="Upload document" /> }   
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Verification;