// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import WeatherApi from '../../api/weatherApi';
import CurrentWeather from '../weather/CurrentWeather';
import Search from './Search';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.submitForm = this.submitForm.bind(this);
  }
  
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          browserHistory.push(`/${lat}/${long}`); // if location, change url to render weather component
        }
      });
    }
  }

  submitForm(evt, search) { // TODO: move this to it's own module
    evt.preventDefault();
    
    WeatherApi.searchWeather(search.value, (err, data) => {
      if (!err && data.results.length) {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        browserHistory.push(`/${lat}/${long}`); // change url with input to render weather component
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Search value={this.state.value} onSubmit={this.submitForm} />
      </div>
    ); // if no location, this is fired and only search component is present
  }
}

export default HomePage;
