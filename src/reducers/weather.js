import { 
  SEARCH_LOCATION, 
  UPDATE_SEARCH,
  REQUEST_WEATHER, 
  RECEIVE_WEATHER,
  RECEIVE_WEATHER_MULTIPLE, 
  SET_LOCATION, 
  SET_TABLE,
} from '../actions';

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
  isFetching: false,
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
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_WEATHER:
      return Object.assign({}, state, {
        now: action.weather[0],
        forecast: action.weather[1].list,
        isFetching: false,
      });
    case RECEIVE_WEATHER_MULTIPLE:
      return Object.assign({}, state, {
        tableWeather: action.tableWeather,
      });
    case SET_LOCATION:
      return Object.assign({}, state, {
        location: {
          lat: action.lat,
          long: action.long,
        },
      });
    case SET_TABLE:
      return Object.assign({}, state, {
        table: [{
          lat: action.lat,
          long: action.long,
        }, state.table[1], state.table[2]],
      });
    default:
      return state;
  }
};

