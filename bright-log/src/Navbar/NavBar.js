import React from 'react'
import './NavBar.css';
import logo from './logo.png';

/*NavBar Apps*/
import Clock from './Clock/Clock'
import UserWelcome from './UserWelcome/UserWelcome'

/*NavBar Services*/
import notificationService, { NOTIF_SCREEN_CHANGED } from '../services/notificationsService'
let ns = new notificationService();

function NavBar(props) {

    /**
     * Noitfy that a button has pressed, and a new screen should be loaded to the MainScreen component.
     * The data includes the name of the chosen screen. 
     **/
    function screenChange(data) {
        ns.postNotification(NOTIF_SCREEN_CHANGED, data)
    }

    return (
        <div className="container-fluid Navbar">
            <div className="row">
                <div className="container-fluid nav-top-row">
                    <div className="card Logo-card">
                        <img src={logo} className="img-fluid nav-img"></img>
                        <span className="logo-text">BrightLog</span>
                    </div>
                    <Clock />
                    <UserWelcome />
                </div>
            </div>

            <div className="row">
                <div className="container-fluid screens-menu">
                    <div className="card menu-button-wrapper"><button type="button" class="btn btn-primary menu-button" onClick={() => screenChange({ screenName: 'daily-log' })}> Daily Log</button></div>
                    <div className="card menu-button-wrapper"><button type="button" class="btn btn-primary menu-button" onClick={() => screenChange({ screenName: 'not-ready' })}> Wiki</button></div>
                    <div className="card menu-button-wrapper"><button type="button" class="btn btn-primary menu-button" onClick={() => screenChange({ screenName: 'msg-board' })}> Message Board</button></div>
                    <div className="card menu-button-wrapper"><button type="button" class="btn btn-primary menu-button" onClick={() => screenChange({ screenName: 'not-ready' })}> Contact List</button></div>
                    <div className="card menu-button-wrapper"><button type="button" class="btn btn-primary menu-button" onClick={() => screenChange({ screenName: 'not-ready' })}> Private Section</button></div>
                </div>
            </div>



        </div>


    );
}
export default NavBar;