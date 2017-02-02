import React, { Component, PropTypes } from 'react';

class Loader extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? (
          <div className="loader" />  
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

Loader.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  children: React.PropTypes.object.isRequired,
};

export default Loader;
