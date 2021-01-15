import React, { useEffect, useState } from 'react';

const HouseCallClient = ({user}) => {
    const [state, setState] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const onSubmitSearch = (e) => {
        e.preventDefault();
        console.log('Search term: ', searchTerm);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 py-2">
                <h4>Listing: Professionals available for house calls</h4>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-10 mb-3">
                <form onSubmit={onSubmitSearch}>
                    <div className="form-group">
                        <label htmlFor="search-term">Search key words: </label>
                        <input className="form-control" type='text' id="search-term" onChange={handleSearchChange} value={searchTerm} required />
                    </div>
                    <div className="text-center">
                        <input type="submit" className="btn btn-info" value="search" />
                    </div>
                </form>
            </div>
            <div className="col-12 border border-info rounded px-3 py-3">
                <p>No Search Results</p>
            </div>
        </div>
    )
}

export default HouseCallClient;