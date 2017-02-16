import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './currentWeather.less';

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
    <Grid className={styles.currentWeather}>
      <Row className={styles.cityRow}>
        <Col xs={12} xsOffset={0}>
          <span className={styles.cityName}>{current.name}</span>
        </Col>
      </Row>
      <Row className={styles.weatherRow}>
        <Col sm={4} smOffset={4} xs={12} xsOffset={0}>
          <div className={styles.descriptionContainer}>
            <i className={`${iconClass} ${styles.icon}`} />
            <span className={styles.description}>{description}</span>
          </div>
          <div className={styles.tempContainer}>
            <span className={styles.temp}>{temp}&deg;{units}</span>
            <span className={styles.wind}><h5>Wind</h5><h6>{wind} mph</h6></span>
          </div>
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
