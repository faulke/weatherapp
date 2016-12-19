import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import WeatherApi from '../../api/mockWeather';

class WeatherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: {},
      forecast: {},
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather() {
    const lat = this.props.params.lat;
    const long = this.props.params.long;
    WeatherApi.getWeather(lat, long, (err, res) => {
      this.setState({ now: res[0], forecast: res[1] });
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Weather</h1>
        <p>{this.state.now.name}</p>
      </div>
    );
  }
}

WeatherPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default WeatherPage;