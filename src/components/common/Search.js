import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const Search = props => (
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

Search.propTypes = {
  inline: React.PropTypes.bool,
  place: React.PropTypes.string,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  size: React.PropTypes.string,
};

export default Search;
