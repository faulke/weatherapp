import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

const Footer = ({ onClick }) =>
  <Navbar inverse fluid fixedBottom className="footer">
    <Navbar.Header>
      <Button id="fahr" bsSize="small" onClick={onClick}>&deg;F</Button>
      <Button id="cels" bsSize="small" onClick={onClick}>&deg;C</Button>
    </Navbar.Header>
  </Navbar>;

Footer.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default Footer;
