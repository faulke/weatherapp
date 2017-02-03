import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import Forecast from '../components/weather/Forecast';
import api from '../api/index';

class ForecastContainer extends Component {

  constructor(props) {
    super(props);

    this.getDays = this.getDays.bind(this);
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
    const { forecast, celsius } = this.props;
    return (
      <Grid>
        <Forecast data={forecast} days={this.getDays()} celsius={celsius} />
      </Grid>
    );
  }
}

ForecastContainer.propTypes = {
  days: React.PropTypes.number.isRequired,
  forecast: React.PropTypes.array.isRequired,
  celsius: React.PropTypes.bool.isRequired,
};

export default ForecastContainer;
