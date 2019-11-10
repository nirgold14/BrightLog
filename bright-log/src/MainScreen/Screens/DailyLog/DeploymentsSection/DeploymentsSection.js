import React, { useState } from 'react';
import './DeploymentsSection.css';

import DeployLine from './DeployLine/DeployLine'




function DeploymentsSection(props) {
    const [unit, setUnit] = useState('');
    const [compoCheckList, setCompoCheckList] = useState('hide');
   


    function unitClick(name) {
        if (name === unit) {
            setCompoCheckList('hide')
            setUnit('');
        } else {
            setCompoCheckList('container compo-card-chklist')
            setUnit(name);
        }

    }

    return (
        <div className={props.isHide} id='screen-wrapper-99'>
            <div className="row screen-row">
                <div className="col-sm-4 ">
                    <div className="container-fluid deployments-components-container">
                        <div className="row">
                            <div className="col-sm-6">

                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('SUI')}>SUI</a></p>
                                </div>
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('SBMS')}>SBMS</a></p>
                                </div>
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('SFC')}>SFC</a></p>
                                </div>
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('SFG')}>SFG</a></p>
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('HMS')}>HMS</a></p>
                                </div>
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('WAS')}>WAS</a></p>
                                </div>
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('WMS')}>WMS</a></p>
                                </div>
                                <div className="card compo-card">
                                    <p className="text-justify text-deploy"><a href="#/" onClick={() => unitClick('CMS')}>CMS</a></p>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>
                <div className="col-sm-8 ">
                    <div className={compoCheckList}>
                        <div className="row unit-heading">{unit}</div>
                        <div className="row unit-versions">
                            Current Version: <input type="text" name="fname" />
                            New version: <input type="text" name="lname" />
                        </div>
                        <div className="row unit-tdl">
                             <DeployLine text={'Check the changes in the release notes'}/>
                             <DeployLine text={'Check CMS health through SUI.'}/>
                             <DeployLine text={'IR cameras communicating.'}/>
                             <DeployLine text={'Verify the relevant range for each camera.'}/>
                        </div>
                        <div className="row submit-deploy">
                             <button type="button" class="btn btn-secondary btn-lg btn-block" id='submit-btn'>Submit</button>
    
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default DeploymentsSection;