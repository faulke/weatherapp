import React from 'react';
// TODO: implement google autocomplete for addresses
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    this.props.onSubmit(evt, this.state);
    evt.preventDefault();
  }

  handleChange(evt) {
    this.setState({ value: evt.target.value });
  }

  render() {
    return (
      <div className="text-center">
        <span className="glyphicon glyphicon-cloud" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="City, ST" size="50" />
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

Search.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default Search;
