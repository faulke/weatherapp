import express from 'express';
import request from 'request';
import crypto from 'crypto';
import compare from 'secure-compare';

const router = express.Router();

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('401 Not authorized.');
  }
  const basic = req.headers.authorization.split(' ')[1];
  const clientKey = crypto.createHmac('sha1', process.env.SECRET_KEY).update(basic).digest('hex');
  const authorized = compare(clientKey, process.env.API_KEY);
  if (!authorized) {
    return res.status(401).send('401 Not authorized.');
  }
  return next();
};

router.get('/geocode', auth, (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.search}&key=${process.env.GOOGLE_KEY}`;
  return req.pipe(request(url)).pipe(res);
});

router.get('/weather', auth, (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=imperial&APPID=${process.env.WEATHER_KEY}`;
  return req.pipe(request(url)).pipe(res);
});

router.get('/forecast', auth, (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&cnt=5&units=imperial&APPID=${process.env.WEATHER_KEY}`;
  return req.pipe(request(url)).pipe(res);
});

module.exports = router;