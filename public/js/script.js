$(document).ready(() => {
  let i;
  const d = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $('#faren').prop('disabled', true);
  $('#faren').addClass('button-active');

  function setTime(time, suntime) {
    const dateTime = parseInt(time, 10);
    const newDate = new Date(dateTime * 1000);
    const hours = newDate.getHours() > 12 ? (newDate.getHours() - 12) : newDate.getHours();
    const minutes = newDate.getMinutes() < 10 ? (`0${newDate.getMinutes()}`) : newDate.getMinutes();
    if (suntime === 'sunrise') {
      return `${hours}:${minutes} AM`;
    } else {
      return `${hours}:${minutes} PM`;
    }
  }

// https://codepen.io/FreeCodeCamp/pen/KzXQgy

  const oldSunrise = $('#sunrise').text();
  $('#sunrise').html(setTime(oldSunrise, 'sunrise'));

  const oldSunset = $('#sunset').text();
  $('#sunset').html(setTime(oldSunset, 'sunset'));

  const pressure = $('#pressure').text();
  $('#pressure').html((parseInt(pressure, 10) / 25.4).toFixed(1));

  function kelvinToFaren(temp) {
    const dat = parseFloat(temp);
    return Math.round((dat - 273.15) * 1.8000 + 32.00);
  }

  function farenToCels(temp) {
    return Math.round((temp - 32) * (5 / 9));
  }

  function CelsToFaren(temp) {
    return Math.round((temp * 1.8) + 32)
  }

  const titles = $('.forecastDay');
  const temps = $('.temp');

  for (i = 0; i < titles.length; i++) {
    d.setDate(d.getDate() + 1);
    $(titles[i]).text(days[d.getDay()]);
  }

  for (i = 0; i < temps.length; i++) {
    const temp = $(temps[i]).html();
    $(temps[i]).text(`${kelvinToFaren(temp)} ${String.fromCharCode(176)}F`);
  }

  $('#cels').on('click', () => {
    for (i = 0; i < temps.length; i++) {
      const dig = $(temps[i]).html();
      const temp = dig.match(/\d/g).join('');
      $(temps[i]).text(`${farenToCels(temp)} ${String.fromCharCode(176)}C`);
    }
    $('#cels').addClass('button-active')
    $('#faren').removeClass('button-active')
    $('#cels').prop('disabled', true);
    $('#faren').prop('disabled', false);
  });

  $('#faren').on('click', () => {
    for (i = 0; i < temps.length; i++) {
      const dig = $(temps[i]).html();
      const temp = dig.match(/\d/g).join('');
      $(temps[i]).text(`${CelsToFaren(temp)} ${String.fromCharCode(176)}F`);
    }
    $('#faren').prop('disabled', true);
    $('#faren').addClass('button-active')
    $('#cels').prop('disabled', false);
    $('#cels').removeClass('button-active')
  })
});
