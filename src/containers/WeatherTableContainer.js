import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import WeatherApi from '../api/weatherApi';
import WeatherTable from '../components/home/WeatherTable';

// TODO: implement google autocomplete for addresses
class WeatherTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { weather: null };
  }

  componentWillReceiveProps(nextProps) {
    WeatherApi.getWeatherMultiple(nextProps.cities, (err, data) => {
      this.setState({ weather: data });
    });
  }

  handleClick() {
    // get lat long attributes for city and browserHistory.push new url
  }

  render() {
    const table = this.state.weather ?
      <WeatherTable weather={this.state.weather} onClick={this.handleClick} /> :
      <div />;
    return (
      table
    );
  }
}

export default WeatherTableContainer;
