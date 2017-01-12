import React, { Component, PropTypes } from 'react';
import Navbar from '../components/common/Navbar';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherApi from '../api/weatherApi';

class CurrentWeatherContainer extends Component {
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
      this.setState({ now: res[0], forecast: res[1] });
    });
  }

  render() {
    if (!this.state.now) {
      return false;
    }
    const temp = Math.round(this.state.now.main.temp);
    const city = this.state.now.name;
    const icon = this.state.now.weather[0].id;
    return (
      <div>
        <Navbar temp={temp} city={city} icon={icon} />
        <CurrentWeather current={this.state.now} />
      </div>
    );
  }
}

CurrentWeatherContainer.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default CurrentWeatherContainer;

// TODO: Add props for weather parameters