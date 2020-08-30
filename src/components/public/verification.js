import React, { useState, useEffect } from 'react';
import ProgressBar from '../shared/progressBar';
import { uploadNewFile, deleteUploadFunc } from '../../functions/publicFunctions';

const Verification = ({uploads, token, dispatch}) => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState({error:''})
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);

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
        uploadNewFile(dispatch, setProgress, setError, token, done, data);
        setUploading(true);
    }

    const done = () => {
        setUploading(false);
        setError({error: ''})
    }

    const deleteUpload = (uploadId) => {
        console.log('Delete Upload: ', uploadId);
        deleteUploadFunc(dispatch, token, doneDeleteUpload, uploadId);
    }

    const doneDeleteUpload = (message) => {
        if (message) {
            setUploadError(message);
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-sm-12">
                <h4 className="text-centre">Why verify your identity?</h4>
                <p>It is not compulsory for you to submit identity documents, however it is good for service providers to be assured they are dealing with real and serious people.
                    We therefore recommend that you do so to verify your identity. Hippocrates Health Alliance is a legitimate organisation registered with appropriate authorities 
                    and would like to interact with our clients as such. We hope you will take the step to strengthen our trust.
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
                                        <tr key={upload._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{upload.originalName}</td>
                                            <td>{upload.uploadedOn}</td>
                                            <td>{upload.reviewed ? 'Yes' : 'Not Yet'}</td>
                                            <td>{upload.comments && upload.comments}</td>
                                            <td>
                                                {
                                                    upload.readOnly ? <span className="text-success">Read Only</span> :
                                                    <button onClick={(e) => { deleteUpload(upload._id); e.target.disabled = true} } className="btn btn-danger">Delete</button>
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