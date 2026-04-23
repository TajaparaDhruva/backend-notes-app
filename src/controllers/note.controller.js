const Notes = require('../models/note.model');

const mongoose = require('mongoose');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST - create a note
const createNote = async(req,res)=>{
  const {title,content,category,isPinned} = req.body;
    try{

      if(!title || !content){
        return res.status(400).json({
          success:false,
          message:'Title and Content Required field',
          data:null,
        })
      }

        const newNotes = new Notes(req.body);
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

// PUT -  Replace a note completely
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null,
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required for full replacement",
        data: null,
      });
    }

    const updated = await Notes.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      {
        new: true,
        overwrite: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// PATCH - Update specific fields only

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate ObjectId
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null,
      });
    }

    // 2. Handle missing or empty body (THIS FIXES YOUR ERROR)
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
      });
    }

    // 3. Allow only valid fields
    const allowedFields = ["title", "content", "category", "isPinned"];
    const updates = {};

    for (let key of Object.keys(req.body)) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    // 4. If no valid fields were sent
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided",
        data: null,
      });
    }

    // 5. Update note
    const updated = await Notes.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    // 6. Not found case
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    // 7. Success response
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error(error); // ALWAYS keep this
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};


module.exports = {
    createNote,
    CreateMultiple,
    getAllNotes,
    getNotesById,
    replaceNote,
    updateNote,
}