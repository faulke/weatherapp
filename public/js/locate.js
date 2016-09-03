$(document).ready(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      window.location = `/weather/${lat}/${long}`;
    });
  }
});
