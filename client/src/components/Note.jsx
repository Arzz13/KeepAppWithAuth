//For deleting a note item

import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
   
  function handleClick() {

	props.onDelete(props.title,props.content);
  } 
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="delete-icon" onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;