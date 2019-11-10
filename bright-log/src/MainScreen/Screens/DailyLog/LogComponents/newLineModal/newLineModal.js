import React, { useState, useEffect } from 'react'
import './newLineModal.css';

import HttpService from '../../../../../services/httpService';
import notificationService, { NOTIF_operationLines_changed } from '../../../../../services/notificationsService';
const http = new HttpService();
const ns = new notificationService();

/**
 * This is the component responsible on the add / delete new OperationsLine.
 * gather the input from the client, verify it, write to the DB, and notify and update data. 
 * 
 * 
 */
function NewLineModal(props) {

    let Draggable = require('react-draggable');

    const [formClass, setformClass] = useState('none'); //main div
    const [btnClass1, setBtnClass1] = useState("btn btn-outline-success newCheckLineBtn"); // + btn
    const [btnClass2, setBtnClass2] = useState("btn btn-outline-danger newCheckLineBtn"); // - btn
    const [LineType, setLineType] = useState("") // current line type


    function openForm() {
        setformClass('mydiv')
        setBtnClass1('hide')
        setBtnClass2('hide')
    }

    function closeForm() {
        setformClass('none')
        setBtnClass1('btn btn-outline-success newCheckLineBtn')
        setBtnClass2('btn btn-outline-danger newCheckLineBtn')
    }


    /** deleteMsg()
     * 
     * After user confirmation, we first delete the current line from DB.
     * afterwatds we set the new ID's in the current and previous lines. like in a linkedList
     * to keep in order.
     * 
     * x=chosen line
     * (x.next).prev = x.prev
     * (x.prev).next = x.next
     * 
     * notify the observers after the update in the DB
     */
    function deleteLine() {
        var deleteApproved = window.confirm("Are you sure you want to DELETE this Line??")
        if (deleteApproved) {
            http.removeOperationLine(JSON.stringify({ id: props.id }))
            http.updatePrevID(JSON.stringify({ mainID: props.nextID, changeID: props.prevID }))
            http.updateNextID(JSON.stringify({ mainID: props.prevID, changeID: props.nextID }))
            ns.postNotification(NOTIF_operationLines_changed)
        }

    }

    /**
     * Simple function to create new ID for the new Line.
     * we convert the first 10 letters in te text to their Ascii number, and then we parse it to INTEGAR
     * by using parseInt.
     * 
     * If text is less than 10 letters, we fill it with the next i value.
     * 
     *  FIX NEEDED:
     *  What happen if we want to insert 2 lines with the same text.. the ID will be same.
     *  perhaps combine a timeStamp that will help to differ.
     */

    function generateID(text) {
        var newID = ''
        var date = new Date().toLocaleTimeString().split(":"); //[18][50][25]
        for (var i = 0; i < 3; i++) {
            if (text.charAt(i) != "") {
                newID += text.charAt(i).charCodeAt()
            }
            newID += date[i]
        }
        return parseInt(newID, 10);
    }



    //Because each newLineModal has the same id for his input fields, I created unique ID for each object
    //using the props.id which is unique for each component
    let uniqeTextID = "text" + props.id

    //Validation
    function checkValid(text) {
        if (LineType === "") {
            alert('Type Should Be: input / simple')
            return false
        } else if (text === '') {
            alert('Text Is Empty')
            return false
        } else {
            return true
        }

    }

    /** addLine()
         * 
         * We create the new element, using the user input and the props data.
         * afterwatds we set the new ID's in the current and next lines. like in a linkedList
         * to keep in order.
         * 
         * x = current line (NOT the new one)
         * (x.next).perv = newLineID
         * x.next = newLineID
         * 
         * Close the form.
         * notify the observers after the update in the DB.
         */
    function addLine() {

        let text = document.getElementById(uniqeTextID).value;

        if (checkValid(text)) {
            var id = generateID(text)
            var line = {
                type: LineType,
                text: text,
                id: id,
                prevID: (props.id),
                nextID: (props.nextID),
            }
            http.addNewOperationLine(JSON.stringify({ line }))
            http.updatePrevID(JSON.stringify({ mainID: props.nextID, changeID: id }))
            http.updateNextID(JSON.stringify({ mainID: props.id, changeID: id }))
            closeForm()
            ns.postNotification(NOTIF_operationLines_changed)
        }



    }

    return (

        <div className="card btn-holder-checkLine">
            <div className="container btn-Holder">
                <button type="button" className={btnClass1} onClick={openForm}>+</button>
                <button type="button" className={btnClass2} onClick={deleteLine}>-</button>
            </div>

            <Draggable cancel={'input'}>
                <div class="form-popup" id={formClass}>
                    <form action="/action_page.php" class="form-container" autocomplete="off">

                        <div className="btn-Holder">
                            <button type="button" class="btn-primary lineTypeBtn" onClick={() => setLineType("input")}> INPUT</button>
                            <button type="button" class="btn-primary lineTypeBtn" onClick={() => setLineType("simple")}> SIMPLE</button>
                        </div>

                        <label for="psw"><b>Text</b></label>
                        <input type="text" placeholder="Text" id={uniqeTextID} />

                        <div className="btn-Holder">
                            <button type="button" class="btn small_right_margin add_close-btn" onClick={addLine}>Add Line</button>
                            <button type="button" class="btn cancel add_close-btn" onClick={closeForm}>Close</button>
                        </div>

                    </form>
                </div>
            </Draggable>

        </div>






    );
}
export default NewLineModal;