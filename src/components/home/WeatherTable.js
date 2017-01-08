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
            return <tr key={x.id}><td data-href={url} onClick={onClick}>{x.name}</td></tr>;
          })
        }
      </tbody>
    </Table>
  );
};

export default WeatherTable;
