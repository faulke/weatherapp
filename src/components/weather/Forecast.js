import React, { PropTypes } from 'react';
import { Clearfix, Grid, Row, Col } from 'react-bootstrap';

// TODO: take care of manipulating data in container and return only data needed.
const Forecast = ({ data, days, celsius }) => {
  const units = celsius ? 'C' : 'F';
  return (
    <Row className="forecast text-center">
      {days.map((x, i) => {
        const icon = `wi wi-owm-${data[i].weather[0].id}`;
        let temp = Math.round(data[i].temp.max);
        temp = celsius ? parseInt((temp - 32) * (5 / 9), 10) : temp;
        return (
          <Col key={i} className="forecast-day">
            <h4>{x}</h4>
            <h2><i className={icon} /></h2>
            <h3>{temp}&deg;{units}</h3>
          </Col>
        );
      })}
    </Row>
  );
};

Forecast.propTypes = {
  data: React.PropTypes.array.isRequired,
  days: React.PropTypes.array.isRequired,
  celsius: React.PropTypes.bool.isRequired,
};

export default Forecast;