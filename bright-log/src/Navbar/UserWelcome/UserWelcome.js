import React from 'react'
import './UserWelcome.css';
import pic from './pic.png';


function UserWelcome(props) {


    function LoginClick() {

    }

    function SignInClick() {


    }

    return (
        <div className="card user-welcome">
            <img src={pic} className="card-img user-img"></img>
            <div className="card-body welcome-body">
                <p className="card-text welcome-text">Welcome Nir!</p>
                <button type="button" class="btn"> <p className="card-text welcome-text logout">Logout</p></button>
            </div>
        </div>

    );
}
export default UserWelcome;