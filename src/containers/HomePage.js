// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api/index';
import SearchContainer from './SearchContainer';
import WeatherTableContainer from './WeatherTableContainer';
import { getLocation, setTableLocations, setLocation } from '../actions/index';

class HomePage extends Component {

  componentDidMount() {
    this.props.getLocation();
  }

// TODO: user can save 3 specific locations that pop up when logged in
  render() {
    if (this.props.table[0].lat == null) {
      return false;
    }
    return (
      <div className="container-fluid">
        <Grid id="home-search">
          <Col sm={4} smOffset={4} className="text-center">
            <div className="main-icon mb30">
              <i className="wi wi-day-sunny" />
            </div>
            <SearchContainer />
          </Col>
        </Grid>
        <WeatherTableContainer table={this.props.table} />
      </div>
    );
  }
}

HomePage.propTypes = {
  location: React.PropTypes.object,
  getLocation: React.PropTypes.func,
  setLocation: React.PropTypes.func.isRequired,
  setTableLocations: React.PropTypes.func.isRequired,
  table: React.PropTypes.array,
};

function mapStateToProps(state) {
  const { table } = state.weather;
  return {
    table,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTableLocations: (lat, long) => dispatch(setTableLocations(lat, long)),
    setLocation: (lat, long) => dispatch(setLocation(lat, long)),
    getLocation: () => dispatch(getLocation()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
