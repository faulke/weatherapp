# weatherapp
React-Redux weather app that retrieves current weather and 5 day forecast for user's location.

Uses [OpenWeatherMap API](https://openweathermap.org/) and [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro).

### See the live app here: https://guarded-tor-95941.herokuapp.com/

## To run locally
- Clone the repo
- `npm install`
- Get an OpenWeatherMap API key **[here](http://openweathermap.org/appid)**.
- Register a Google Maps Geocoding API key **[here](https://developers.google.com/maps/documentation/geocoding/get-api-key#key)**.
- Place a file in the root directory called `.env`. It should include the following:
```
GOOGLE_KEY={your Google Maps API key}
WEATHER_KEY={your OpenWeatherMap API key}
USER={create a username}
PASSWORD={create a password}
SECRET_KEY={create a secret key, e.g., 785a2ac327}
API_KEY={sha1 hash of USER:PASSWORD using the SECRET_KEY}
```
- `npm run dev` will fire up the server on port 3000 with hot reloading, and open the app in a new tab.
- `npm run build` will build static assets. Use `npm run prod` to start the server in production mode.

## Test
`npm run test`
