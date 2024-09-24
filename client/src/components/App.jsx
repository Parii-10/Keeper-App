import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes,setNotes] = useState([]);
  

  const fetchAPI = async () => {
    try {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      console.log("Fetched Notes:", data); 
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  },[]);

  function dateTime(){
    const d = new Date();
    return (`${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.toLocaleTimeString()}`);
  }
  function displayDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.toLocaleTimeString()}`);
  }

  function addNote(newNote){
    const noteWithDateTime = {
      ...newNote,
      datetime: dateTime() 
    };
    console.log("New Note with DateTime:", noteWithDateTime);
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {'content-type' : 'application/json' },
      body: JSON.stringify(noteWithDateTime),
    })
    .then(response => response.json())
    .then(data => {
      setNotes(prevNotes => {
        return [...prevNotes, data];
      });
    })
    .catch(error => console.log(error));
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => (noteItem.id !== id));
    });
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'DELETE',
    })
    .then(response =>{
      if(response.ok){
        throw new Error ("Failed to delete the note.");
      }
      return response.json();
    } )
    .then(() => {
    })
    .catch(error => {
      console.log(error);
      fetchAPI();
    });
  }
  


  return (
    <div>
       <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        console.log("Rendering Note:", noteItem); 
        return (
          <Note 
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title} 
            content={noteItem.content}
            datetime={displayDateTime(noteItem.datetime)}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
      
   
  )
}

export default App;
