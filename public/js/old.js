 $(document).ready(() => {
   let iconID;
   //  kelvin to fahrenheit conversion function
   function kelvinToFaren(temp) {
     return Math.round((temp - 273.15) * 1.8000 + 32.00);
   }

   //  fahrenheit to celsius conversion
   function farenToCels(temp) {
     return Math.round((temp - 32) * (5 / 9));
   }

   //  icon codes for day weather patterns
   const iconsDay = ['11d', '09d', '10d', '13d', '01d', '02d', '03d', '04d'];

   // backgrounds for day weather patterns
   const backgroundsDay =
    ['http://1.bp.blogspot.com/-BQCOWJL3J68/VCVpa56Q5JI/AAAAAAAAA4g/6BabE_tcDdE/s1600/giphy.gif',
     'http://ww3.hdnux.com/photos/24/73/11/5485166/3/628x471.jpg',
     'http://images3.alphacoders.com/892/89289.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/15%20-%20lXlRsHq_zpspcm5v3nu.gif',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/16%20-%20eqrFTSO_zps1goemtob.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/05%20-%20Ni0vHRh_zps8jfrojuv.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/05%20-%20Ni0vHRh_zps8jfrojuv.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/01%20-%20RSLMR4X_zps0rsxrasb.jpg'];

   // icons for night weather patterns
   const iconsNight = ['01n', '02n', '03n', '04n'];

   // night weather backgrounds
   const backgroundsNight =
    ['http://i820.photobucket.com/albums/zz130/faulkev/Codepen/04%20-%20RRJS0bL_zps0mqqiam6.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/07%20-%20IzugpDQ_zpsnrgwhk3s.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/02%20-%20HXahmSP_zpsi234od5t.jpg',
     'https://icarushasfallen.files.wordpress.com/2010/07/1536-1249272668qq7l.jpg'];

   // weather condition codes for 'haze, smoke, fog'
   const condsAtmos = [701, 711, 741];


   // backgrounds for 'haze, smoke, fog'
   const backgroundsAtmos =
    ['http://i820.photobucket.com/albums/zz130/faulkev/Codepen/c0263efef16dfd0153f576f791bb228c_zpsv5yc0j9k.jpg',
     'http://i820.photobucket.com/albums/zz130/faulkev/Codepen/IMG_1424_zpsszlfpurh.jpg',
     'http://netanimations.net/children-of-men-cinemagraph-art.gif'];

   // get user's location
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition((position) => {
       const lat = position.coords.latitude;
       const long = position.coords.longitude;
       const days = 5;

       const apiKey = '881b5955fcd17cbec3fe94131e417545';

       // url for current weather
       const apiURL1 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`;

       // url for 5 day forecast
       const apiURL2 = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=${days}&APPID=${apiKey}`;

       // get JSON data
       $.get(apiURL1, (daily) => {
         // get weather icon and assign appropriate background image
         iconID = daily.weather[0].icon;
         const weatherID = daily.weather[0].id;

         if (iconsDay.indexOf(iconID) > -1) {
           const pos = iconsDay.indexOf(iconID);
           $('body').css('background-image', 'url(' + backgroundsDay[pos] + ')');
         } else if (iconsNight.indexOf(iconID) > -1) {
           const pos = iconsNight.indexOf(iconID);
           $('body').css('background-image', 'url(' + backgroundsNight[pos] + ')');
         } else if (condsAtmos.indexOf(weatherID) > -1) {
           const pos = condsAtmos.indexOf(weatherID);
           $('body').css('background-image', 'url(' + backgroundsAtmos[pos] + ')');
         }

         // display 'current weather in location'
         $('#location').html('Current Weather in ' + daily.name);

         // description of current weather
         $('#display').html(daily.weather[0].description);

         // temperature converted from kelvin to farhenheit
         const temp = kelvinToFaren(daily.main.temp);

         $('#temp').html(temp + '&deg' + 'F');

         // weather icon
         iconID = daily.weather[0].icon;
         const iconURL = 'http://openweathermap.org/img/w/' + iconID + '.png';
         $('#iconMain').attr('src', iconURL);

         // display current windspeed converted from m/s to mph
         const windSpeed = daily.wind.speed * 2.23693629;

         // wind direction in degrees
         const deg = daily.wind.deg;

         // array of possible wind directions
         const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']

         // convert degrees to direction
         const windDir = arr[Math.round(deg / 22.5)];

         // display wind speed and direction
         $('#wind').html('Wind: ' + Math.round(windSpeed) + ' mph ' + windDir);

         // humidity
         const humidity = daily.main.humidity;
         $('#humid').html('Humidity: ' + humidity + '%')

         // fahrenheit and celsius conversion radio buttons
         $('#faren').click(function() {
           $('#temp').html(temp + '&deg' + 'F')
         });

         $('#cels').click(function() {
           $('#temp').html(farenToCels(temp) + '&deg' + 'C')
         });

       });

       // 5 day forecast
       $.get(apiURL2, function(tenDay) {

         // forecast title
         $('#forecast').html('5-day Forecast for ' + tenDay.city.name)

         // get current date
         const d = new Date();

         // days of week arranged for getDay() (indexed 0-6)
         const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

         // set each day to previous date plus one day
         const day1 = new Date(d.setDate(d.getDate() + 0))
         const day2 = new Date(d.setDate(d.getDate() + 1))
         const day3 = new Date(d.setDate(d.getDate() + 1))
         const day4 = new Date(d.setDate(d.getDate() + 1))
         const day5 = new Date(d.setDate(d.getDate() + 1))

         // put into array
         const dates = [day1, day2, day3, day4, day5];

         // array to hold days
         const arr = [];

         // for each date, get day of week number, then find from days of week array
         for (i = 0; i < dates.length; i++) {
           arr.push(days[dates[i].getDay()]);
         }

         // add days of week to 5 day forecast boxes
         $('#day1').html(arr[0]);
         $('#day2').html(arr[1]);
         $('#day3').html(arr[2]);
         $('#day4').html(arr[3]);
         $('#day5').html(arr[4]);

         // add icons to each day forecasted
         // get icons from JSON for all 5 days into an array
         const iconDays = [];
         for (i = 0; i < 5; i++) {
           iconDays.push(tenDay.list[i].weather[0].icon);
         }

         // create urls for each icon in an array
         const iconURLS = [];
         for (i = 0; i < 5; i++) {
           iconURLS.push('http://openweathermap.org/img/w/' + iconDays[i] + '.png')
         }

         // add icons
         $('#icon1').attr('src', iconURLS[0]);
         $('#icon2').attr('src', iconURLS[1]);
         $('#icon3').attr('src', iconURLS[2]);
         $('#icon4').attr('src', iconURLS[3]);
         $('#icon5').attr('src', iconURLS[4]);

         // add descriptions to forecasted days

         // container for descriptions
         const descriptions = [];

         // pull descriptions from JSON data
         for (i = 0; i < 5; i++) {
           descriptions.push(tenDay.list[i].weather[0].description);
         }

         // add descriptions to forecasted days
         $('#descript1').html(descriptions[0]);
         $('#descript2').html(descriptions[1]);
         $('#descript3').html(descriptions[2]);
         $('#descript4').html(descriptions[3]);
         $('#descript5').html(descriptions[4]);

         // daily temp for forecasted days
         const dailyTemps = [];
         for (i = 0; i < 5; i++) {
           dailyTemps.push(kelvinToFaren(tenDay.list[i].temp.day));
         }

         $('#temp1').html(dailyTemps[0] + '&deg' + 'F');
         $('#temp2').html(dailyTemps[1] + '&deg' + 'F');
         $('#temp3').html(dailyTemps[2] + '&deg' + 'F');
         $('#temp4').html(dailyTemps[3] + '&deg' + 'F');
         $('#temp5').html(dailyTemps[4] + '&deg' + 'F');

         // max daily temps
         const maxTemps = [];
         for (i = 0; i < 5; i++) {
           maxTemps.push(kelvinToFaren(tenDay.list[i].temp.max));
         }

         $('#hiTemp1').html('Hi: ' + maxTemps[0] + '&deg' + 'F');
         $('#hiTemp2').html('Hi: ' + maxTemps[1] + '&deg' + 'F');
         $('#hiTemp3').html('Hi: ' + maxTemps[2] + '&deg' + 'F');
         $('#hiTemp4').html('Hi: ' + maxTemps[3] + '&deg' + 'F');
         $('#hiTemp5').html('Hi: ' + maxTemps[4] + '&deg' + 'F');

         // min daily temps
         const minTemps = [];
         for (i = 0; i < 5; i++) {
           minTemps.push(kelvinToFaren(tenDay.list[i].temp.min));
         }

         $('#loTemp1').html('Lo: ' + minTemps[0] + '&deg' + 'F');
         $('#loTemp2').html('Lo: ' + minTemps[1] + '&deg' + 'F');
         $('#loTemp3').html('Lo: ' + minTemps[2] + '&deg' + 'F');
         $('#loTemp4').html('Lo: ' + minTemps[3] + '&deg' + 'F');
         $('#loTemp5').html('Lo: ' + minTemps[4] + '&deg' + 'F');

         // fahrenheit and celsius radio buttons
         $('#faren').click(function() {
           $('#temp1').html(dailyTemps[0] + '&deg' + 'F');
           $('#temp2').html(dailyTemps[1] + '&deg' + 'F');
           $('#temp3').html(dailyTemps[2] + '&deg' + 'F');
           $('#temp4').html(dailyTemps[3] + '&deg' + 'F');
           $('#temp5').html(dailyTemps[4] + '&deg' + 'F');

           $('#hiTemp1').html('Hi: ' + maxTemps[0] + '&deg' + 'F');
           $('#hiTemp2').html('Hi: ' + maxTemps[1] + '&deg' + 'F');
           $('#hiTemp3').html('Hi: ' + maxTemps[2] + '&deg' + 'F');
           $('#hiTemp4').html('Hi: ' + maxTemps[3] + '&deg' + 'F');
           $('#hiTemp5').html('Hi: ' + maxTemps[4] + '&deg' + 'F');

           $('#loTemp1').html('Lo: ' + minTemps[0] + '&deg' + 'F');
           $('#loTemp2').html('Lo: ' + minTemps[1] + '&deg' + 'F');
           $('#loTemp3').html('Lo: ' + minTemps[2] + '&deg' + 'F');
           $('#loTemp4').html('Lo: ' + minTemps[3] + '&deg' + 'F');
           $('#loTemp5').html('Lo: ' + minTemps[4] + '&deg' + 'F');
         });

         $('#cels').click(function() {
           $('#temp1').html(farenToCels(dailyTemps[0]) + '&deg' + 'C');
           $('#temp2').html(farenToCels(dailyTemps[1]) + '&deg' + 'C');
           $('#temp3').html(farenToCels(dailyTemps[2]) + '&deg' + 'C');
           $('#temp4').html(farenToCels(dailyTemps[3]) + '&deg' + 'C');
           $('#temp5').html(farenToCels(dailyTemps[4]) + '&deg' + 'C');

           $('#hiTemp1').html('Hi: ' + farenToCels(maxTemps[0]) + '&deg' + 'C');
           $('#hiTemp2').html('Hi: ' + farenToCels(maxTemps[1]) + '&deg' + 'C');
           $('#hiTemp3').html('Hi: ' + farenToCels(maxTemps[2]) + '&deg' + 'C');
           $('#hiTemp4').html('Hi: ' + farenToCels(maxTemps[3]) + '&deg' + 'C');
           $('#hiTemp5').html('Hi: ' + farenToCels(maxTemps[4]) + '&deg' + 'C');

           $('#loTemp1').html('Lo: ' + farenToCels(minTemps[0]) + '&deg' + 'C');
           $('#loTemp2').html('Lo: ' + farenToCels(minTemps[1]) + '&deg' + 'C');
           $('#loTemp3').html('Lo: ' + farenToCels(minTemps[2]) + '&deg' + 'C');
           $('#loTemp4').html('Lo: ' + farenToCels(minTemps[3]) + '&deg' + 'C');
           $('#loTemp5').html('Lo: ' + farenToCels(minTemps[4]) + '&deg' + 'C');
         });

       });

     });

   };

 });
