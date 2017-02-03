import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import api from '../api/index';
import WeatherTable from '../components/home/WeatherTable';
import Loader from '../components/common/Loader';
import { shouldFetchWeatherMultiple } from '../actions/index';

// TODO: implement google autocomplete for addresses
class WeatherTableContainer extends Component {

  componentDidMount() {
    this.props.shouldFetchWeatherMultiple(this.props.table);
  }

  render() {
    const { tableWeather } = this.props;
    if (tableWeather === null) {
      return false;
    }
    return (
      <WeatherTable weather={tableWeather} />
    );
  }
}

WeatherTableContainer.propTypes = {
  shouldFetchWeatherMultiple: React.PropTypes.func,
  table: React.PropTypes.array,
  tableWeather: React.PropTypes.array,
};

function mapStateToProps(state) {
  const { isFetching, tableWeather } = state.weather;
  return {
    isFetching,
    tableWeather,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shouldFetchWeatherMultiple: (locations) => dispatch(shouldFetchWeatherMultiple(locations)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherTableContainer);
