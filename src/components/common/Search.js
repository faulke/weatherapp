import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const Search = (props) => {
  return (
    <Form inline className="navbar-form navbar-right" onSubmit={props.onSubmit}>
      <FormGroup>
        <FormControl type="text" placeholder="City, ST" value={props.value} onChange={props.onChange} size={props.size} />
      </FormGroup>
      {' '}
      <Button type="submit" bsStyle="primary">
        Search {'\u00A0'}
        <span className="glyphicon glyphicon-search" />
      </Button>
    </Form>
  );
};

export default Search;
