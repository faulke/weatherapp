import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import WeatherPage from './components/weather/CurrentWeather';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path=":lat/:long" component={WeatherPage} />
  </Route>
);
