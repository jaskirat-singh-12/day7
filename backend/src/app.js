const express = require('express');
const songsRouter = require('./routes/song.routes')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

app.use('/', songsRouter)

module.exports = app;