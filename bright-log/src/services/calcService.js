class calcService {
   
   calculate = screenText => {
      var leftNum='';
      var rightNum='';
      var op ='';
      var ans='';
             
       let operators = ['+','-','/','*'];
      
       var index =0;
       var char = screenText.charAt(index);
       
       while(!operators.includes(char)&& char){
           leftNum+= char;
           index++;
           char=screenText.charAt(index);
       }
       op = char;
       index++;
       char=screenText.charAt(index);
       while(char){
           rightNum+=char;
           index++;
           char=screenText.charAt(index);
       }
              
       leftNum = parseFloat(leftNum);
       rightNum = parseFloat(rightNum);
    
       if(!op) return screenText;
       if(op==='+') ans =(leftNum+rightNum).toFixed(3); 
       if(op==='-') ans =(leftNum-rightNum).toFixed(3);
       if(op==='*') ans =(leftNum*rightNum).toFixed(3);
       if(op==='/') ans =(leftNum/rightNum).toFixed(3);    
       
       return String(+(Math.round(ans + "e+3")  + "e-3"));
   }
    
    
    
    
    
}

export default calcService;




