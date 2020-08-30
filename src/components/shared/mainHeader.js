import React, { Component } from 'react';

class MainHeader extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark header">
                <a className="navbar-brand" href="index.html">Hippocrates Health Alliance User Portal</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-bars"></span>
                </button>

                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a href="https://hippocratesalliance.com/index.html" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="https://hippocratesalliance.com/services.html" className="nav-link">Services</a></li>
                        <li className="nav-item"><a href="https://hippocratesalliance.com/about.html" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="https://hippocratesalliance.com/contact.html" className="nav-link">Contact</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default MainHeader;