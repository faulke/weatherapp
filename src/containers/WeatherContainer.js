import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/common/Navbar';
import CurrentWeather from '../components/weather/CurrentWeather';
import ForecastContainer from './ForecastContainer';
import Loader from '../components/common/Loader';
import { shouldFetchWeather } from '../actions/index';

class WeatherContainer extends Component {

  componentDidMount() {
    const { lat, long } = this.props.params;
    this.props.shouldFetchWeather(lat, long);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      const { lat, long } = nextProps.params;
      nextProps.shouldFetchWeather(lat, long);
    }
  }

  render() {
    const { now, forecast, isFetching } = this.props;
    if (now === null) {
      return false;
    }
    const temp = Math.round(now.main.temp);
    const icon = now.weather[0].id;
    return (
      <div>
        <Navbar />
        { isFetching ? (<Loader />) : (
          <div>
            <CurrentWeather current={now} temp={temp} icon={icon} />
            <ForecastContainer forecast={forecast} days={5} />
          </div>
        )}
      </div>
    );
  }
}

WeatherContainer.propTypes = {
  shouldFetchWeather: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  now: React.PropTypes.object,
  forecast: React.PropTypes.array,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  const { now, forecast, location, isFetching } = state.weather;
  return {
    now,
    forecast,
    location,
    isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shouldFetchWeather: (lat, long) => dispatch(shouldFetchWeather(lat, long)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
