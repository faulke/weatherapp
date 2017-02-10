import { browserHistory } from 'react-router';
import api from '../api';

export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const updateSearch = (evt) => ({
  type: UPDATE_SEARCH,
  input: evt.target.value,
});

export const SET_LOCATION = 'SET_LOCATION';
export const setLocation = (lat, long) => ({
  type: SET_LOCATION,
  lat,
  long,
});

export const SET_TABLE = 'SET_TABLE';
export const setTableLocations = (lat, long) => ({
  type: SET_TABLE,
  lat,
  long,
});

export function getLocation() {
  return (dispatch, getState) => {
    if (navigator.geolocation) {
      let lat;
      let long;
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          const { location } = getState().weather;
          if (location !== { lat, long }) {
            dispatch(setTableLocations(lat, long));
            dispatch(setLocation(lat, long));
          }
        }
      });
      setTimeout(() => {
        if (!lat || !long) {
          dispatch(setTableLocations(47.6062, -122.3321));
        }
      }, 2000);
    }
  };
}

export function searchLocation(search) {
  return (dispatch) => {
    return api.search(search, (err, data) => {
      if (!err && data.results.length) {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        dispatch(setLocation(lat, long));
        browserHistory.push(`/weather/${lat}/${long}`);
      }
    });
  };
}

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather,
});

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const requestWeather = () => ({
  type: REQUEST_WEATHER,
});

export function shouldFetchWeather(lat, long) {
  return (dispatch) => {
    dispatch(requestWeather());
    return api.weather.get(lat, long, (err, res) => {
      if (err) {
        console.error(err);
        return false;
      }
      dispatch(receiveWeather(res));
    });
  };
}

export const RECEIVE_WEATHER_MULTIPLE = 'RECEIVE_WEATHER_MULTIPLE';
export const receiveWeatherMultiple = (tableWeather) => ({
  type: RECEIVE_WEATHER_MULTIPLE,
  tableWeather,
});

export const REQUEST_WEATHER_MULTIPLE = 'REQUEST_WEATHER_MULTIPLE';
export const requestWeatherMultiple = (tableWeather) => ({
  type: REQUEST_WEATHER_MULTIPLE,
  tableWeather,
});

export function shouldFetchWeatherMultiple(locations) {
  return (dispatch) => {
    dispatch(requestWeatherMultiple());
    return api.weather.getMultiple(locations, (err, res) => {
      if (err) {
        console.error(err);
        return false;
      }
      dispatch(receiveWeatherMultiple(res));
    });
  };
}

export const UPDATE_UNITS = 'UPDATE_UNITS';
export const updateUnits = (celsius) => ({
  type: UPDATE_UNITS,
  celsius,
});

export function unitsToggle(id) {
  return (dispatch) => {
    const celsius = id === 'cels';
    dispatch(updateUnits(celsius));
  };
}
