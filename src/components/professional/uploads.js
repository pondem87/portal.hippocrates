import React, { useEffect, useState } from 'react';
import FileUploads from '../shared/fileUploads';
import ProgressBar from '../shared/progressBar';
import { uploadNewFiles } from '../../functions/registration';
import { deleteUploadFunc } from '../../functions/publicFunctions';


const Uploads = ({ uploads, token, dispatch }) => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [errorState, setError] = useState({error: ''});
    const [files, setFiles] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (errorState.error !== '') setUploading(false);
    }, [errorState])

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

        files.forEach((file) => {
            data.append('files', file);
        })

        setUploading(true);

        //call uploading function here
        uploadNewFiles(dispatch, setProgress, setError, token, done, data);
    }

    const done = () => {
        setUploading(false);
        setError({error: ''});
        setFiles(null);
    }

    const deleteUpload = (uploadId) => {
        //console.log('Delete Upload: ', uploadId);
        deleteUploadFunc(dispatch, token, doneDeleteUpload, uploadId);
    }

    const doneDeleteUpload = (message) => {
        if (message) {
            setUploadError(message);
        }
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
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
                                                    <button onClick={(e) => { deleteUpload(upload._id); e.target.value='Deleting...'} } className="btn btn-danger">Delete</button>
                                                }
                                            </td>
                                        </tr>
                                        
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 text-center py-4">
                    <h4 className="border-bottom border-info py-1">Upload new documents</h4>
                    <p>Here you can upload any documents needed to verify your identity and profession (practicing licences) or new copies of documents that may have not passed verification for reasons that will be indicated on the comments section of the uploads list above.</p>
                    <p className="error-message">{errorState.error}</p>
                    <form onSubmit={handleSubmit}>
                        <FileUploads files={files} addFile={addFile} removeFile={removeFile} />
                        <div className="py-2 my-2 text-center">
                            { uploading ? <ProgressBar percent={progress} /> : <input className="btn btn-primary" type="submit" /> }   
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Uploads;