import React , { useState } from "react";
import AddIcons from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props){
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  function handleChange(event){
    const {value, name} = event.target;

    setNote(prevNote => {
      return{
        ...prevNote,
        [name] : value
      };
    });
  }

  function submitNote(event){
    props.onAdd(note);
    setNote({
      title:"",
      content:""
    });
    event.preventDefault();
  }

  const [isExpanded, setIsExpanded] = useState(false);
  function expanded(){
    setIsExpanded(true);
  }

 


  return (
    <div>
      <form className="create-note">
        {
          isExpanded &&
          <input 
            type="text"
            name="title" 
            onChange={handleChange} 
            placeholder="Title" 
            value={note.title} 
          /> 
        }
        <textarea 
          name="content" 
          onClick={expanded} 
          onChange={handleChange} 
          placeholder="Take a note..." 
          rows={isExpanded ? 3 : 1} 
          value={note.content} 
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcons />
          </Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;