import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import Navbar from '../common/Navbar';
import WeatherApi from '../../api/weatherApi';

const CurrentWeather = (props) => {
  const current = props.current;
  const temp = Math.round(current.main.temp);
  const wind = Math.round(current.wind.speed);
  const icon = current.weather[0].id;
  const description = current.weather[0].description;
  const iconClass = `wi wi-owm-${icon}`;

  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <Col xs={6} xsOffset={3} className="text-center">
            <h1>{current.name}</h1>
          </Col>
        </Row>
        <Row className="text-center">
          <Col sm={2} smOffset={3}>
            <h1><i className={iconClass} /></h1>
            <h3>{description}</h3>
          </Col>
          <Col sm={2}>
            <h1>{temp}&deg;F</h1>
          </Col>
          <Col sm={2}>
            <h3>Wind</h3>
            <h4>{wind} mph</h4> 
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

CurrentWeather.propTypes = {
  current: React.PropTypes.object.isRequired,
};

export default CurrentWeather;
