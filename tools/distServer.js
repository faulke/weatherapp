/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import api from './routes/api';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use(express.static('dist'));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
