import React from 'react';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const WeatherTable = ({ weather }) => (
  <Table bordered condensed hover>
    <tbody>
      {
        weather.map((x) => {
          const url = `/${x.coord.lat}/${x.coord.lon}`;
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
                  <span>{temp}&deg;F</span>
                </Link>
              </td>
            </tr>
          );
        })
      }
    </tbody>
  </Table>
);

WeatherTable.propTypes = {
  weather: React.PropTypes.array.isRequired,
};

export default WeatherTable;
