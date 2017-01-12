import React, { PropTypes } from 'react';
import { Clearfix, Grid, Row, Col } from 'react-bootstrap';

// TODO: take care of manipulating data in container and return only data needed.
const Forecast = (props) => {
  const weather = props.data;
  return (
    <Row className="show-grid">
      <Col sm={2} />
      {props.days.map((x, i) => {
        return (
          <Col key={i} sm={2}>
            <h4>{x}</h4>
            <h3>{weather[i].temp.max}</h3>
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