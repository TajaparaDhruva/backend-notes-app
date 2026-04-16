const Notes = require('../models/note.model');

// POST - create a note
const createNote = async(req,res)=>{
    try{
        const {title,content,category,isPinned} = req.body;

        const newNotes = new Notes({title,content,category,isPinned});
        await newNotes.save();

        res.status(201).json({
            success: true,
            msg:'Notes created successfully.',
            notes : newNotes,
        });
    }
    catch(error){
        res.status(500).json({msg:'Server error.',error:error.message});
    }
};

// POST - create buls notes 
const CreateMultiple = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required",
        data: null
      });
    }

    const created = await Notes.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${created.length} notes created successfully`,
      data: created
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null
    });
  }
};

// GET - all notes
const getAllNotes = async (req,res)=>{
    try{
        const notes = await Notes.find();

        res.status(200).json({
            success: true,
            msg : 'Notes fetched successfully.',
            notes,
        });
    }
    catch(error){
        res.status(500).json({msg:'Server error.',error:error.message})
    }
};

// GET - Get note by ID
const getNotesById = async(req,res)=>{
    try{
        const {id} = req.params;

        const notes = await Notes.findById(id);

         if (!notes) {
      return res.status(404).json({ msg: 'note not found.' });
    }
    
     res.status(200).json({
      "success": true,
      msg:  'Note fetched successfully".',
      notes,
    });
    }
    catch (error) {
    res.status(500).json({ msg: 'Server error.', error: error.message });
  }
}
module.exports = {
    createNote,
    CreateMultiple,
    getAllNotes,
    getNotesById,
}