const express =require("express");
const router = express.Router();
const Note = require("./../models/note");
const slugify = require("slugify");
// const { update } = require("./../models/note");

router.get("/new",(req,res)=>
{
res.render("new",{ note: new Note() });
});

// create

router.post("/",async(req,res,next)=>
{
    req.note = new Note();
    next();
},saveAndRedirect("new"));

//Read by slug

router.get("/:slug",async (req,res)=>{
    const note = await Note.findOne({slug:req.params.slug});
    if(note==null)
    res.redirect("/"); 
     
    res.render("show",{note:note});
});

// delete

router.delete("/:id",async(req,res)=>
{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// Edit

router.get("/edit/:id",async(req,res)=>
{
    const note = await Note.findById(req.params.id);
    res.render("edit",{note:note});
})


// update

router.put("/:id",async(req,res,next)=>
{
    req.note = await Note.findById(req.params.id);
    next();
},saveAndRedirect("edit"));



function saveAndRedirect(path)
{
    return async(req,res)=>{
        let note = req.note;
        note.title = req.body.title;
        note.description = req.body.description;
    
    try {
        note=await note.save();
        res.redirect(`/notes/${note.slug}`);
    } catch (e) {
        res.render(`notes/${path}`,{note:note});
    }
}
}
module.exports = router;