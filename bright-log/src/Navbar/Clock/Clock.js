import React ,{useState, useEffect} from 'react'
import './Clock.css';

function Clock (){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const [date , setDate ] = useState(new Date());
    
    useEffect(()=>{
        var timerID = setInterval(()=> tick(),1000);
        return function cleanUp(){
            clearInterval(timerID);
        };        
    });
    
    function tick(){
        setDate(new Date());
    }
    
        
    
   
    
    
    return (
         
        
        <div className="card Clock-Wrap">
            <div className="card-body" >
                 <h4>{date.toLocaleTimeString()}</h4>
                 <h4>{date.toLocaleDateString()}</h4>
                 <h4>{days[date.getDay()]}</h4>
                 
            </div>
          
        </div>
    
    );
}
export default Clock;