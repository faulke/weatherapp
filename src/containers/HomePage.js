// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api/index';
import SearchContainer from './SearchContainer';
import WeatherTableContainer from './WeatherTableContainer';
import Loader from '../components/common/Loader';
import { getLocation } from '../actions/index';

class HomePage extends Component {

  componentDidMount() {
    this.props.getLocation();
  }

  render() {
    const firstCity = this.props.table[0].lat;
    return (
      <div className="container-fluid">
        <Grid id="home-search">
          <Row>
            <Col sm={4} smOffset={4} className="text-center">
              <div className="main-icon mb30">
                <i className="wi wi-day-sunny" />
              </div>
              <SearchContainer />
            </Col>
          </Row>
        </Grid>
        {firstCity ? (<WeatherTableContainer table={this.props.table} />) :
          (<Loader />)}
      </div>
    );
  }
}

HomePage.propTypes = {
  getLocation: React.PropTypes.func,
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
    getLocation: () => dispatch(getLocation()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
