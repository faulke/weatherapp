import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import WeatherApi from '../api/weatherApi';
import WeatherTable from '../components/home/WeatherTable';

// TODO: implement google autocomplete for addresses
class WeatherTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { weather: null };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount() {
    WeatherApi.getWeatherMultiple(this.props.cities, (err, data) => {
      this.setState({ weather: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    WeatherApi.getWeatherMultiple(nextProps.cities, (err, data) => {
      this.setState({ weather: data });
    });
  }

  handleItemClick(evt) {
    const url = evt.target.attributes['data-href'].value;
    browserHistory.push(url);
  }

  render() {
    if (!this.state.weather) {
      return false;  // or return loader
    }
    return (
      <WeatherTable weather={this.state.weather} onClick={this.handleItemClick} />
    );
  }
}

export default WeatherTableContainer;
