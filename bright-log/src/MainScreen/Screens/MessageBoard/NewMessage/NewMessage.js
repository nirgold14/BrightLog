import React, { useEffect, useState } from 'react';
import './NewMessage.css'

import HttpService from '../../../../services/httpService';
import notificationService, { NOTIF_Messages_changed } from '../../../../services/notificationsService';
const http = new HttpService();
const ns = new notificationService();

const userNames = ['Daniel', 'Nir', 'Doron']

function NewMessage() {
    const [importance, setImportance] = useState(2)

    /**
     * btnNumber is used to decide which importance button will be active
     */
    function importanceSetting(btnNumber) {
        setImportance(btnNumber);
        var btn = document.getElementById('imp-' + btnNumber);
        var isClicked = btn.className.indexOf("clicked") > -1;
        if (isClicked) {
            btn.className = "btn btn-secondary importance-btn"
        } else {
            btn.className += ' clicked';
            switch (btnNumber) {
                case 1:
                    document.getElementById('imp-2').className = "btn btn-secondary importance-btn"
                    document.getElementById('imp-3').className = "btn btn-secondary importance-btn"
                    break;
                case 2:
                    document.getElementById('imp-1').className = "btn btn-secondary importance-btn"
                    document.getElementById('imp-3').className = "btn btn-secondary importance-btn"
                    break;
                case 3:
                    document.getElementById('imp-1').className = "btn btn-secondary importance-btn"
                    document.getElementById('imp-2').className = "btn btn-secondary importance-btn"
                    break;
            }
        }
    }

    /**
    * send a POST HTTP request with all data neccessery to create a new forum msg object.
    * After promise happend, send notification to update the state with the new messages.
    */
    function addNewMsg() {
        var MsgDate = new Date();
        MsgDate = MsgDate.toLocaleDateString() + "-" + MsgDate.toLocaleTimeString();

        http.addNewMsg(JSON.stringify({
            importance: { importance },
            date: MsgDate,
            author: userNames[Math.floor(Math.random() * userNames.length)],
            subject: document.getElementById("msg-subject").value,
            content: document.getElementById("msg-content").value
        })
        )
        ns.postNotification(NOTIF_Messages_changed, "")
    }

    return (

        <div className="new-msg-container">
            <h3>New Message:</h3>
            <div className="row">
                <div class="importance-container" >
                    <p className="importance-text">Importance: </p>
                    <button type="button" class="btn btn-secondary importance-btn" id="imp-1" onClick={() => importanceSetting(1)}>1</button>
                    <button type="button" class="btn btn-secondary importance-btn" id="imp-2" onClick={() => importanceSetting(2)}>2</button>
                    <button type="button" class="btn btn-secondary importance-btn" id="imp-3" onClick={() => importanceSetting(3)}>3</button>
                </div>
            </div>
            <div className="row">
                <input type="text" class="subject-input" placeholder="Subject" id="msg-subject" />
            </div>
            <div className="row">
                <textarea className="content-input" placeholder="Content" cols="70" rows="9" id="msg-content" />
                <a href="/#" className="sorting-btn" id="new-msg-btn" onClick={addNewMsg}>Add</a>
            </div>

        </div>

    );

}

export default NewMessage;
