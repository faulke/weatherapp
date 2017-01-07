import React from 'react';
import { Table } from 'react-bootstrap';
import WeatherApi from '../../api/weatherApi';

// TODO: implement google autocomplete for addresses
class WeatherTable extends React.Component {
  render() {
    return (
      <Table bordered condensed hover>
        <tbody>
          {
            this.props.weather.map(x => <tr key={x.id}><td>{x.name}</td></tr>)
          }
        </tbody>
      </Table>
    );
  }
}

export default WeatherTable;
