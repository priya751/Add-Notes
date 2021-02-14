const express = require("express");
const app = express();
const methodOverride = require("method-override");
const port = process.env.port||1060; // for creating heroku dynamic port

// local import

const noteRouter = require("./routes/note");
const mongoose = require("./db");
const Notes = require("./models/note");

app.set("view engine", "ejs");

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

app.get("/",async(req,res)=>
{
    const notes = await Notes.find().sort({createdAt:'desc'});
    // var string =  notes.description;
    // notes.description = string.substring(0,15);
    res.render("index", {notes: notes});
});


app.use("/notes",noteRouter);

app.listen(port, ()=>
{
    console.log(`server is running at ${port}`);
});