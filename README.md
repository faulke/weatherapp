# weatherapp
React-Redux weather app that retrieves current weather and 5 day forecast for user's location.

## Description
The biggest motivation for building this app was to learn front-end React implemented with the React-Redux methodology, but I also increased my knowledge of Express.js and routing, testing, setting up separate development and production environments, and deploying to Heroku.

After the app was deployed and running on Heroku, I took it a step further and set up a continuous integration pipeline with tools such as TeamCity and Hashicorp's Packer, which deploys to an AWS Auto-Scaling group.  Much of the cloud infrastructure is managed using Terraform by Hashicorp.  Those scripts can be viewed in the [weather-infra](https://github.com/faulke/weather-infra) repo.

The app itself uses and [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) to retrieve user locations and retrieve coordinates for searched locations. [OpenWeatherMap API](https://openweathermap.org/) is used to return weather for locations.

### See the live app here: https://simpleweather.us/

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
- `npm run build` will build static assets. 
- `npm run prod` to start the server in production mode.

## Test
`npm run test`
