/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import api from './routes/api';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use(express.static('dist'));

const whitelist = ['https://staging.simpleweather.us', 'https://simpleweather.us']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use('/api', api);

app.options('*', cors(corsOptions));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
