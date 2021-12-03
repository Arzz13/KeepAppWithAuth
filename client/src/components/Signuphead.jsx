import React from "react";
//import HighlightIcon from "@material-ui/icons/Highlight";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

export default function Signuphead(){
    return( 
        <div className="signuphead" >
          <h1 style={{color:"#65393A"}}> Keep it here  </h1>
          <div className="center">
          <WbIncandescentIcon style={{width:"30%",height:"auto", fill:"65393A",marginTop:"2cm"}} />
          
          <h3 class="signuphead-text" style={{color:"#65393A"}}>  A part of your everyday life  </h3>
          <h5 class="signuphead-text" style={{color:"#65393A"}}> Never miss a task! </h5>
          
          
          </div>
        </div>
     );
}