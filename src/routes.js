import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './containers/HomePage';
import WeatherPage from './containers/WeatherContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="home" component={HomePage} />
    <Route path="weather/:lat/:long" component={WeatherPage} />
  </Route>
);
