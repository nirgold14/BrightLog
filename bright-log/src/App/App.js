import React from 'react';
import './App.css';

import NavBar from '../Navbar/NavBar';
import MainScreen from '../MainScreen/MainScreen';
import LoginPage from '../LoginPage/LoginPage'

function App() {

  return (
    <div className="App ">
      <div className="container-fluid loginPage  hide">
        <LoginPage />
      </div>
      <div className="container-fluid app-wrapper">
       
          <NavBar />
          <MainScreen />
      
      </div>








    </div>

  );
}

export default App;
