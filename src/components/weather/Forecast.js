import React, { PropTypes } from 'react';
import { Clearfix, Grid, Row, Col } from 'react-bootstrap';
import styles from './forecast.less';

// TODO: take care of manipulating data in container and return only data needed.
const Forecast = ({ data, days, celsius }) => {
  const units = celsius ? 'C' : 'F';
  return (
    <Row className={styles.forecast}>
      <Col lg={1} md={1} sm={1} />
      {days.map((x, i) => {
        const icon = `wi wi-owm-${data[i].weather[0].id}`;
        let temp = Math.round(data[i].temp.max);
        temp = celsius ? parseInt((temp - 32) * (5 / 9), 10) : temp;
        return (
          <Col key={i} className={styles.forecastDayContainer} lg={2} lgOffset={0} md={2} mdOffset={0} sm={2} smOffset={0} xs={8} xsOffset={2}>
            <div className={styles.forecastDay}>
              <span className={styles.dayName}>{x}</span>
              <div className={styles.dayWeather}>
                <i className={icon} />
                <span className={styles.temp}>{temp}&deg;{units}</span>
              </div>
            </div>
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