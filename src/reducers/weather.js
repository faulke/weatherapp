import { SEARCH_LOCATION, UPDATE_SEARCH } from '../actions';

export const initialState = {
  table: [
    { lat: null, long: null },
    { lat: 45, long: -113 },
    { lat: 47, long: -113 },
  ],
  search: '',
  location: {
    lat: null,
    long: null,
  },
  now: null,
  forecast: null,
  tableWeather: null,
};

export const weather = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_SEARCH:
      return Object.assign({}, state, {
        search: action.input,
      });
    case SEARCH_LOCATION:
      return Object.assign({}, state, {
        search: action.search,
      });
    default:
      return state;
  }
};

