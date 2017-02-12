import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import SearchContainer from '../../containers/SearchContainer';
import styles from './navbar.less';

const NavbarInstance = () =>
  <Navbar inverse fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Toggle />
      <Navbar.Brand>
        <Link to="/home">Home</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      {/* handle navbar close on submit with jquery?*/}
      <SearchContainer place="navbar-form navbar-right" />
    </Navbar.Collapse>
  </Navbar>;

export default NavbarInstance;
