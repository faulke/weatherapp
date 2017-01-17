import React, { Component, PropTypes } from 'react';
import Navbar from '../components/common/Navbar';
import CurrentWeather from '../components/weather/CurrentWeather';
import ForecastContainer from './ForecastContainer';
import WeatherApi from '../api/weatherApi';

class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: this.props.params.lat,
        long: this.props.params.long,
      },
      now: null,
      forecast: null,
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentWillMount() {
    this.getWeather();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      location: {
        lat: nextProps.params.lat,
        long: nextProps.params.long,
      },
    }, () => {
      this.getWeather();
    });
  }

  getWeather() {
    const lat = this.state.location.lat;
    const long = this.state.location.long;
    WeatherApi.getWeather(lat, long, (err, res) => {
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
  params: React.PropTypes.object.isRequired,
};

export default WeatherContainer;
