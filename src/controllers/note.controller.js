const Notes = require('../models/note.model');

// POST - create a note
const createNote = async(req,res)=>{
    try{
        const {title,content,category,isPinned} = req.body;

        const newNotes = new Notes({title,content,category,isPinned});
        await newNotes.save();

        res.status(201).json({
            msg:'Notes created successfully.',
            notes : newNotes,
        });
    }
    catch(error){
        res.status(500).json({msg:'Server error.',error:error.message});
    }
};


module.exports = {
    createNote,
}