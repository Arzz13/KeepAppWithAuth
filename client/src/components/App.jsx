import React from "react";
import Notes from "./Notes";
import Login from "./Login";
import Signuphead from "./Signuphead";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"; //To keep the UI in sync with change in browser url.

 function App() {

  
  
 
  return(
    <div>
    <Router>  {/* To render the components based on route ,we need to use this.Routes and route are children of this */}
    <Routes>   {/* So,that only first path that matches the url is rendered .If this not used,then all components matching the path will be rendered. So, better to use this.*/}

    
    <Route path="/" element={[<Signuphead/>,<Login />]}/>  {/*Element has the components to be rendered*/}
    {/* Only if login is successful,/note path will be called */}
    <Route path="/note" element={<Notes/>}>

    </Route>
    </Routes>
    </Router>
    </div>
  );

  

 
}

export default App;

