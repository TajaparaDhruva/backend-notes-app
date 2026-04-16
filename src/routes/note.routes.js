const express = require('express');
const router = express.Router();

const{
    createNote,
    CreateMultiple,
    getAllNotes,
    getNotesById,
} = require('../controllers/note.controller');

router.post('/',createNote);
router.post('/bulk',CreateMultiple);
router.get('/',getAllNotes);
router.get('/:id',getNotesById);

module.exports = router;