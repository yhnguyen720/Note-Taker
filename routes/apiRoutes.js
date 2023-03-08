const express = require('express');  
const apiRouter = express.Router();  
const fs = require('fs');  
const path = require('path');  
const uuid = require('uuid');  

apiRouter.get('/notes', (req, res) => {  
    let data = fs.readFileSync(path.join(__dirname, '..', '/db/db.json'));  
    res.json(JSON.parse(data));  
});


apiRouter.post('/notes', (req, res) => {  
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '/db/db.json'), 'utf8')); 
    let newNote = { id: uuid.v4(), ...req.body };  
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '..', '/db/db.json'), JSON.stringify(notes));  
    res.json(newNote);  
});


apiRouter.delete('/notes/:id', (req, res) => { 
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '/db/db.json')));  
    notes = notes.filter(note => note.id !== req.params.id); 
    fs.writeFileSync(path.join(__dirname, '..', '/db/db.json'), JSON.stringify(notes)); 
    res.json({ message: `Note with id: ${req.params.id} deleted.` });  
}); 

module.exports = apiRouter;  