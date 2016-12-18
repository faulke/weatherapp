// https://codepen.io/FreeCodeCamp/pen/KzXQgy
/* eslint-env jquery */
/* global document, navigator, window */

const myApp = {
  initialize: () => {
    myApp.display.setButton();
    myApp.display.setDays();
    myApp.display.setTimes();
    myApp.display.convertValues();
    if ($('body').hasClass('location-weather')) {
      myApp.display.setBackground();
    }
  },
};

myApp.display = {
  setButton: () => {
    $('#faren').prop('disabled', true);
    $('#faren').addClass('button-active');
  },
  setBackground: () => {
    const backgrounds = {
      '01d': 'sunny.jpg',
      '01n': 'clear-night.jpg',
      '02d': 'partly-cloudy.jpg',
      '02n': 'partly-cloudy-night.jpg',
      '03d': 'partly-cloudy.jpg',
      '03n': 'partly-cloudy-night.jpg',
      '04d': 'cloudy.jpg',
      '04n': 'cloudy-night.jpg',
      '09d': 'rain.jpg',
      '09n': 'rain-night.jpg',
      '10d': 'rain.jpg',
      '10n': 'rain-night.jpg',
      '11d': 'lightning.jpg',
      '13d': 'snow.gif',
      '50d': 'heavy-fog.gif',
      '50n': 'heavy-fog.gif',
    };
    const icon = $('#icon').val();
    $('body').css('background-image', `url(../../images/${backgrounds[icon]})`);
  },
  setDays: () => {
    const titles = $('.forecastDay');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    let i;

    for (i = 0; i < titles.length; i++) {
      d.setDate(d.getDate() + 1);
      $(titles[i]).text(days[d.getDay()]);
    }
  },
  setTimes: () => {
    const oldSunrise = $('#sunrise').text();
    const oldSunset = $('#sunset').text();

    $('#sunrise').html(myApp.helpers.setTime(oldSunrise, 'sunrise'));
    $('#sunset').html(myApp.helpers.setTime(oldSunset, 'sunset'));
  },
  convertValues: () => {
    const pressure = $('#pressure').text();
    $('#pressure').html(myApp.helpers.convertPressure(pressure));

    const temps = $('.temp');
    let i;
    for (i = 0; i < temps.length; i += 1) {
      const temp = $(temps[i]).html();
      const newTemp = myApp.helpers.kelvinToFaren(temp);
      $(temps[i]).text(`${newTemp} ${String.fromCharCode(176)}F`);
    }
  },
};

myApp.helpers = {
  setTime: (time, suntime) => {
    const dateTime = parseInt(time, 10);
    const newDate = new Date(dateTime * 1000);
    const hours = newDate.getHours() > 12 ? (newDate.getHours() - 12) : newDate.getHours();
    const minutes = newDate.getMinutes() < 10 ? (`0${newDate.getMinutes()}`) : newDate.getMinutes();
    if (suntime === 'sunrise') {
      return `${hours}:${minutes} AM`;
    }
    return `${hours}:${minutes} PM`;
  },
  convertPressure: (pressure) => {
    return (parseInt(pressure, 10) / 25.4).toFixed(1);
  },
  kelvinToFaren: (temp) => {
    return Math.round((parseFloat(temp) * (9 / 5)) - 459.67);
  },
  farenToCels: (temp) => {
    return Math.round((temp - 32) * (5 / 9));
  },
  celsToFaren: (temp) => {
    return Math.round((temp * 1.8) + 32);
  },
};

myApp.actions = {
  selectButton: (id) => {
    const temps = $('.temp');
    let i;
    for (i = 0; i < temps.length; i += 1) {
      const dig = $(temps[i]).html();
      const temp = dig.match(/\d/g).join('');
      const newTemp = id === 'cels' ?
        myApp.helpers.farenToCels(temp) : myApp.helpers.celsToFaren(temp);
      $(temps[i]).text(`${newTemp} ${String.fromCharCode(176)}C`);
    }

    if (id === 'cels') {
      $('#cels').addClass('button-active');
      $('#faren').removeClass('button-active');
      $('#cels').prop('disabled', true);
      $('#faren').prop('disabled', false);
    } else {
      $('#faren').prop('disabled', true);
      $('#faren').addClass('button-active');
      $('#cels').prop('disabled', false);
      $('#cels').removeClass('button-active');
    }
  },
  search: (e) => {
    e.preventDefault();
    const input = $('form input').val();
    const btn = $('form button');
    if (!input) {
      return false;
    }
    $(btn).button().button('loading');
    $.post('/search', { data: input }, (response) => {
      const lat = response.results[0].geometry.location.lat;
      const long = response.results[0].geometry.location.lng;
      window.location = `/weather/${lat}/${long}`;
    });
    return false;
  },
};

$(document).ready(() => {
  myApp.initialize();
});
