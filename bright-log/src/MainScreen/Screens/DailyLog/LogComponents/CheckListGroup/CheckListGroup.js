import React, { useState, useEffect } from 'react';
import './CheckListGroup.css'

import SimpleCheckLine from '../SimpleCheckLine/SimpleCheckLine'

/**
 * A component which holds several common category Input / TrueFalse fields.
 * Helps keep things organzied 
 */

function CheckListGroup(props) {
    const [GroupContentScreen, setGroupScreen] = useState('hide'); // open/hide screen which display the content
    const [hour, setHour] = useState('');
    const [checkValid, setCheckValid] = useState(false); // does all the checklines in the group has been checked?
    const [checkAllFill, setAllFill] = useState('group-btn-text') // Css display class when all fill

    /**
     * open / hide when click on the group btn
     */
    function onGroupClick() {
        if (GroupContentScreen === 'hide') {
            setGroupScreen('group-content');
        } else {
            setGroupScreen('hide');
        }

    }

    /**
     * Client can't check this box unless all the checklines in the group been checked.
     * If it is true, the hour is picked from the date, and the css class will change.
     *  
     */
    function onCheckClick(e) {
        if (checkValid === true) {
            var name = e.target.offsetParent.className;
            if (name == "card checkBox") {
                e.target.offsetParent.className = "card checkBox checked";
                var date = new Date();
                setHour(date.toLocaleTimeString())
            }
        } else {
            alert('You Forgot Something...')

        }
    }

    /**
     * Wrote that function at the beginning.. not so intuitive.. but it's working :)
     * we iterate through all the objects in the group and we first check if it's an Input or TrueFalse checkLine:
     * 
     *  TrueFalse - at least 1 btn need to be chose. True Or False, or else - error
     *  Input - Checks if the input field is filled, or else - error
     * 
     * If everything is ok, we set the state of CheckValid.
     */
    function isEveryThingChecked() {
        var containerChilds = document.getElementById("group-container").children;
        var amountOfLines = containerChilds.length;
        var ans = true;
        for (var i = 0; i < amountOfLines; i++) {
            var line = containerChilds[i];
            if (line.innerText.includes('TRUE')) {
                var trueState = line.children[4].children[0].children[0].className.includes('chosen')
                var falseState = line.children[4].children[0].children[1].className.includes('chosen')
                if (trueState || falseState) {
                    line.children[4].children[0].className = 'card tf-body'
                } else {
                    ans = false;
                    line.children[4].children[0].className += ' red-border'
                }
            } else {
                var inputState = line.children[3].children[0].value === ''
                if (!inputState) {
                    line.children[3].children[0].className = 'card tf-body'
                } else {
                    ans = false;
                    line.children[3].children[0].className = ' red-border'
                }
            }
        }

        setCheckValid(ans);

        if (ans) {
            setAllFill('group-btn-text green-background')
        } else {

            setAllFill('group-btn-text')
        }
    }

    return (
        <div className="line-wrapper no-side-margin">
            <div className='card checkBox'>
                <a href="#/" onClick={onCheckClick} className='my-check-box' >V</a>
            </div>
            <div className='card time-stamp'>{hour}</div>
            <a href="#/" className="group-btn" ><p className={checkAllFill} onClick={onGroupClick}>{props.text}</p></a>
            <div className={GroupContentScreen}>
                <div className="row">
                    <div className="col-sm-12" id='group-container'>
                        <SimpleCheckLine type={'group-member-input'} text={"EVA Out Temp [°C]:"} />
                        <SimpleCheckLine type={'group-member-trueFalse'} text={"Aux Boiler is running?"} />
                        <SimpleCheckLine type={'group-member-trueFalse'} text={"Gland Steam?"} />
                        <SimpleCheckLine type={'group-member-trueFalse'} text={"Reverse Flow?"} />
                        <SimpleCheckLine type={'group-member-input'} text={"Drum SAT Temp [°C]:"} />
                        <SimpleCheckLine type={'group-member-input'} text={"ShOut Temp [°C]:"} />
                        <SimpleCheckLine type={'group-member-input'} text={"Stg Inlet Left Temp [°C]:"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button type="button" class="btn btn-secondary btn-md btn-block" id='submit-btn' onClick={isEveryThingChecked}>Submit</button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default CheckListGroup;