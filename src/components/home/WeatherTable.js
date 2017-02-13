import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import styles from './weatherTable.less';

// TODO: implement google autocomplete for addresses
const WeatherTable = ({ celsius, weather }) => (
  <Grid>
    <Row>
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
        <Table bordered condensed hover className={styles.weatherTable}>
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
                  <tr key={x.id} className={styles.tableRow}>
                    <td className={styles.link}>
                      <Link to={url}>
                        <span>{x.name}</span>
                        <span className={`fa fa-arrow-circle-right ${styles.arrow}`} />
                        <div className={styles.weather}>
                          <i className={icon} />
                          <span className={styles.temp}>{temp}&deg;{units}</span>
                        </div>
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
