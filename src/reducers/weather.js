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

export const initialState = {
  table: [
    { lat: null, long: null },
    { lat: 40.7128, long: -74.0059 },
    { lat: 39.7392, long: -104.9903 },
  ],
  search: undefined,
  location: {
    lat: null,
    long: null,
  },
  now: null,
  forecast: null,
  tableWeather: null,
  isFetching: false,
  fahrActive: true,
  celsActive: false,
  celsius: false,
};

export const weather = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case UPDATE_SEARCH:
      return { ...state, search: action.input };
    case SEARCH_LOCATION:
      return { ...state, search: action.search };
    case REQUEST_WEATHER:
      return { ...state, isFetching: true };
    case RECEIVE_WEATHER:
      return { ...state,
        now: action.weather[0],
        forecast: action.weather[1].list,
        isFetching: false,
      };
    case REQUEST_WEATHER_MULTIPLE:
      return { ...state, isFetching: true };
    case RECEIVE_WEATHER_MULTIPLE:
      return { ...state,
        tableWeather: action.tableWeather,
        isFetching: false,
      };
    case SET_LOCATION:
      return { ...state,
        location: {
          lat: action.lat,
          long: action.long,
        },
      };
    case SET_TABLE:
      return { ...state,
        table: [{
          lat: action.lat,
          long: action.long,
        }, state.table[1], state.table[2]],
      };
    case UPDATE_UNITS:
      return { ...state, celsius: action.celsius };
    default:
      return state;
  }
};

