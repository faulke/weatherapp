// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import WeatherApi from '../../api/weatherApi';
import CurrentWeather from '../weather/CurrentWeather';
import Search from './Search';
import WeatherTable from './WeatherTable';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(evt, search) { // TODO: move this to it's own module
    evt.preventDefault();
    
    WeatherApi.searchWeather('address', search.value, (err, data) => {
      if (!err && data.results.length) {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        browserHistory.push(`/${lat}/${long}`); // change url with input to render weather component
      } // TODO: Add error handling (e.g., "That location doesn't exist...try another")
    });
  }

// TODO: render weather table with 3 default cities, icon, and temp
// TODO later: user can save 3 specific locations that pop up when logged in
  render() {
    return (
      <div className="container-fluid">
        <Search onSubmit={this.submitForm} />
        <WeatherTable />
      </div>
    );
  }
}

export default HomePage;
