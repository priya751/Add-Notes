const mongoose = require("mongoose");
const slugify = require("slugify");
const noteSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            require: true
        },
        
        description:
        {
            type: String,
            require: true
        },
        createdAt:
        {
            type: Date,
            default: Date.now
        },
        slug:
        {
            type: String,
            require: true,
            unique: true
        }
    });

    noteSchema.pre('validate',function(next)
    {
        if(this.title)
        {
            this.slug= slugify(this.title,{lower:true, strict:true});
        }
        next();
    })
    module.exports = mongoose.model("Note",noteSchema);