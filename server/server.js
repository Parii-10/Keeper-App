import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
const corsOptions = {
  origin:["http://localhost:5173"],
};
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});
db.connect();

app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req,res) => {
  res.send("welcome");
});


app.post("/notes", (req,res) =>{
  const {title, content} = req.body;
  const dateTime = new Date().toLocaleString();
  db.query("INSERT INTO notes (title, content, dateTime) VALUES ($1, $2, $3) RETURNING *", [title, content, dateTime], (err,result) => {
    if(err){
      console.log(err);
      res.status(500).send('Error creating notes.');
    } else {
      console.log(`Note created with ID: ${result.rows[0].id}`);
      res.status(201).send(result.rows[0]);
    }
  });
});

app.get("/notes", (req,res)=>{
  db.query("SELECT id, title, content, dateTime FROM notes", (err, result) =>{
    if(err){
      console.log(err);
      res.status(500).send('Error retrieving notes.');
    }else {
      res.status(200).send(result.rows);
    }
  });
});

app.delete("/notes/:id", (req,res) => {
  const id = req.params.id;
  db.query("DELETE FROM notes WHERE id = $1", [id], (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send('Error deleting a note.');
    } else {
      res.status(204).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Server is started at port ${port}.`);
});