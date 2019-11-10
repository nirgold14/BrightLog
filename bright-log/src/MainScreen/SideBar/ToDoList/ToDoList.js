import React, {useEffect, useState} from 'react';
import './ToDoList.css';
import ToDoItem from './ToDo.js';




function ToDoList (props){
     const [TDLs , setTDLs ] = useState([]);
        
    
    function addTDL(e){
        e.preventDefault();
        var text = document.getElementById("tdl-input-field").value;     
        if(text!== ''){
            setTDLs([...TDLs,{id:Date.now(),text:text}]);        
            document.getElementById("tdl-input-field").value='';
        }
        
    }
    
    function removeTDL(id){
       setTDLs(TDLs.filter((todo) => todo.id !== id));        
    }
    
    function showList(){
        const list = TDLs.map( (object) =>              
            <ToDoItem text={object.text} someMethod={removeTDL} id={object.id} />
        );
        
        return list;        
    }
    
    return (
        <div className="container-fluid TDL-Wrap">
           <div className="card input-section">
               <form onSubmit={addTDL}>
               <input className="tdl-input-line" placeholder="Don't Forget to.." id="tdl-input-field" autocomplete="off" onSubmit={addTDL}/>
              </form>
            </div>
            <div className="card tdl-list-section">
                <ul className="tdl-ul">
                    {showList()}
               </ul>
               </div>
        </div>
    
    );
}
export default ToDoList;