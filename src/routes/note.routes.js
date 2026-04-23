const express = require('express');
const router = express.Router();

const{
    createNote,
    CreateMultiple,
    getAllNotes,
    getNotesById,
    replaceNote,
    updateNote,
} = require('../controllers/note.controller');

router.post('/',createNote);
router.post('/bulk',CreateMultiple);
router.get('/',getAllNotes);
router.get('/:id',getNotesById);
router.put('/:id',replaceNote);
router.patch('/:id',updateNote);

module.exports = router;