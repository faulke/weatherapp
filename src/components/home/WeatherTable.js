import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Table } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const WeatherTable = ({ weather }) => (
  <Grid>
    <Row>
      <Col sm={4} smOffset={4}>
        <Table bordered condensed hover className="weather-table">
          <tbody>
            {
              weather.map((x) => {
                const url = `/weather/${x.coord.lat}/${x.coord.lon}`;
                const icon = `wi wi-owm-${x.weather[0].id}`;
                const temp = Math.round(x.main.temp);
                return (
                  <tr key={x.id}>
                    <td>
                      <Link to={url}>
                        <span>{x.name}</span>
                        {' '}
                        <i className={icon} />
                        {' '}
                        <span className="pull-right">{temp}&deg;F</span>
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
};

export default WeatherTable;
