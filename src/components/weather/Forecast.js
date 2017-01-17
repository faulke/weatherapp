import React, { PropTypes } from 'react';
import { Clearfix, Grid, Row, Col } from 'react-bootstrap';

// TODO: take care of manipulating data in container and return only data needed.
const Forecast = (props) => {
  const weather = props.data;
  return (
    <Row className="forecast text-center">
      {props.days.map((x, i) => {
        const icon = `wi wi-owm-${weather[i].weather[0].id}`;
        return (
          <Col key={i} className="forecast-day">
            <h4>{x}</h4>
            <h2><i className={icon} /></h2>
            <h3>{Math.round(weather[i].temp.max)}&deg;F</h3>
          </Col>
        );
      })}
    </Row>
  );
};

Forecast.propTypes = {
  data: React.PropTypes.array.isRequired,
  days: React.PropTypes.array.isRequired,
};

export default Forecast;