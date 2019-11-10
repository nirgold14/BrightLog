import React, { useEffect, useState } from 'react';
import './MessageBoard.css'

//Components
import NewMessage from './NewMessage/NewMessage';
import MessagesHolder from './MessagesHolder/MessagesHolder';

//Services
import HttpService from '../../../services/httpService';
import notificationService, { NOTIF_seeMsg, NOTIF_Messages_changed } from '../../../services/notificationsService'
const http = new HttpService();
const ns = new notificationService();




function MessageBoard(props) {
    useEffect(() => {
        getMsgs();
    }, []);

    ns.addObserver(NOTIF_seeMsg, this, seeMsg); //see the msg that is chosen at the MessagesHolder component.
    ns.addObserver(NOTIF_Messages_changed, this, getMsgs); //get all the messages when a new msg added or deleted

    const [Messages, setMessages] = useState([]); //All the messages from the DB
    const [current_msg, setCurrentMsg] = useState("") //Focused msg
    const [newMsgScreenClass, setNewMsgClass] = useState("row") //show the new msg screen
    const [currentMsgScreenClass, setCurrentMsgClass] = useState("row hide") //show the current msg screen




    function getMsgs() {
        http.getAllMessages().then(data => {
            setMessages(data);
        }, err => { })
    }

    /**
    * Check which kind of sorting the client is intersted in.
    */
    function clickCheck(sort_feature) {
        var array1 = [...Messages]
        // The important part here is that I had problems because i didn't know the "=" is copy array by ref.
        switch (sort_feature) {
            case "importance":
                setMessages(array1.sort(compareByImportance));
                break;
            case "user":
                setMessages(array1.sort(compareByName));
                break;
            case "time":
                getMsgs();
                break;
            default:
        }
        setMessages(array1);
    }
    /**Comparable methods used by the sort func */
    function compareByName(a, b) {
        if (a.author < b.author) {
            return -1;
        }
        if (a.author > b.author) {
            return 1;
        }
        return 0;
    }

    function compareByImportance(a, b) {
        if (a.importance < b.importance) {
            return -1;
        }
        if (a.importance > b.importance) {
            return 1;
        }
        return 0;
    }
    /****************************************************************** */

    function seeMsg(message, requestedScreenName) {
        setCurrentMsg(message);
        switchScreensClasses(requestedScreenName);
    }

    /**Toggle between the screens */
    function switchScreensClasses(requestedScreenName) {
        if (requestedScreenName === "newMsg") {
            setNewMsgClass("row")
            setCurrentMsgClass("row hide")
        } else {
            setNewMsgClass("row hide")
            setCurrentMsgClass("row")
        }
    }

    return (
        <div className="msg-board-wrapper">
            <div className="row msg-board-title"><h2 className="title-text">Message Board</h2></div>
            <div className="row msg-board-body">
                <div className='col-sm-8 messages-container'>
                    <MessagesHolder array={Messages} />
                </div>
                <div className="col-sm-4">
                    <div className="msgboard-actions-container">
                        <div className="row msg-sorting-algo-row">
                            <a href="/#" className="sorting-btn" onClick={() => clickCheck("importance")}>Sort By Importance</a>
                            <a href="/#" className="sorting-btn" onClick={() => clickCheck("user")}>Sort By User</a>
                            <a href="/#" className="sorting-btn" onClick={() => clickCheck("time")}>Sort By Time</a>
                        </div>
                        <div className={currentMsgScreenClass}>
                            <div className="msg-content-wrapper ">
                                <h2>Message:</h2>
                                {current_msg}
                            </div>
                            <a href="/#" className="sorting-btn new-msg-btn" onClick={() => switchScreensClasses("newMsg")}>Add New Message</a>
                        </div>
                        <div className={newMsgScreenClass}>
                            <NewMessage />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MessageBoard;