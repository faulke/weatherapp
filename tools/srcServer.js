/* eslint-disable no-console */
import express from 'express';
import async from 'async';
import request from 'request';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import favicon from 'serve-favicon';
import config from '../webpack.config.dev';

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use('/api/geocode', (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${req.query.type}=${req.query.search}&key=${process.env.GOOGLE_KEY}`;
  req.pipe(request(url)).pipe(res);
});

app.use('/api/weather/', (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=imperial&APPID=${process.env.WEATHER_KEY}`;
  req.pipe(request(url)).pipe(res);
});

app.use('/api/forecast/', (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&cnt=5&units=imperial&APPID=${process.env.WEATHER_KEY}`;
  req.pipe(request(url)).pipe(res);
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
