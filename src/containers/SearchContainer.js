import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import api from '../api/index';
import Search from '../components/common/Search';
import { searchLocation, updateSearch } from '../actions/index';

// TODO: implement google autocomplete for addresses
class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  submitForm(evt) {
    evt.preventDefault();
    const search = this.props.search;
    api.search('address', this.props.search, (err, data) => {
      if (!err && data.results.length) {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        browserHistory.replace(`/weather?lat=${lat}&lon=${long}`);  // change url with input to render weather component
      } // TODO: Add error handling (e.g., "That location doesn't exist...try another")
    });
  }

  updateInput(evt) {
    this.props.updateSearch(evt);
  }

  render() {
    return (
      <Search 
        inline={this.props.inline} 
        place={this.props.place} 
        value={this.props.input} 
        onSubmit={this.submitForm} 
        onChange={this.updateInput} 
        size={this.props.size} 
      />
    );
  }
}

SearchContainer.propTypes = {
  updateSearch: React.PropTypes.func,
  input: React.PropTypes.string,
  search: React.PropTypes.string,
  inline: React.PropTypes.bool,
  place: React.PropTypes.string,
  size: React.PropTypes.string,
};

function mapStateToProps(state) {
  const { input, search } = state.weather;
  return {
    input,
    search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearch: input => dispatch(updateSearch(input)),
    searchLocation: search => dispatch(searchLocation(search)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
