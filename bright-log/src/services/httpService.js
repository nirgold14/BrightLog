import 'whatwg-fetch'; //fetch resources asynchronously
import notificationService, { NOTIF_Messages_changed } from './notificationsService'
const ns = new notificationService();

let instance = null;

/** Http Service
 * This Singelton class's responsibilty is to allow smooth and easy interface
 * for server requests.
 * Using 'fetch' to create HTTP Requests.
 **/

class HttpService {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }


    getAllMessages = () => {
        console.log("get all Messages")
        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:3005/Forum')
                .then(response => {
                    resolve(response.json());
                }
                )
        });
        return promise;
    }

    /**
    *   Http Request: POST 
    *   Path:         /Forum
    *   Purpose:      Add new forum msg bject to DB  
    **/
    addNewMsg = msg => {

        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:3005/Forum', {
                method: 'POST',
                body: msg,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    ns.postNotification(NOTIF_Messages_changed, "")
                    resolve(response.json());
                })
        });
        return promise;
    }

    /**
    *   Http Request: DELETE 
    *   Path:         /Forum
    *   Purpose:      Delete forum message by her ID  
    **/
    removeForumMsg = (id) => {
        var promise = new Promise((resolve, reject) => {

            const options = {
                method: 'delete',
                body: id,
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
            fetch('http://localhost:3005/Forum', options)
                .then(response => {
                    ns.postNotification(NOTIF_Messages_changed, "")
                    resolve(response.json());
                })
                .catch(err => {
                    reject(err)
                })
        });
        return promise;
    }

    /**
    *   Http Request: GET 
    *   Path:         /CheckLine
    *   Purpose:      Return the checklines that match the paramaters (category | sub_category )  
    **/
    getCheckLines = (category, sub) => {
        var promise = new Promise((resolve, reject) => {
            var url = new URL("http://localhost:3005/CheckLine"),
                params = { category: category, sub_Category: sub }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url)
                .then(response => {
                    resolve(response.json());
                })
                .catch(err => console.log(err.message))
        });
        return promise;
    }


    /**
    *   Http Request: GET 
    *   Path:         /OperationLine
    *   Purpose:      return all the Operation Lines objects from DB*  
    **/
    getAllOperationLines = () => {
        console.log("get all OperationLines")
        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:3005/OperationLine')
                .then(response => {
                    resolve(response.json());
                }
                )
        });
        return promise;
    }

    /**
    *   Http Request: POST
    *   Path:         /OperationLine
    *   Purpose:      Add new OperationLine object to DB  
    **/
    addNewOperationLine = (data) => {

        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:3005/OperationLine', {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    resolve(response.json());
                })
        });
        return promise;
    }

    /**
    *   Http Request: POST
    *   Path:         /OperationLine
    *   Purpose:      Set the prevID feature at the main line to the new ID.  
    **/
    updatePrevID = (mainID, changeID) => {

        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:3005/OperationLine/updatePrevID', {
                method: 'PATCH',
                body: mainID, changeID,
                headers: { 'Content-Type': 'application/json' }
            })
        });
        return promise;
    }

    /**
    *   Http Request: POST
    *   Path:         /OperationLine
    *   Purpose:      Set the nextID feature at the main line to the new ID.  
    **/
    updateNextID = (mainID, changeID) => {

        var promise = new Promise((resolve, reject) => {

            fetch('http://localhost:3005/OperationLine/updateNextID', {
                method: 'PATCH',
                body: mainID, changeID,
                headers: { 'Content-Type': 'application/json' }
            })
        });
        return promise;
    }

    /**
    *   Http Request: DELETE 
    *   Path:         /Forum
    *   Purpose:      Delete the matching line from the DB  
    **/
    removeOperationLine = (id) => {
        var promise = new Promise((resolve, reject) => {

            const options = {
                method: 'delete',
                body: id,
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
            fetch('http://localhost:3005/OperationLine', options)
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => console.error('Error: ${error}'))
        });
        return promise;
    }

}

export default HttpService;