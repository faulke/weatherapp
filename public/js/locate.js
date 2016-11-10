$(document).ready(() => {
  let lat;
  let long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        window.location = `/weather/${lat}/${long}`;
      }
    });
  }
  setTimeout(() => {
    if (!lat || !long) {
      window.location = '/home'; // default to search screen
    }
  }, 4000);
});
