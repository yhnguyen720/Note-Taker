const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET route retrieving all notes
notes.get('/', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST route that creates new notes
notes.post('/', (req, res) => {
    // Deconstructing items in req.body
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        const notesData = readAndAppend(newNote, './db/db.json')
        res.json(notesData);
    }
    else {
        res.json('Error posting new note')
    }
})

// Delete route used to delete notes
notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    let notes = fs.readFile('./db/db.json', 'utf8', (error, data) => {
        let parsedData = JSON.parse(data);
        let updatedNotesArray = parsedData.filter(note => note.id !== id);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNotesArray, null, 4), (err) => {
            if (!err) {
                res.json({ 
                    message: `Note with id of ${req.params.id} was deleted successfully`,
                });
            } 
            else {
                res.json(`Failed to delete note with id of ${req.params.id}`);
            }
           });
    });

});
