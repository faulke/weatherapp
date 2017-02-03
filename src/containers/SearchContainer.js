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
    this.props.searchLocation(search);
  }

  updateInput(evt) {
    this.props.updateSearch(evt);
  }

  render() {
    const { place, input, size } = this.props;
    return (
      <Search 
        place={place} 
        value={input} 
        onSubmit={this.submitForm} 
        onChange={this.updateInput} 
        size={size}
      />
    );
  }
}

SearchContainer.propTypes = {
  searchLocation: React.PropTypes.func.isRequired,
  updateSearch: React.PropTypes.func,
  input: React.PropTypes.string,
  search: React.PropTypes.string,
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
