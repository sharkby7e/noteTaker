const notes = require('express').Router() 
const data = require('../db/db.json')

notes.get('/notes', (req, res) => {
  res.json(data)
})

notes.get('/notes', (req, res) => {
  res.json(data)
})

module.exports = notes
