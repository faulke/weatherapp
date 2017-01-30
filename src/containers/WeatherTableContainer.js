import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import api from '../api/index';
import WeatherTable from '../components/home/WeatherTable';
import { getWeatherMultiple } from '../actions/index';

// TODO: implement google autocomplete for addresses
class WeatherTableContainer extends Component {

  componentDidMount() {
    this.props.getWeatherMultiple(this.props.table);
  }

  render() {
    if (!this.props.tableWeather) {
      return false;  // or return loader
    }
    return (
      <WeatherTable weather={this.props.tableWeather} />
    );
  }
}

WeatherTableContainer.propTypes = {
  getWeatherMultiple: React.PropTypes.func,
  table: React.PropTypes.array,
  tableWeather: React.PropTypes.array,
};

function mapStateToProps(state) {
  const { tableWeather } = state.weather;
  return {
    tableWeather,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWeatherMultiple: (locations) => dispatch(getWeatherMultiple(locations)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherTableContainer);
