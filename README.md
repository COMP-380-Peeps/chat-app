# AWS Build Status
[![Node.js CI](https://github.com/COMP-380-Peeps/chat-app/actions/workflows/node.js.yml/badge.svg)](https://github.com/COMP-380-Peeps/chat-app/actions/workflows/node.js.yml)
# How to set up local environment
This might get more complicated as time goes on, but currently you need to:

1. Make sure you have [Node](https://nodejs.org/en/download/releases/) installed. Make sure it is version 16.x since that is what the AWS EC2 instance uses. If you have other versions of Node on your system I'd recommend installing Node Version Manager (NVM)
2. Once you have Node installed, (you might need to restart your computer), you should clone the `staging` branch. You can either install Git (terminal usage), GitHub Desktop (GUI), or use built in Git functions in your IDE (VSCode, or Jetbrains).
3. Once the repository is cloned, open the project in your IDE, and open a terminal window to run: `npm install`. This will install all of the needed packages to run the frontend locally. Note: as we add new features we might have new dependincies, so re-running `npm install` might be necessary.
4. From the same terminal run: `npm start`, this should start up the frontend and automatically open a browser window of our site!
5. Success!

# Important
Before you make any code changes, MAKE A NEW BRANCH! This is to ensure we do not overwrite code that may be important, accidentally. You will make a new, different branch for every task assigned to you, and once you are finished with the task you will submit a Pull Request (PR). 

Please do not work on, or push to the master branch, and when you make a PR for your branch, please assign me as a reviewer. All of our work will be done to the staging branch before merging to master. This is so I can run your code on my computer to double check everything works, and does not conflict with any existing code.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
