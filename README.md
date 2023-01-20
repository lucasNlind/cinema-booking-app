# Cinema Booking App

Please use this README as a one-stop resource. Outlined below will be guidelines for development work, including best practices for code reviews, git basics, and other general information. 

## Getting Started

This repo contains two source folders, `cinema-booking-client` and `cinema-booking-server`. The client folder contains all front-end related code and can be treated as an independent entity. The server folder, on the other hand, is our middleware. This is where all database logic will be handled, in addition to the logic required to serve our static client folder: `cinema-booking-client`. 

The first thing you should do **anytime** you pull code is run `npm install`. 

## Pushing Code

Having a consistent approach to pushing code will be essential for 

### Frontend Development

For frontend development work, there are two methods for starting a local server that you can use depending on the situation.

For basic visual changes that require no API or database logic, run the following commands:

1. `cd cinema-booking-client`
2. `npm install`
3. `npm run start`

Here, you can make your changes and receive real-time feedback thanks to React.js.

For frontend work that requires data or API logic from the backend, you will need to build the client first and then run the server. To do this, run the following:

1. `cd cinema-booking-client`
2. `npm install`
3. `npm run build`
4. `cd ..`
5. `npm run start:dev`

***It is important to note that any changes you make to the client AFTER running these commands will not be reflected visually in your local development***. What these commands are doing is building a static and compressed version of our client into a folder called `dist` that we give to our server. If we need to make any changes to our client, we must rebuild the code and replace what was previously in the `dist` folder.

Once the application runs, however, the code has been setup so that our client is served via https://localhost:3000/home. You can use this URL for local development. 

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
