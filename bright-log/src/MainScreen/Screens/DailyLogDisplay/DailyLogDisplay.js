import React, { useState, useEffect } from 'react';
import './DailyLogDisplay.css'


/**
 * Display the daily summary final output.
 * Getting the text from the props of the component when it called
 * 
 */
function DailyLogDisplay(props) {
    let newText = '';
    if (props.text) {
        newText = props.text.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
    }


    return (
        <div className="daily-log-display-wrapper">
            <div className="row daily-log-display-body">
                <div className="messages-container">
                    <h4>{newText}</h4>
                </div>

            </div>


        </div>
    )


};

export default DailyLogDisplay;