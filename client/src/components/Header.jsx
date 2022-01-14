import React from "react";
import {useNavigate} from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const navigateTo = () => {
    
    navigate('/');
  }
  return (
    <header>
      {/* <HighlightIcon
        style={{
          color: "white",
          display: "inline",
          marginRight: "10px",
          fontSize: "2rem",
          position:"absolute",
          top:"24px",
          left:"11em"
        }} /> */}
        
      <h1>
      <center>
      Keep Your Notes
      </center>
      </h1>
      <button className="headerbutton" onClick={navigateTo} > Log out </button>
    </header>
  );
}

export default Header;