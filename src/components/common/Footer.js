import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import styles from './footer.less';

const Footer = ({ onClick }) =>
  <Navbar inverse fluid fixedBottom className={styles.navbar}>
    <Navbar.Header className={styles.buttons}>
      <Button id="fahr" bsSize="small" onClick={onClick}>&deg;F</Button>
      <Button id="cels" bsSize="small" onClick={onClick}>&deg;C</Button>
    </Navbar.Header>
  </Navbar>;

Footer.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default Footer;
