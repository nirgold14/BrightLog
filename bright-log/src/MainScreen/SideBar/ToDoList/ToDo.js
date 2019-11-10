import React from 'react';
import './ToDo.css';
import ToDoList from './ToDoList.js';

function ToDo(props){
    
    function remove(){
        props.someMethod(props.id);
    }
    
    return(
        <li className="card todo-item">  
            <p className="card-text tdl-text">{props.text}</p>       
            <a href="#/" className="remove-btn" onClick={remove}>X</a>
        
        </li>
    )
    
}

export default ToDo;