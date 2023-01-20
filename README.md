# Cinema Booking App

Please use this README as a one-stop resource. Outlined below will be guidelines for development work, including best practices for code reviews, git basics, and other general information. 

## Getting Started

This repo contains two source folders, `cinema-booking-client` and `cinema-booking-server`. The client folder contains all front-end related code and can be treated as an independent entity. The server folder, on the other hand, is our middleware. This is where all database logic will be handled, in addition to the logic required to serve our static client folder: `cinema-booking-client`. 

The first thing you should do **anytime** you pull code is run `npm install`. This ensures that you have the most up-to-date package information.

## Git Essentials

Git is an amazing tool for these kinds of projects, and utilizing it effectively will be essential for maintaining our repository. There is only one rule:

***Nobody, under any circumstance, is to push their code directly to the master branch.***

Doing this will most likely break things, and this is why we have code reviews. Everyone is strongly encouraged to provide feedback for others on their code, and the combined efforts of this feedback will result in a higher quality application. 

Because you are not allowed to push directly to the master branch, you must create your own branch, commit your changes, submit a pull request, and respond to feedback. Once your branch has been approved, you can merge your code. 

Please use the below steps as a general outline each time you sit down to make changes:

1. Pull the most recent changes from the master branch: `git pull origin master`
2. If you are not already on your own branch, checkout to a new one by running: `git checkout -b BRANCH_NAME`. You can view your current branch by running `git branch`
3. Make your changes
4. Add the files to be included in your commit, either: `git add -u` or `git add .`
5. Commit your changes to your branch, making sure to use a descriptive commit message: `git commit -m "DESCRIPTIVE_MESSAGE"`
6. Push your changes to your branch: `git push -u origin BRANCH_NAME`
7. Go to github.com and submit a pull request
8. Send teammates a message about your PR and ask for feedback
9. Respond to feedback and update your PR
10. Once approved, merge your code

I (Luke), will be in charge of reviewing any PR's relating to frontend development work, and Evan will be in charge of reviewing PR's for backend related work. Only I or Evan can give approval for PR's. 

## Frontend Development

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

***It is important to note that any changes you make to the client AFTER running these commands will not be reflected visually in your local development***. To see your new frontend changes, you must kill your current local server and run the above commands to restart the application. 

Once the application runs, however, the code has been setup so that our client is served via https://localhost:3000/home. You can use this URL for local development. 

## Backend Development

To run the backend application, simply navigate into the root directory and run `npm run start:dev`.

I will provide information regarding our MongoDB database as soon as I set it up.
