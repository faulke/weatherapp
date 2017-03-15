import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './footer.less';

const Footer = ({ onClick }) =>
  <div className={styles.buttons}>
    <Button id="fahr" bsSize="small" onClick={onClick}>&deg;F</Button>
    <Button id="cels" bsSize="small" onClick={onClick}>&deg;C</Button>
  </div>;

Footer.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default Footer;
