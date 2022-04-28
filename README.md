# noteTaker 

## Description 
This application is meant to assist the user in taking notes. I was given starter code of a front end that had no backend Functionality. 
The goal was to create a server that would be able to respond to the requests that the front end was making
and to ensure that there was some level of data persistance, by saving the notes. The application also allows the user
to delete notes that they had previously created. 

## Link to Deployed Application

[Click to view the deployed application](https://fathomless-fjord-18353.herokuapp.com)

## Table of contents
  * [Technologies Employed](#technologies-employed)
  * [Key Functions](#key-functions)
  * [License](#license)
  * [Contact/Questions](#questions)
  * [Summary](#summary-and-learning-points)


## Technologies Employed

| Techlogy                    | Implementation/Use       |
|-----------------------------|--------------------------|
| Node.js                     | JavaScript runtime       |
| Node Package Manager        | Manage node packages     |
| Router                      | Modular Routing          |
| Express.js                  | Web framework            |
| Node file system            | Reading and writing to db|
| Uuid                        | Creating unique id's     |
| Heroku                      | Deployment               |


## Key Functionality
### notes.post
This was the route that was hit when the front end makes a post request. By reading the given code, I was able to anticipate
what I needed to have my server "listen" for, and prepare to do some work with the request. In this case, the function creates a new 
note object from the title and text, included in the request body, and does some additional work of adding a unique id, with the 
help of the uuid node package. 
```javascript
notes.post('/', (req, res) => {
  const { title, text } = req.body 
  if( title && text ){
    const newNote = {
      title, 
      text,
      id: uuid()
    }
```

After the new note object was generated, in order to update the 'database', the function first reads the db.json file,
and parses the information within into an array. Then the function pushes newNote to that array, and subsequently writes the noteArray
to the file, updated with the new note

```javascript
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
```

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Questions?
Please contact me at:

sgquin@gmail.com

Alternatively, visit my github: 

https://www.github.com/sharkby7e

## Summary and Learning Points
This project was a great opportunity to practice building a back end server, that is able to listen for requests. It 
was also a big exercise in collaboration, for we were given a significant amount of starter code to parse through. I spent
a larger chunk of my time on this project trying to understand the given code base than I had before, and I think that will 
be a big part of working in the future, and will be a valuable skill to have. Gaining a deeper understanding of the given code base
definitely helped in the development of the rest of the application, and made the process a lot smoother than if I hadn't taken
that time. 
