//This file is used for creating the textarea when users start typing in a text box or clicks add .

import React, { useState,useEffect} from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";  //Allows us to make requests to server (or any endpoint).Has then() function for easier error handling and alternate for callback functions. 
import Note from "./Note";
import alanBtn from "@alan-ai/alan-sdk-web";


let alanStatus=false;
function CreateArea(props) {

  

  // Adding the Alan button
  useEffect(() => {
    
    if(!alanStatus){
      alanStatus=true
       alanBtn({
        key: 'ALAN_AI_KEY',
        onCommand: (commandData) => {
                          
                let VoiceTitle=commandData.data[1];
                let CapitalizedTitle;
                if(VoiceTitle){   //To make sure we dont perform string operation on undefined string.
                CapitalizedTitle=VoiceTitle[0].toUpperCase()+VoiceTitle.substring(1)
                }
                let VoiceContent=commandData.data[0];
                let CapitalizedContent=VoiceContent[0].toUpperCase()+VoiceContent.substring(1)
                console.log(VoiceContent)
                axios({
                  url: 'http://localhost:4000/save',
                  method: 'POST',
                  data: {     //Data to sent to the server
                    username:globalVar,
                    newnote:{
                      title:CapitalizedTitle,
                      content:CapitalizedContent
                    }   
                  }
                }).then(response => {
                  if(response.data.saved){  //If data is saved
                    console.log("Saved");
    
                    getdata();   //Again render all the data for that user in the website
                  }
                })
        
        
              }
              
    });
  }
}, []);


  
  const globalVar = localStorage.getItem("name");

  ////Having a State for all the notes of a user and a hook function for updating it.
  const [userNotes, setUserNotes] = useState([]);          


  //Having State for a note and a hook function for updating it.
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  //Storing the state whether text area is expanded or not.Initially, the text area shouldn't be expanded
  const [state, setstate] = useState(false);

  const getdata = () => {
  
    axios.get("http://localhost:4000/getuserdetails",{params:{username:globalVar}})   //params is the part that is  added to main url. i.e,  http://localhost:4000/getuserdetails/{globalVar.username} It is query

    .then((response) => {    //When get request is successful then,
         
         setUserNotes(response.data)
        
    })
    .catch((response)=> (console.log(response)))
  }

  useEffect(()=>{
    getdata()
  },[])   // '[]' so, used useEffect executed only the first time.
  
  
 

  function handleTextChange(event) {   //When user enters text in form then change the state
    const { name, value } = event.target;   //Data in form

    setNote(prev_value => {
      return({
        ...prev_value,
        [name]:value       // [] used so that we tap into the value of name variable and that the value is not added as a new entry (key) in note object. 
      })
    } )

   
  }

//When user wants to submit notes
   const submitNote = (event) => {
    event.preventDefault();  //So, when button is clicked,page doesn't reload.
    axios({
      url: 'http://localhost:4000/save',
      method: 'POST',
      data: {     //Data to sent to the server
        username:globalVar,
        newnote:note    
      }
    }).then(response => {
      if(response.data.saved){  //If data is saved
        setNote({
          title:"",
          content:""
        })
        getdata();   //Again render all the data for that user in the website
      }
    })
  };

  function deleteNote(title,content) {
    axios({
      url:"http://localhost:4000/delete",
      method:'POST',
      data:{
        username:globalVar,
        title:title,
        content:content
      }
    }).then(response => {
      if(response.data.deleted){
        getdata();   //After deleting in database ,in the front end also we need to delete the note
      }
    })
    
  }

  function handleTextAreaClick() {  //So, area is expanded when user clicks the text area
    setstate(true);
  }

  return (

    <div className="div-form" >
    
      <form className="create-note" >
        {state && (     //If state is true (i.e, form's textArea is clicked) then execute what is after &&
          <input
            
            name="title"
            onChange={handleTextChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          
          name="content"
          onClick={handleTextAreaClick}
          onChange={handleTextChange}
          value={note.content}
          placeholder="Take a note..."
          rows={state ? "3" : "1"}
        />

        
          <button className="add-icon" onClick={submitNote}>
            <AddIcon />
          </button>
      
      </form>
      <h1 style={{ textAlign:"center",
                  color:"#65393A",
                  marginTop:"1cm",
                  marginBottom:"1cm",
                  fontSize:"3rem",
                  fontFamily: "McLaren,cursive"}}>
                  Your Notes
                  </h1>
      { userNotes.map((noteItem, index) => {
        return (
          
           < Note      //To handle the delete case of a note.To delete a crct note we should have a id on it.We chose index as id.
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      }) }
    </div>

    
  );
}

export default CreateArea;
