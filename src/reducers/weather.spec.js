import expect from 'expect';
import { initialState, weather } from './weather';

import {
  SEARCH_LOCATION, 
  UPDATE_SEARCH,
  REQUEST_WEATHER, 
  RECEIVE_WEATHER,
  REQUEST_WEATHER_MULTIPLE,
  RECEIVE_WEATHER_MULTIPLE, 
  SET_LOCATION, 
  SET_TABLE,
  UPDATE_UNITS,
} from '../actions';

console.log(initialState);
console.log(weather(undefined, {}));

describe('weather reducer', () => {
  it('should provide the initial state', () => {
    expect(
      weather(undefined, {})
    ).toEqual(initialState);
  });
});
