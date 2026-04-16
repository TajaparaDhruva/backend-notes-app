const express = require('express');
const router = express.Router();

const{
    createNote,
    CreateMultiple,
    getAllNotes,
} = require('../controllers/note.controller');

router.post('/',createNote);
router.post('/bulk',CreateMultiple);
router.get('/',getAllNotes);

module.exports = router;