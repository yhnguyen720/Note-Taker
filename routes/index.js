const express = require('express');
const { v4: uuidv4 } = require('uuid');
const notes = require('./notes');

const app = express();

app.use('/notes', notes);

module.exports = app;