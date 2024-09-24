import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props){
  function handleDelete(){
    props.onDelete(props.id);
  }
  console.log("Props component", props);
  return (
    <div className='note'>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p className="dateTimeCSS">
        <small>
        {props.datetime ? (
          <small>{props.datetime}</small> 
        ) : (
          <small>No date available</small> 
        )}
        </small>
      </p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;