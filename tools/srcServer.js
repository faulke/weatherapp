/* eslint-disable no-console */
import express from 'express';
import async from 'async';
import request from 'request';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import favicon from 'serve-favicon';
import api from './routes/api';
import config from '../webpack.config.dev';

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.dev.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
