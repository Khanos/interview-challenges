import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

let database = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post('/blog', (req, res) => {
  const { title, description } = req.body;
  if(!title || typeof title !== 'string') {
    return res.status(400).json({error: "Invalid title"});
  }
  if(!description || typeof description !== 'string') {
    return res.status(400).json({error: "Invalid description"});
  }
  
  const id = database.length + 1;
  const blogInput = {
    title,
    description,
    id,
  };

  database.push(blogInput);
  res.status(201).json(blogInput);
});

app.get('/blog', (req, res) => {
  return res.status(200).json(database);
})

app.put('/blog/:id', (req, res) => {
  try {
    const { id } = req.params;
    const {title, description} = req.body;
  
    if(!id){
      return res.status(404).json({error: "Invalid id"});
    }
    const currElemmnt = database.filter(el => `${el.id}` === id)[0];
    currElemmnt.title = title;
    currElemmnt.description = description;
  
    return res.status(200).json(currElemmnt);
  } catch (error) {
    console.log('error', error.message || error);
  }
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});