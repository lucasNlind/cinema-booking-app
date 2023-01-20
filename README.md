# Cinema Booking App

Please use this README as a one-stop resource. Outlined below will be guidelines for development work, including best practices for code reviews, git basics, and other general information. 

## Getting Started

This repo contains two source folders, `cinema-booking-client` and `cinema-booking-server`. The client folder contains all front-end related code and can be treated as an independent entity. The server folder, on the other hand, is our middleware. This is where all database logic will be handled, in addition to the logic required to serve our static client folder: `cinema-booking-client`. 

The first thing you should do **anytime** you pull code is run `npm install`. 

## Pushing Code



### Frontend Development

For frontend development work, there are two methods for starting a local server that you can use depending on the situation. For basic visual changes that require no API or database logic, simply `cd` into the `cinema-booking-client` folder, install dependencies with `npm install`, and run `npm run start`. Here, you can make your changes and receive real-time feedback thanks to React.js.

For frontend work that requires data or API logic, you will need to build the client first and then run the server. To do this, `cd` into the `cinema-booking-client` folder and run `npm run build`. This will create a `dist` folder that is basically a compressed version of our client.

Then, run `cd ..` to go back into the root folder and run `npm run start:dev`. The code has been set up so that our client is served via https://localhost:3000/home. This will allow you to view our entire application in development mode.

**Please keep in mind that the second method is not reactive to any frontend changes in the client folder.** Each time you make a change in the client, you will need to run the build script and restart the application. 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
