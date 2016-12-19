import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import WeatherApi from '../../api/mockWeather';

class HomePage extends React.Component {

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          window.location = `/weather/${lat}/${long}`;
        }
      });
    }
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Home Page</h1>
        <p>Search</p>
      </div>
    );
  }
}

export default HomePage;
