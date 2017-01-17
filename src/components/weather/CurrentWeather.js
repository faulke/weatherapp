import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const CurrentWeather = (props) => {
  const current = props.current;
  const wind = Math.round(current.wind.speed);
  const description = current.weather[0].description;
  const iconClass = `wi wi-owm-${props.icon}`;

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
          <h1 className="main-temp">{props.temp}&deg;F</h1>
          <span><h5>Wind</h5><h6>{wind} mph</h6></span>
        </Col>
      </Row>
    </Grid>
  );
};

CurrentWeather.propTypes = {
  current: React.PropTypes.object.isRequired,
  icon: React.PropTypes.number.isRequired,
  temp: React.PropTypes.number.isRequired,
};

export default CurrentWeather;
