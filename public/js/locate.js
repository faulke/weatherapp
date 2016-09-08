$(document).ready(() => {
  let lat;
  let long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        console.log(position);
        lat = position.coords.latitude;
        long = position.coords.longitude;
        window.location = `/weather/${lat}/${long}`;
      }
    });
  }
  setTimeout(() => {
    if (!lat || !long) {
      window.location = '/weather/38.90/-77.04'; // default to Washington DC
    }
  }, 4000);
});
