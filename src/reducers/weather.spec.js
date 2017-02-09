import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { initialState, weather } from './weather';

import {
  updateSearch,
  setLocation,
  setTableLocations,
  requestWeather,
  receiveWeather,
  requestWeatherMultiple,
  receiveWeatherMultiple,
  updateUnits,
} from '../actions';

describe('weather reducer', () => {
  it('should provide the initial state', () => {
    expect(
      weather(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle UPDATE_SEARCH action', () => {
    const stateBefore = {
      search: undefined,
    };
    const evt = {
      target: {
        value: 'search',
      },
    };
    const action = updateSearch(evt);
    const stateAfter = {
      search: evt.target.value,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_LOCATION action', () => {
    const stateBefore = {
      location: {
        lat: null,
        long: null,
      },
    };
    const lat = '-113.91';
    const long = '47.41';
    const action = setLocation(lat, long);
    const stateAfter = {
      location: {
        lat,
        long,
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SET_TABLE action', () => {
    const stateBefore = {
      table: [
        { lat: null, long: null },
        { lat: 45, long: -113 },
        { lat: 47, long: -113 },
      ],
    };
    const lat = '-113.91';
    const long = '47.41';
    const action = setTableLocations(lat, long);
    const stateAfter = {
      table: [
        { lat, long },
        { lat: 45, long: -113 },
        { lat: 47, long: -113 },
      ],
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REQUEST_WEATHER action', () => {
    const stateBefore = {
      isFetching: false,
    };
    const action = requestWeather();
    const stateAfter = {
      isFetching: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle RECEIVE_WEATHER action', () => {
    const stateBefore = {
      now: null,
      forecast: null,
      isFetching: true,
    };

    const data = [
      { currentWeather: {} },
      { forecast: {} },
    ];
    const action = receiveWeather(data);
    const stateAfter = {
      now: data[0],
      forecast: data[1].list,
      isFetching: false,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle REQUEST_WEATHER_MULTIPLE action', () => {
    const stateBefore = {
      isFetching: false,
    };
    const action = requestWeatherMultiple();
    const stateAfter = {
      isFetching: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle RECEIVE_WEATHER_MULTIPLE action', () => {
    const stateBefore = {
      tableWeather: null,
      isFetching: true,
    };

    const data = [];
    const action = receiveWeatherMultiple(data);
    const stateAfter = {
      tableWeather: data,
      isFetching: false,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle UPDATE_UNITS action', () => {
    const stateBefore = {
      celsius: false,
    };

    const action = updateUnits(true);
    const stateAfter = {
      celsius: true,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(weather(stateBefore, action)).toEqual(stateAfter);
  });
});
