import React, { useState } from 'react';
import './DailyLog.css';


import Morning from './/MorningSection/MorningSection'
import Operation from './/OperationSection/OperationSection'
import Eod from './/EodSection/EodSection'
import Deployments from './/DeploymentsSection/DeploymentsSection'
// import NewSection from '../'

import HttpService from '../../../services/httpService';
const http = new HttpService();

function DailyLog() {

    const [morning, setMorning] = useState('hide');
    const [operation, setOperation] = useState('hide');
    const [eod, setEod] = useState('hide');
    const [deploy, setDeploy] = useState('hide');
    // const [newSection, setNewSection] = useState('hide');

    const [Data, setData] = useState([])
    // an array of functions used to set the state of the active screen
    var screens = [setMorning, setOperation, setEod, setDeploy/**,setNewSection */];

    //Toggle screens when the new Day btn is pressed
    function createNewLog(e) {
        document.getElementById("DailyLogDiv").className = 'row';
        document.getElementById("newDayBtnDiv").className = 'hide';
    }


    /** Toggle screens between: Morning | Operation | EOD | Deployments
     *  Using 'number' to decide  which screen is called & 'category' to decide which data to retrieve.
     **/
    function toggleScreens(number, category) {
        if (number != 0) {
            getCheckLines(category)
        }

        for (var i = 0; i < screens.length; ++i) {
            if (i === number) {
                screens[i]('active');
                document.getElementById(i).style.backgroundColor = 'green';
                document.getElementById(i).style.color = 'white';

            } else {
                screens[i]('hide');
                document.getElementById(i).style.backgroundColor = 'white';
                document.getElementById(i).style.color = 'black';
            }

        }
    }

    /**
     * Creates a GET Http Request for all the CheckLines object, and set the state with the new data.
     */
    function getCheckLines(category, sub, sub_sub) {
        http.getCheckLines(category, sub, sub_sub).then(data => {
            setData(data);
        }, err => {

        }
        )
    }

    return (

        <div className="container center">
            <div className="newDayBtnDiv" id="newDayBtnDiv">
                <a href="#" className="btn-new-day" onClick={createNewLog}>New Day</a>
            </div>
            <div className='hide' id="DailyLogDiv">
                <div class="daily-log-sections">
                    <a className="section-btn" onClick={() => toggleScreens(0)} id="0" href="#/">Morning Check List</a>
                    <a className="section-btn" onClick={() => toggleScreens(1, 'operation')} id="1" href="#/">Operation Sequence</a>
                    <a className="section-btn" onClick={() => toggleScreens(2, 'eod')} id="2" href="#/">End Of Day</a>
                    <a className="section-btn" onClick={() => toggleScreens(3, "deployments")} id="3" href="#/">Deployments</a>
                </div>

            </div>
            <div className="row">
                <div className="sticky-row">
                    <div className="sticky-page">
                        <Morning isHide={morning} number={1} />
                        <Operation isHide={operation} number={2} />
                        <Eod isHide={eod} number={3} data={Data} />
                        <Deployments isHide={deploy} number={4} data={Data} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DailyLog;