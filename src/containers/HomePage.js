// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import WeatherApi from '../api/weatherApi';
import SearchContainer from './SearchContainer';
import WeatherTableContainer from './WeatherTableContainer';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [
        { lat: 54, long: 112 },
        { lat: 45, long: 113 },
        { lat: 47, long: 113 },
      ],
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
                  table: this.setWeatherTable(this.state.table, { lat, long }),
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
  setWeatherTable(table, main) {
    const newTable = table;
    newTable[0] = main;
    return newTable;
  }

// TODO: render weather table with 3 default cities, icon, and temp
// TODO later: user can save 3 specific locations that pop up when logged in
  render() {
    return (
      <div className="container-fluid">
        <div id="home-search" className="text-center">
          <SearchContainer inline={false} />
        </div>
        <WeatherTableContainer cities={this.state.table} />
      </div>
    );
  }
}

export default HomePage;
