/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';

const port = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use(express.static('dist'));

app.get('/:lat/:long', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
