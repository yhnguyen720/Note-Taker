const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/index');

const PORT = process.env.PORT || 3306;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => res.redirect('/'));

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
})