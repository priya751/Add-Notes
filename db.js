const mongoose = require("mongoose");
const db = "mongodb+srv://admin:Ud5LCwa19hTxZtzq@cluster0.wchej.mongodb.net/notes?retryWrites=true&w=majority";

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
        else console.log(`Error : ${err} `);
    }
);

module.exports = mongoose;