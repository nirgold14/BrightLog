import React from 'react'
import './LoginPage.css';
import logo from './logo.jpg';

function LoginPage(){ 
    
    return(
       
            <div class="row login">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="card signin-card">
                    <div class="card-body signin-body">
                        <img src={logo} class="img-fluid signin-img"/>
                        <form class="signin-form">
                            <div class="form-group">
                                <input type="email" class="form-control" id="email-input" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="pass-input" placeholder="Password"/>
                            </div>
                            <button type="button" class="btn btn-lg signin-btn">Sign in</button>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox"/> Remember Me <a href="#" class="signin-neddHelp"> Need Help?</a>
                                </label>
                            </div>
                        </form>
                    </div>
                   
                </div>
                 <a href="#" class="create-new-acc">Create new account</a>
                
            </div>
             <div class="col-md-3"></div>
        </div>
    
        
                    
    );    
};
                        
export default LoginPage;