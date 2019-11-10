import React, { useState, useEffect } from 'react';
import './SimpleCheckLine.css';
import NewLineModal from '../newLineModal/newLineModal';
import LogWriter from '../../../../../services/logWriterService';
const logWriter = new LogWriter();

/**
 * This is the main checkLine component.
 * Here we are using the props we are given to decide what will be the features in the new checkLine.
 *  
 * Every time a line is checked, her data transfer to the logWriter so the data could be displayed in the end of day.
 */

function SimpleCheckLine(props) {
    const [hour, setHour] = useState('')
    const [inputText, setInputText] = useState('');

    //Line Components
    let MainLineClassName = 'container-fluid line-wrapper';
    let CheckBtnClassName = 'card checkBox';
    let HourClassName = 'card time-stamp';
    let TextClassName = 'card-text line-text';
    let InputClassName = 'hide';
    let TrueFalseClassName = 'hide';
    let newLineBtnClassName = 'hide';

    //Line Vars
    let id = props.id;
    let prevID = props.prevID
    let nextID = props.nextID

    //check if it's an operation checkList
    if (props.operation) {
        newLineBtnClassName = '';
    }
    //change the css classes of those elements we want to appear in this line
    if (props.type) {
        if (props.type.includes('group')) {
            if (props.type.includes('trueFalse')) {
                TrueFalseClassName = '';
            } else {
                InputClassName = '';
            }
            CheckBtnClassName = 'hide';
            HourClassName = 'hide';
            MainLineClassName += 'container-fluid line-wrapper group-line'
            newLineBtnClassName = 'hide';
        }

        else if (props.type.includes('input')) {
            InputClassName = '';
        }
        else if (props.type.includes('prevNextLine')) {
            newLineBtnClassName = '';
        }
    }



    /**
     * Here we first check if our instance have input box.
     * if he do, we would allow the click only if the value box is submitted.
     * this way we won't write down the line without the value.* 
     */
    function onCheckClick(e) {
        var possible = true;
        if (props.type === 'input') {
            possible = false;
            if (inputText !== '') {
                possible = true;
            }
        }
        if (possible) {
            var name = e.target.offsetParent.className;
            if (name == "card checkBox") {
                e.target.offsetParent.className = "card checkBox checked";
                var hour = new Date().toLocaleTimeString();
                setHour(hour)
                sendToLogWriter(hour);

            }
        }
    }

    /** Invoked when line checked.
     * prepare the paramaters needed to the logWriter service in order to document that line 
     * 
    */
    function sendToLogWriter(hour) {
        var array = '';
        var input = '';
        if (props.operation) {
            var array = 'operation'
        }
        else switch (props.category) {
            case 'eod':
                var array = 'eod'
                break;
            case 'cameras':
                var array = 'cameras'
                break;
            case 'verifications':
                var array = 'verifications'
                break;
            case 'ready':
                var array = 'ready'
                break;

        }
        if (props.type === 'input') {
            input = { inputText }
        }
        logWriter.addNewLine(array, hour, props.text, input);
    }

    /**
     * True/False Logic
     * 
     * perhaps will be smart to put in seperate component.
     **/
    const [trueClass, setTrue] = useState('tf-btn')
    const [falseClass, setFalse] = useState('tf-btn')

    function tfClick(e) {
        var btn = e.target.id;
        if (btn === 'true') {
            if (trueClass.includes('chosen')) {
                setTrue('tf-btn')
            } else {
                setTrue('tf-btn chosen');
                setFalse('tf-btn');
            }
        } else {
            if (falseClass.includes('chosen')) {
                setFalse('tf-btn');
            } else {
                setFalse('tf-btn chosen');
                setTrue('tf-btn')
            }
        }
    }

    return (


        <div className={MainLineClassName}>
            <div className={CheckBtnClassName}>
                <a href="#/" onClick={onCheckClick} className='my-check-box' >V</a>
            </div>
            <div className={HourClassName}>{hour}</div>
            <div className={TextClassName}>{props.text}</div>
            <div className={InputClassName}>
                <input value={inputText} onInput={e => setInputText(e.target.value)} type="text" name="input-box" id="myInput" ></input>
            </div>
            <div className={TrueFalseClassName}>
                <div className='card tf-body'>
                    <a href='#/' className={trueClass} id='true' onClick={tfClick}>TRUE</a>
                    <a href='#/' className={falseClass} id='false' onClick={tfClick}>FALSE</a>
                </div>
            </div>
            <div className={newLineBtnClassName}>
                <NewLineModal id={id} prevID={prevID} nextID={nextID} />
            </div>
        </div>
    );
};

export default SimpleCheckLine;