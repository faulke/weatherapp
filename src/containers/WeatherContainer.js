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
    const { now, forecast, isFetching, celsius } = this.props;
    if (now === null) {
      return false;
    }
    const icon = now.weather[0].id;
    return (
      <div>
        <Navbar />
        { isFetching ? (<Loader />) : (
          <div>
            <CurrentWeather current={now} icon={icon} celsius={celsius} />
            <ForecastContainer forecast={forecast} days={5} celsius={celsius} />
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
  celsius: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { now, forecast, location, isFetching, celsius } = state.weather;
  return {
    now,
    forecast,
    location,
    isFetching,
    celsius,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shouldFetchWeather: (lat, long) => dispatch(shouldFetchWeather(lat, long)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
