// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import api from '../api/index';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
