import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
// TODO: these can just be props and handled in the container
  handleSubmit(evt) {
    this.props.onSubmit(evt);
    evt.preventDefault();
  }

  handleChange(evt) {
    this.props.onChange(evt);
  }

  render() {
    return (
      <Form inline className="navbar-form navbar-right" onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormControl type="text" placeholder="City, ST" value={this.props.value} onChange={this.handleChange} size={this.props.size} />
        </FormGroup>
        {' '}
        <Button type="submit" bsStyle="primary">
          Search {'\u00A0'}
          <span className="glyphicon glyphicon-search" />
        </Button>
      </Form>
    );
  }
}

export default Search;
