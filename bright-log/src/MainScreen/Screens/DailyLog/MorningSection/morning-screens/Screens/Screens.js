import React from 'react';
import './Screens.css';
import screenLogo from './screenLogo.jpg'



function Screens(props) {


    return (
        <div className="container-fluid screens-wrapper">
            <div className="card station-card">
                <div className="card lines-header"><p className="card-text">WS-04</p></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card screen-card"><img src={screenLogo}/></div>
                            <div className="card screen-card"><img src={screenLogo}/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 padding-right-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>

                        </div>
                        <div className="col-sm-6 padding-left-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card station-card">
                <div className="card lines-header"><p className="card-text">WS-03</p></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card screen-card"><img src={screenLogo}/></div>
                            <div className="card screen-card"><img src={screenLogo}/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 padding-right-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>

                        </div>
                        <div className="col-sm-6 padding-left-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card station-card">
                <div className="card lines-header"><p className="card-text">WS-01</p></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card screen-card"><img src={screenLogo}/></div>
                            <div className="card screen-card"><img src={screenLogo}/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 padding-right-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>

                        </div>
                        <div className="col-sm-6 padding-left-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card station-card">
                <div className="card lines-header"><p className="card-text">SPOC</p></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card screen-card"><img src={screenLogo}/></div>
                            <div className="card screen-card"><img src={screenLogo}/></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 padding-right-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>

                        </div>
                        <div className="col-sm-6 padding-left-0">
                            <div className="card screen-card bottom-screen"><img src={screenLogo} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Screens;