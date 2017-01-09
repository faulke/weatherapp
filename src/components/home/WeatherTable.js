import React from 'react';
import { Table } from 'react-bootstrap';
import WeatherApi from '../../api/weatherApi';

// TODO: implement google autocomplete for addresses
const WeatherTable = ({ weather, onClick }) => {
  return (
    <Table bordered condensed hover>
      <tbody>
        {
          weather.map((x) => {
            const url = `${x.coord.lat}/${x.coord.lon}`;
            const icon = `wi wi-owm-${x.weather[0].id}`;
            const temp = Math.round(x.main.temp);
            return (
              <tr key={x.id}>
                <td data-href={url} onClick={onClick}>
                  <span>{x.name}</span>
                  {' '}
                  <i className={icon} />
                  {' '}
                  <span>{temp}&deg;F</span>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};

export default WeatherTable;
