const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://testmongodb:9876qwer@cluster0.rewejjw.mongodb.net/notesDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// create a data schema
const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", notesSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote.save(); // corrected to actually call the save() method
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
