// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './homePage.less';
import api from '../api/index';
import SearchContainer from './SearchContainer';
import WeatherTableContainer from './WeatherTableContainer';
import Loader from '../components/common/Loader';
import Footer from '../components/common/Footer';
import { getLocation, unitsToggle } from '../actions/index';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.handleUnitsToggle = this.handleUnitsToggle.bind(this);
  }

  componentDidMount() {
    this.props.getLocation();
  }

  handleUnitsToggle(evt) {
    const id = evt.target.id;
    this.props.unitsToggle(id);
  }

  render() {
    const firstCity = this.props.table[0].lat;
    return (
      <div className="container-fluid">
        <Grid className={styles.homeSearch}>
          <Row>
            <Col sm={4} smOffset={4} className="text-center">
              <div className={styles.mainIcon}>
                <i className="wi wi-day-cloudy-windy" />
              </div>
              <SearchContainer />
            </Col>
          </Row>
        </Grid>
        {firstCity ? (<WeatherTableContainer table={this.props.table} />) :
          (<Loader />)}
        <Footer onClick={this.handleUnitsToggle} />
      </div>
    );
  }
}

HomePage.propTypes = {
  getLocation: React.PropTypes.func,
  table: React.PropTypes.array,
  unitsToggle: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { table, celsius } = state.weather;
  return {
    table,
    celsius,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLocation: () => dispatch(getLocation()),
    unitsToggle: id => dispatch(unitsToggle(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
