import React from 'react';
import WeatherApi from '../../api/weatherApi';
import { Table } from 'react-bootstrap';
// TODO: implement google autocomplete for addresses
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

  }

  componentDidMount() {

  }

  render() {
    return (
      <Table bordered condensed hover>
        <tbody>
          <tr><td>City 1 (icon) temp</td></tr>
          <tr><td>City 2 (icon) temp</td></tr>
        </tbody>
      </Table>
    );
  }
}

Search.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default Search;