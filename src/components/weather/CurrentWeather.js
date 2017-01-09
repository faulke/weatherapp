import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Navbar from '../common/Navbar';
import WeatherApi from '../../api/weatherApi';

class CurrentWeather extends React.Component {
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
    const city = this.state.now.name;
    const temp = Math.round(this.state.now.main.temp);
    const icon = this.state.now.weather[0].id;
    return (
      <div>
        <Navbar temp={temp} city={city} icon={icon} />
        <div className="container-fluid">
          <div className="jumbotron">
            <h1>Weather</h1>
            {city}
          </div>
        </div>
      </div>
    );
  }
}

CurrentWeather.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default CurrentWeather;

// TODO: Add props for weather parameters