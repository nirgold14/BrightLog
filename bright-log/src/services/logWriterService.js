import notificationService, { NOTIF_SCREEN_CHANGED } from './notificationsService';
const ns = new notificationService();



/** logWriterService
 * This Singelton class's responsibilty is to allow organized and uniform daily documentation.
 * Every time a checkLine is being checked, the line's data is sent to this service.
 * When recieving the data, it's being send to her relevant array - This helps us organize the final 
 * output whice will be uniform every day.
 */



let instance = null;
var verifications = [];
var cameras = [];
var ready = [];
var operation = [];
var eod = [];


class logWriterService {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }


    /**
     * Create the string using the data, which than appear in the final output.
     * Using switchCase to organize each line to her category's array*
     */
    addNewLine(array, time, text, input) {
        var text = time + " - " + text
        if (input != '') {
            text += ' ' + input.inputText
        }

        switch (array) {
            case 'verifications':
                verifications.push(text)
                break;
            case 'cameras':
                cameras.push(text)
                break;
            case 'ready':
                ready.push(text)
                break;
            case 'operation':
                operation.push(text)
                break;
            case "eod":
                eod.push(text)
                break;
        }
    }

    /**
     * Build up and organize the final output that will be appeared on screen to the client.
    **/
    writeLogToFile() {

        var text = new Date().toLocaleDateString() + ' \n\nMorning Checklist: \n\n Verifications: \n'
        for (var key in verifications) {
            text += verifications[key] + '\n'
        }
        text += '\nCameras: \n'
        for (var key in cameras) {
            text += cameras[key] + '\n'
        }
        text += '\nReady: \n'
        for (var key in ready) {
            text += ready[key] + '\n'
        }
        text += '\nOperation Sequence: \n'
        for (var key in operation) {
            text += operation[key] + '\n'
        }
        text += '\nEOD: \n'
        for (var key in eod) {
            text += eod[key] + '\n'
        }


        /**
        *   Http Request: POST
        *   Path:         /write
        *   Purpose:      Send the final text to the server, that will write it to the TXT file.  
        **/
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3005/write', {
                method: 'POST',
                body: JSON.stringify({ text: text }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    resolve(response.json());
                })
        });
        ns.postNotification(NOTIF_SCREEN_CHANGED, { screenName: 'log-summary', text: text })
        return promise;

    }




}

export default logWriterService;