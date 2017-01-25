export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const updateSearch = (evt) => ({
  type: UPDATE_SEARCH,
  input: evt.target.value,
});

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = (search) => ({
  type: SEARCH_LOCATION,
  search,
});
