$(document).ready(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
  //    $.post('http://localhost:3000/action', { latitude: lat, longitude: long });
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/action',
        data: { latitude: lat, longitude: long },
        success: window.location = '/weather',
      });
    });
  }
});
