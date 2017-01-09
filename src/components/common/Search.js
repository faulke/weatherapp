import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const Search = (props) => {
  return (
    <Form inline={props.inline} className={props.place} onSubmit={props.onSubmit}>
      <FormGroup>
        <FormControl 
          type="text" 
          placeholder="City, ST" 
          value={props.value} 
          onChange={props.onChange} 
          size={props.size} 
        />
        <Button type="submit" bsStyle="primary">
          Search {'\u00A0'}
          <span className="glyphicon glyphicon-search" />
        </Button>
      </FormGroup>
    </Form>
  );
};

export default Search;
