import React from 'react';
import { InputGroup, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const Search = props => (
  <form className={props.place} onSubmit={props.onSubmit}>
    <FormGroup>
      <InputGroup>
        <FormControl 
          type="text"
          placeholder="City, ST" 
          value={props.value} 
          onChange={props.onChange} 
          size={props.size} 
        />
        <InputGroup.Button>
          <Button type="submit" bsStyle="primary">
            <span className="glyphicon glyphicon-search" />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </form>
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
