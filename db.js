const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/notesdb";

mongoose.connect(
    db,

    {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
        
    },
    (err)=>
    {
        if(!err) console.log("Database Connected");
        else console.log("Error in connecting database");
    }
);

module.exports = mongoose;