import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const CurrentWeather = ({ current, icon, celsius }) => {
  const wind = Math.round(current.wind.speed);
  const description = current.weather[0].description;
  const iconClass = `wi wi-owm-${icon}`;
  let units;
  let temp = Math.round(current.main.temp);
  if (celsius) {
    temp = parseInt((temp - 32) * (5 / 9), 10);
    units = 'C';
  } else {
    units = `F`;
  }

  return (
    <Grid>
      <Row className="main-city">
        <Col xs={6} xsOffset={3} className="text-center">
          <h1>{current.name}</h1>
        </Col>
      </Row>
      <Row className="main-weather text-center">
        <Col sm={2} smOffset={4}>
          <i className={`${iconClass} main-icon`} />
          <h4>{description}</h4>
        </Col>
        <Col sm={2}>
          <h1 className="main-temp">{temp}&deg;{units}</h1>
          <span><h5>Wind</h5><h6>{wind} mph</h6></span>
        </Col>
      </Row>
    </Grid>
  );
};

CurrentWeather.propTypes = {
  current: React.PropTypes.object.isRequired,
  icon: React.PropTypes.number.isRequired,
  celsius: React.PropTypes.bool.isRequired,
};

export default CurrentWeather;
