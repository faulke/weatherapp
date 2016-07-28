const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('html/index.html'));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
