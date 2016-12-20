/* eslint-disable no-console */
import express from 'express';
import async from 'async';
import request from 'request';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';

const googleKey = process.env.GOOGLE_KEY;
const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
