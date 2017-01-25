import React, { Component, PropTypes } from 'react';
import Navbar from '../components/common/Navbar';
import CurrentWeather from '../components/weather/CurrentWeather';
import ForecastContainer from './ForecastContainer';
import api from '../api/index';

class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: this.props.location.query.lat,
        long: this.props.location.query.lon,
      },
      now: null,
      forecast: null,
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    this.getWeather();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      location: {
        lat: nextProps.location.query.lat,
        long: nextProps.location.query.lon,
      },
    }, () => {
      this.getWeather();
    });
  }

  getWeather() {
    const lat = this.state.location.lat;
    const long = this.state.location.long;
    api.weather.get(lat, long, (err, res) => {
      this.setState({ now: res[0], forecast: res[1].list });
    });
  }

  render() {
    if (!this.state.now) {
      return false;
    }
    const temp = Math.round(this.state.now.main.temp);
    const icon = this.state.now.weather[0].id;
    return (
      <div>
        <Navbar />
        <CurrentWeather current={this.state.now} temp={temp} icon={icon} />
        <ForecastContainer forecast={this.state.forecast} days={5} /> {/* TODO later: make days dynamic */}
      </div>
    );
  }
}

WeatherContainer.propTypes = {
  location: React.PropTypes.object,
};

export default WeatherContainer;
