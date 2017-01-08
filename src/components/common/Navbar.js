import React from 'react';
import { Link, Nav, Navbar, NavItem } from 'react-bootstrap';
import SearchContainer from '../../containers/SearchContainer';

class navbarInstance extends React.Component {

// TODO: add linkcontainer for Home
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            Orchard Homes (icon) temp
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <NavItem>
              Home
            </NavItem>
          </Nav>
          <SearchContainer />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default navbarInstance;