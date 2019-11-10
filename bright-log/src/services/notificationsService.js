/** notificationsService
 *  This Singelton class's responsibilty is to allow communication and data transfering through the components.
 *  
 * How To Use:
 * 
 *  - Service: 
 *      1.  Choose and export your notification name:
 *          Example: export const NOTIF_SCREEN_CHANGED = "notif_screen_changed";
 * 
 *  - Observable Component:
 *      1. Import the service and the notification you would like to use. 
 *      2. Decide when you want to notify your observers that a change has made by 'postNotification(notif_Name , data...)':
 *         Example:  ns.postNotification(NOTIF_SCREEN_CHANGED, { screenName: 'log-summary', text: text })
 * 
 * - Observer Component:
 *      1. Import the service and the notification you would like to use. 
 *      2. Add yourself to the observers list, and attach your callBack's function you want to invoke when change occur
 *         using   addObserver(notif_Name, this, callBack func)
 *         Example:    ns.addObserver(NOTIF_operationLines_changed, this, getOperationLines)
 * 
**/

//Notifications exist 
export const NOTIF_SCREEN_CHANGED = "notif_screen_changed";
export const NOTIF_Messages_changed = "notif_msgs_changed";
export const NOTIF_seeMsg = "notif_seeMsg";
export const NOTIF_operationLines_changed = "notif_operationLines_changed";
export const NOTIF_show_final_log = "notif_show_final_log";


let instance = null;

var observers = {};
/* For each notification name, we have listeners. the listeners are the observers.
   Each listener have is own name, and a callBack function to invoke when he notified. 
   notifName =  "MainScreenChanged" //the unique name of the notification.
        observer: someComponent 
        callBack: someFunction 

*/
class notificationService {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName]; //All the components who are intersted in this notifName
        if (!obs) { // new Notification
            observers[notifName] = [];
        }

        let obj = { observer: observer, callBack: callBack }; //The new object.
        observers[notifName].push(obj);
    }

    removeObserver = (observer, notifName) => {
        var obs = observers[notifName];
        if (obs) {
            for (var x = 0; x < obs.length; x++) {
                if (observer === obs[x].observer) {
                    obs.splice(x, 1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }

    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        for (var x = 0; x < obs.length; x++) { // For each observer we have to this notification, activate his callBack function
            var obj = obs[x];
            obj.callBack(data);
        }

    }
}

export default notificationService;