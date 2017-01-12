import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import Forecast from '../components/weather/Forecast';
import WeatherApi from '../api/weatherApi';

class ForecastContainer extends Component {
  componentWillMount() {
    const days = this.getDays();
    console.log(days);
  }

  getDays() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const newDays = [];
    for (let i = 0; i < this.props.days; i += 1) {
      d.setDate(d.getDate() + 1);
      newDays.push(days[d.getDay()]);
    }
    return newDays; 
  }

  render() {
    return (
      <Grid>
        <Forecast data={this.props.forecast} days={this.getDays()} />
      </Grid>
    );
  }
}

ForecastContainer.propTypes = {
  days: React.PropTypes.number.isRequired,
  forecast: React.PropTypes.array.isRequired,
};

export default ForecastContainer;
