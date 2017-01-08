import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import WeatherApi from '../api/weatherApi';
import Search from '../components/common/Search';

// TODO: implement google autocomplete for addresses
class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '' };

    this.submitForm = this.submitForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  submitForm(evt) {
    evt.preventDefault();
    WeatherApi.searchWeather('address', this.state.city, (err, data) => {
      if (!err && data.results.length) {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        browserHistory.push(`/${lat}/${long}`); // change url with input to render weather component
      } // TODO: Add error handling (e.g., "That location doesn't exist...try another")
    });
  }

  updateInput(evt) {
    this.setState({ city: evt.target.value });
  }

  render() {
    return (
      <Search value={this.state.city} onSubmit={this.submitForm} onChange={this.updateInput} size={this.props.size} />
    );
  }
}

export default SearchContainer;