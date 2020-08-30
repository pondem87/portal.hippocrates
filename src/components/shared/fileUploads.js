import React from 'react';

const FileUploads = ({files, addFile, removeFile}) => {
    return (
        <div>
            {files && files.map((file) => {
                return (
                    <SingleFile key={Math.random()} file={file} removeFile={removeFile} />
                )
            })}
            <input type='file' accept='.pdf, .jpg, .jpeg' onChange={addFile}/>
        </div>
        
    )
}

const SingleFile = ({file, removeFile}) => {
    return (
        <div className="border border-primary rounded my-1 py-1 px-1 bg-primary text-white">
            <i onClick={() => removeFile(file.name)} className="fas fa-times-circle float-right text-danger my-1 mx-1"></i>
            {file.name}
        </div>
    )
}

export default FileUploads;