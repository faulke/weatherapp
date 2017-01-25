// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import api from '../api/index';
import SearchContainer from './SearchContainer';
import WeatherTableContainer from './WeatherTableContainer';

class HomePage extends Component {
  // return array of lat/longs for 3 cities and pass to WeatherTableContainer for api calls
  static setWeatherTable(table, main) {
    const newTable = table;
    newTable[0] = main;
    return newTable;
  }

  constructor(props) {
    super(props);
    this.state = {
      table: [
        { lat: null, long: null },
        { lat: 45, long: -113 },
        { lat: 47, long: -113 },
      ],
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      let lat;
      let long;
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          api.search('latlng', `${lat},${long}`, (err, data) => {
            for (let i = 0; i < data.results.length; i += 1) {
              if (data.results[i].types.indexOf('locality') > -1) {
                this.setState({
                  table: HomePage.setWeatherTable(this.state.table, { lat, long }),
                });
                break;
              }
            }
          });
        }
      });
      setTimeout(() => {
        if (!lat || !long) {
          this.setState({
            table: HomePage.setWeatherTable(this.state.table, { lat: 55, long: -113 }),
          });
        }
      }, 500);
    }
  }

// TODO: user can save 3 specific locations that pop up when logged in
  render() {
    if (this.state.table[0].lat == null) {
      return false;
    }
    return (
      <div className="container-fluid">
        <Grid id="home-search">
          <Col sm={4} smOffset={4}>
            <SearchContainer inline={true} />
          </Col>
        </Grid>
        <WeatherTableContainer cities={this.state.table} />
      </div>
    );
  }
}

export default HomePage;
