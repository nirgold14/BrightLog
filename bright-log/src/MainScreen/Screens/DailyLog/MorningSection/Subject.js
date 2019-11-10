import React, { useState } from 'react';
import './Subject.css'

import Verifications from './morning-screens/Verifications/Verifications'
import Cameras from "./morning-screens/Cameras/Cameras";
import Ready from './morning-screens/Ready/Ready'
import Screens from './morning-screens/Screens/Screens'
// import NewSubject from '../'

import HttpService from '../../../../services/httpService';
const http = new HttpService();

function Subject(props) {

    //A state for each possible subject hide/show
    const [verifications, setVerifications] = useState('hide')
    const [cameras, setCameras] = useState('hide');
    const [ready, setReady] = useState('hide');
    const [screens, setScreens] = useState('hide');
    // const [newSubject, setNewSubject] = useState('hide');

    //A state of the current active Subject
    const [subjectData, setSubjectData] = useState([])

    //Array of SetStates funcs
    var screensArr = [setVerifications, setCameras, setScreens, setReady/**, setNewSubject */];

    /** Invokes when a new subject is clicked.
    *
    * Creates a GET Http Request for the desired category checkLines.
    * Than, set the data with the new DB output, and than open & close the asked subjects screen.
    **/
    function toggle_recieveData() {

        getCheckLines('morning', props.title)
        toggleScreens();
    }

    function getCheckLines(category, sub, sub_sub) {
        http.getCheckLines(category, sub, sub_sub).then(data => {
            setSubjectData(data);
        }, err => {

        }
        )
    }

    function toggleScreens() {
        var number = props.screenID;
        for (var i = 0; i < screensArr.length; ++i) {
            if (i === number) {
                screensArr[i]('active');
            } else {
                screensArr[i]('hide');
            }
        }
    }


    return (
        <div class="card subject-wrapper">
            <div class="card-header subject-header" id={props.cardId}>
                <h2 class="mb-0">
                    <button class="btn subject-btn" type="button" onClick={toggle_recieveData} data-toggle="collapse" data-target={props.BtnDataTarget} aria-expanded="true" aria-controls={props.DivId}>
                        {props.title}
                    </button>
                </h2>
            </div>

            <div id={props.DivId} class="collapse" aria-labelledby={props.cardId} data-parent="#accordionExample">
                <div class="card-body subject-content">
                    <p className={verifications}><Verifications data={subjectData} /> </p>
                    <p className={cameras}><Cameras data={subjectData} /></p>
                    <p className={ready}> <Ready data={subjectData} /> </p>
                    <p className={screens}><Screens data={subjectData} /></p>
                    {/* <p className={NewName}><NewSubject data={subjectData} /></p> */}
                </div>
            </div>
        </div>

    );
};

export default Subject;