import React, { useEffect, useState } from 'react'
import './Calculator.css';
import calcService from '../../../services/calcService';



let cs = new calcService();


function Calculator(props) {


    const [screenText, setScreen] = useState("");


    function calcBtnClick(e) {
        var oldText = screenText;
        if (oldText.length < 12) {
            var input = e.target.textContent;
            var newText = oldText + input;
            setScreen(newText);
        }
    }

    function clearBtnClick() {
        setScreen('');
    }

    function findSolution() {
        try {
            setScreen(cs.calculate(screenText));
        } catch (e) {
            setScreen('NaN');


        }
    }

    return (
        <div className=" container-fluid calc-Wrap">
            <div className="row">
                <div className="col-sm-12 padding-0">
                    <div className="card screen-section"> <h4 className="card-text screen-text">{screenText}</h4> </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 padding-0">
                    <div className="container-fluid numbers-section">
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>7</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>8</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>9</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>4</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>5</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>6</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>1</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>2</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>3</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>0</a></div>
                        <div className="card number-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>.</a></div>
                        <div className="card number-btn clear-btn"><a href="#/" className="number-link clear-btn" onClick={clearBtnClick}>C</a></div>

                    </div>

                </div>
                <div className="col-sm-4 padding-0">
                    <div className="op-section">
                        <div className="card op-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>*</a></div>
                        <div className="card op-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>/</a></div>
                        <div className="card op-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>-</a></div>
                        <div className="card op-btn"><a href="#/" className="number-link" onClick={calcBtnClick}>+</a></div>
                        <div className="card op-btn calc-btn"><a href="#/" className="number-link" onClick={findSolution}> =</a></div>

                    </div>



                </div>
            </div>


        </div>

    );
}
export default Calculator;