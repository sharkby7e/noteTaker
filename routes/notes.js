const notes = require('express').Router() 
const {v4:uuid} = require('uuid')
const fs = require('fs')
const path = require('path')

let data = require('../db/db.json')

notes.get('/', (req, res) => {
  console.log('get request received')
  res.json(data)
})

notes.post('/', (req, res) => {
  const { title, text } = req.body 
  if( title && text ){
    const newNote = {
      title, 
      text,
      id: uuid()
    }

    fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, db) => {
      if (err) {
        console.error(err);
      } else {
        const noteArray = JSON.parse(db);

        noteArray.push(newNote);
        data = noteArray

        fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(noteArray, null, 4), (writeErr) =>
          writeErr ? console.error(writeErr) : console.log('New note saved to database!')
        );
      }
    });

    const response = {
      status: 'Note Saved',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('error, please try again');
  }
  
})

// notes.delete('/:id', (req, res) => {

// })


module.exports = notes
