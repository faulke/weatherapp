import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Navbar from '../common/Navbar';
import WeatherApi from '../../api/weatherApi';
import Search from '../home/Search';

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: this.props.params.lat,
        long: this.props.params.long,
      },
      now: {},
      forecast: {},
    };
    this.getWeather = this.getWeather.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather() {
    const lat = this.state.location.lat;
    const long = this.state.location.long;
    WeatherApi.getWeather(lat, long, (err, res) => {
      this.setState({ now: res[0], forecast: res[1] });
    });
  }

  submitForm(evt, search) {
    evt.preventDefault();
    
    WeatherApi.searchWeather('address', search.value, (err, data) => {
      if (!err && data.results.length) {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        this.setState({
          location: {
            lat,
            long,
          },
        }, () => {
          this.getWeather();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar value={this.state.search} onSubmit={this.submitForm} onChange={this.handleChange} />
        <div className="container-fluid">
          <div className="jumbotron">
            <h1>Weather</h1>
            {this.state.now.name}
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