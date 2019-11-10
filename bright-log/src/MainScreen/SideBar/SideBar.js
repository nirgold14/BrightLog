import React from 'react'
import './SideBar.css';
import ToDoList from './ToDoList/ToDoList'
import Calculator from './Calculator/Calculator'
import LogWriter from '../../services/logWriterService'
const logWriter = new LogWriter();

function SideBar(props) {

    function closeDay() {
        logWriter.writeLogToFile();
    }

    return (
        <div className="container Side-wrapper">

            <div className="side-bar-wrapper tdl-wrapper">
                <ToDoList />
            </div>
            <div className="side-bar-wrapper calc-wrapper">
                <Calculator />
            </div>
            <div className="side-bar-wrapper tdl-wrapper">
                <div className=" container-fluid close-day-wrap">
                    <a href="#/" onClick={closeDay} className="close-day-btn ">Close Day</a>
                </div>
            </div>
        </div>


    );
}
export default SideBar;