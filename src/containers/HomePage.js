// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import WeatherApi from '../api/weatherApi';
import SearchContainer from './SearchContainer';
import WeatherTableContainer from './WeatherTableContainer';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCity: '',
      tableCities: null,
    };
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          WeatherApi.searchWeather('latlng', `${lat},${long}`, (err, data) => {
            for (let i = 0; i < data.results.length; i += 1) {
              if (data.results[i].types.indexOf('locality') > -1) {
                this.setState({
                  inputCity: data.results[i].formatted_address,
                  tableCities: this.setWeatherTable({ lat, long }),
                });
                break;
              }
            }
          });
           // if location, suggest location for weather
           // browserHistory.push(`/${lat}/${long}`);
        }
      });
    }
  }

// return array of lat/longs for 3 cities and pass to WeatherTableContainer for api calls
  setWeatherTable(main) {
    const first = main || { lat: 45, long: 113 };
    const second = { lat: 45, long: 113 };
    const third = { lat: 47, long: 113 };
    return [first, second, third];
  }

// TODO: render weather table with 3 default cities, icon, and temp
// TODO later: user can save 3 specific locations that pop up when logged in
  render() {
    return (
      <div className="container-fluid">
        <SearchContainer city={this.state.inputCity} />
        <WeatherTableContainer cities={this.state.tableCities} />
      </div>
    );
  }
}

export default HomePage;
