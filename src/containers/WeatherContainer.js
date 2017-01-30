import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/common/Navbar';
import CurrentWeather from '../components/weather/CurrentWeather';
import ForecastContainer from './ForecastContainer';
import { getWeather } from '../actions/index';

class WeatherContainer extends Component {

  componentDidMount() {
    const { lat, long } = this.props.params;
    this.props.getWeather(lat, long);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      const { lat, long } = nextProps.location;
      nextProps.getWeather(lat, long);
    }
  }

  render() {
    if (this.props.now == null) {
      return false;
    }
    const temp = Math.round(this.props.now.main.temp);
    const icon = this.props.now.weather[0].id;
    return (
      <div>
        <Navbar />
        <CurrentWeather current={this.props.now} temp={temp} icon={icon} />
        <ForecastContainer forecast={this.props.forecast} days={5} /> {/* TODO later: make days dynamic */}
      </div>
    );
  }
}

WeatherContainer.propTypes = {
  getWeather: React.PropTypes.func.isRequired,
  now: React.PropTypes.object,
  forecast: React.PropTypes.array,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  const { now, forecast, location } = state.weather;
  return {
    now,
    forecast,
    location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWeather: (lat, long) => dispatch(getWeather(lat, long)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
