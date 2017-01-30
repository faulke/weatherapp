import React from 'react';
import { InputGroup, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

// TODO: implement google autocomplete for addresses
const Search = ({ place, onSubmit, onChange, value, size }) => (
  <form className={place} onSubmit={onSubmit}>
    <FormGroup>
      <InputGroup>
        <FormControl 
          type="text"
          placeholder="City, ST" 
          value={value} 
          onChange={onChange} 
          size={size} 
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
  place: React.PropTypes.string,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  size: React.PropTypes.string,
};

export default Search;
