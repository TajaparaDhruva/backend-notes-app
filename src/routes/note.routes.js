const express = require('express');
const router = express.Router();

const{
    createNote,
    CreateMultiple,
} = require('../controllers/note.controller');

router.post('/',createNote);
router.post('/bulk',CreateMultiple);

module.exports = router;