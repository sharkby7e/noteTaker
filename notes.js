const notes = require('express').Router() 
notes.get('/', (req, res) => {
  res.send('hello')
})
module.exports = notes
