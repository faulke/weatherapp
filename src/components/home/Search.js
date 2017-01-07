import React, { Component } from 'react';

// TODO: implement google autocomplete for addresses
class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    this.props.onSubmit(evt);
    evt.preventDefault();
  }

  handleChange(evt) {
    this.props.onChange(evt);
  }

  render() {
    return (
      <div className="text-center">
        <span className="glyphicon glyphicon-cloud" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" value={this.props.value} onChange={this.handleChange} placeholder="City, ST" size="50" />
            <span className="help-block" />
            <button type="submit" className="btn btn-primary" data-loading-text="Searching...">
              Search {'\u00A0'}
              <span className="glyphicon glyphicon-search" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
