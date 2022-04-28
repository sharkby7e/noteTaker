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

notes.delete('/:id', (req, res) => {
  const noteID = req.params.id;
  fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, db) => {
    if (err) {
      console.error(err);
    } else {
      const noteArray = JSON.parse(db);
      data = noteArray

      for (let i = 0; i < data.length; i++) {
        const currentNote = data[i];
        if (noteID === currentNote.id) {
          data.splice(i, 1)
        }
      }

      fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(noteArray, null, 4), (writeErr) =>
        writeErr ? console.error(writeErr) : console.log('Note Deleted from database!')
      );
      }
    res.send('note deleted');
  });
})


module.exports = notes
