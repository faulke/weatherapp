# weatherapp
Serverless, React-Redux weather app that retrieves current weather and 5 day forecast for user's location.

### See the current live app here: https://elastic-mahavira-fc5f68.netlify.com

## Description
The biggest motivation for building this app was to learn front-end React implemented with the React-Redux methodology, but I also enjoyed gaining greater depth in Express.js and routing, testing, setting up separate development and production environments, deploying to immutable infrastructure, and creating Serverless applications.

In the end, this project has served as a playground for React-Redux and as an artifact to practice different application architectures and deployment strategies.  This project has followed this basic life cycle:
```
  Start:   [Static HTML site w/ jQuery hosted on Heroku]
                        |
                        |
           [React-Redux multi-page app w/ Express.js backend hosted on Heroku]
                        |
                        |
           [Multi-page app hosted on single AWS EC2 instance]
                        |
                        |
           [Deployed to AWS Autoscaling Group w/ Terraform]
                        |
                        |
  Current: [Serverless, single page app hosted on S3 w/ backend managed by API Gateway and Lambda]
```

In it's current state, the application is hosted by an S3 bucket and served by an AWS Cloudfront distribution.  The backend is handled by API Gateway and Lambda integration, which is managed by [Serverless](https://github.com/serverless/serverless) framework.

S3 bucket hosting and DNS (Route53) is managed by [Terraform](https://github.com/hashicorp/terraform).

The app itself uses [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) to retrieve user locations and retrieve coordinates for searched locations. [OpenWeatherMap API](https://openweathermap.org/) is used to return weather for locations.

For an example of a previous, more robust infrastructure and deployment strategy (AWS Autoscaling group), see https://github.com/faulke/weather-infra.

## To run locally (with Express.js server)
- Clone the repo
- `npm install`
- Get an OpenWeatherMap API key **[here](http://openweathermap.org/appid)**.
- Register a Google Maps Geocoding API key **[here](https://developers.google.com/maps/documentation/geocoding/get-api-key#key)**.
- Place a file in the root directory called `.env`. It should include the following:
```
GOOGLE_KEY={your Google Maps API key}
WEATHER_KEY={your OpenWeatherMap API key}
```
- `npm run dev` will fire up the server on port 3000 with hot reloading, and open the app in a new tab.
- `npm run build` will build static assets. 
- `npm run prod` to start the server in production mode.

## Test
`npm run test`

## To do
- Update tests
