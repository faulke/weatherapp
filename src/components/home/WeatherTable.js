import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import styles from './weatherTable.less';

// TODO: implement google autocomplete for addresses
const WeatherTable = ({ celsius, weather }) => (
  <Grid>
    <Row>
      <Col sm={4} smOffset={4}>
        <Table bordered condensed hover className="weather-table">
          <tbody>
            {
              weather.map((x) => {
                const url = `/weather/${x.coord.lat}/${x.coord.lon}`;
                const icon = `wi wi-owm-${x.weather[0].id}`;
                let units;
                let temp = Math.round(x.main.temp);
                if (celsius) {
                  temp = parseInt((temp - 32) * (5 / 9), 10);
                  units = 'C';
                } else {
                  units = `F`;
                }
                return (
                  <tr key={x.id}>
                    <td className={styles.link}>
                      <Link to={url}>
                        <span>{x.name}</span>
                        {' '}
                        <i className={icon} />
                        {' '}
                        <span className="pull-right">{temp}&deg;{units}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Col>
    </Row>
  </Grid>
);

WeatherTable.propTypes = {
  weather: React.PropTypes.array.isRequired,
  celsius: React.PropTypes.bool.isRequired,
};

export default WeatherTable;
