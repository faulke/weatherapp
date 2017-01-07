import React from 'react';
import WeatherApi from '../../api/weatherApi';
// TODO: implement google autocomplete for addresses
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          WeatherApi.searchWeather('latlng', `${lat},${long}`, (err, data) => {
            console.log(data.results);
            for (let i = 0; i < data.results.length; i += 1) {
              if (data.results[i].types.indexOf('locality') > -1) {
                self.setState({ value: data.results[i].formatted_address });
                break;
              }
            }
          });
           // if location, suggest location for weather
           // browserHistory.push(`/${lat}/${long}`);
        }
      });
    }
  }

  handleSubmit(evt) {
    this.props.onSubmit(evt, this.state);
    evt.preventDefault();
  }

  handleChange(evt) {
    this.setState({ value: evt.target.value });
  }

  render() {
    return (
      <div className="text-center">
        <span className="glyphicon glyphicon-cloud" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="City, ST" size="50" />
            <span className="help-block" />
            <button type="submit" className="btn btn-primary" data-loading-text="Searching...">
              Search {'\u00A0'}
              <span className="glyphicon glyphicon-search" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default Search;
