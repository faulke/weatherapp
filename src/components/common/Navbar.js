import React from 'react';
import { Link, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchContainer from '../../containers/SearchContainer';

const NavbarInstance = (props) => {
  const iconClass = `wi wi-owm-${props.icon}`;
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Brand>
          <span>{props.city}</span>
          {' '}
          <i className={iconClass} />
          {' '}
          <span>{props.temp}&deg;F</span>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullLeft>
          <LinkContainer to="/home">
            <NavItem>
              Home
            </NavItem>
          </LinkContainer>
        </Nav>
        <SearchContainer />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarInstance;
