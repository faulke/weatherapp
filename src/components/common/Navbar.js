import React from 'react';
import { Nav, Navbar, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';

class navbarInstance extends React.Component {
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
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
          </Nav>
          <form className="navbar-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="City, ST" size="50" />
              <span className="help-block" />
              <button type="submit" className="btn btn-primary" data-loading-text="Searching...">
                Search {'\u00A0'}
                <span className="glyphicon glyphicon-search" />
              </button>
            </div>
          </form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default navbarInstance;