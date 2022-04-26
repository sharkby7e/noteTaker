const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

