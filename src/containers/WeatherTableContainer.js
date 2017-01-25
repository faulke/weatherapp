import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import api from '../api/index';
import WeatherTable from '../components/home/WeatherTable';

// TODO: implement google autocomplete for addresses
class WeatherTableContainer extends Component {
  
  static handleItemClick(evt) {
    const url = evt.target.attributes['data-href'].value;
    browserHistory.push(url);
  }

  constructor(props) {
    super(props);
    this.state = { weather: null };
  }

  componentDidMount() {
    api.weather.getMultiple(this.props.cities, (err, data) => {
      this.setState({ weather: data });
    });
  }

  componentWillReceiveProps(nextProps) {
    api.weather.getMultiple(nextProps.cities, (err, data) => {
      this.setState({ weather: data });
    });
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

WeatherTableContainer.propTypes = {
  cities: React.PropTypes.array.isRequired,
};

export default WeatherTableContainer;
