import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const CurrentWeather = (props) => {
  const current = props.current;
  const wind = Math.round(current.wind.speed);
  const description = current.weather[0].description;
  const iconClass = `wi wi-owm-${props.icon}`;

  return (
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
          <h1>{props.temp}&deg;F</h1>
        </Col>
        <Col sm={2}>
          <h3>Wind</h3>
          <h4>{wind} mph</h4> 
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
