//Importing the packages and the custom components.
import React from 'react'; 
import ReactDOM from 'react-dom';
import App from './components/App';


ReactDOM.render( //Render a React component into the browser DOM at specified place.
    
    <App />,        /*Component to be Rendered.*/ 
    
  document.getElementById('root')  //Render at root div
);