import React, { useEffect, useState } from 'react'
import './LogScreen.css'
import SimpleCheckLine from '../../LogComponents/SimpleCheckLine/SimpleCheckLine';
import CheckListGroup from '../../LogComponents/CheckListGroup/CheckListGroup'

import HttpService from '../../../../../services/httpService'
import notificationService, { NOTIF_operationLines_changed } from '../../../../../services/notificationsService'
const ns = new notificationService();
const http = new HttpService();

/**
 * This component create a GET Http Request once when created, in order to recieve all the OperationLines
 * from the DB and display them.
 *  When we get all the data, we first insert it to a Dictionary: <ID : Line>
 * next, we iterate from the first line and through her nextID feature,
 * untill we print the whole checkLines.
 * 
 * when a new line is added or deleted, we recieve a notification and update the display with new
 * GET Request from DB
 */

function LogScreen() {

    ns.addObserver(NOTIF_operationLines_changed, this, getOperationLines)

    useEffect(() => {
        getOperationLines();

    }, []);

    const [data, setData] = useState([])

    function getOperationLines() {
        http.getAllOperationLines().then(data => {
            setData(data);
        }, err => {

        }
        )
    }

    function createLine(line) {
        if (line.type === "group") {
            return <CheckListGroup groupContent={line.groupContent} text={line.text} id={line.id} prevID={line.prevID} nextID={line.nextID} />
        } else if (line.type === "header") {
            return <div className="card lines-header"><p className="card-text">{line.text}</p></div>
        } else {
            return <SimpleCheckLine type={line.type} text={line.text} id={line.id} prevID={line.prevID} nextID={line.nextID} operation={true} />
        }

    }

    function printData() {
        var ID_Line_Dic = {}
        var ans = []

        for (var i = 0; i < data.length; i++) {
            var tempLine = data[i]
            ID_Line_Dic[tempLine.id] = { tempLine }
        }

        var line = ID_Line_Dic[0]
        while (line != null) {
            ans.push(createLine(line.tempLine));
            line = ID_Line_Dic[line.tempLine.nextID]
        }
        return (ans);
    }

    return (
        <div class="FixedHeightContainer">
            <div class="Content">
                {printData()}
            </div>
        </div>




    );

}

export default LogScreen;