import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import SearchContainer from '../../containers/SearchContainer';

const NavbarInstance = (props) => {
  const iconClass = `wi wi-owm-${props.icon}`;
  return (
    <Navbar inverse fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Brand>
          <Link to="/home">Home</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <div className="navbar-description">
          <span>{props.city}</span>
          {' '}
          <i className={iconClass} />
          {' '}
          <span>{props.temp}&deg;F</span>
        </div>
        {/* handle navbar close on submit with jquery?*/}
        <SearchContainer place="navbar-form navbar-right" />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarInstance;
