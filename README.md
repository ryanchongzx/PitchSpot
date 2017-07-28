# Socialize starter

[![Join the chat at https://gitter.im/StorytellerCZ/Socialize-starter](https://badges.gitter.im/StorytellerCZ/Socialize-starter.svg)](https://gitter.im/StorytellerCZ/Socialize-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A starter for [Meteor](https://www.meteor.com/) apps that takes care of basic
user functionality by utilizing the `socialize` packages.

## Getting started

### Install Meteor

#### OS X or Linux

Install the latest official Meteor release from your terminal:

`curl https://install.meteor.com/ | sh`

#### Windows

[Download the official Meteor installer](https://install.meteor.com/windows)

### Get the repository

Download the [newest version of the code](https://github.com/StorytellerCZ/Socialize-starter/releases)
or clone this repository either using a git client like [Github Desktop](https://desktop.github.com/)
or the terminal (you need to have git installed):

`git clone https://github.com/StorytellerCZ/Socialize-starter.git`

Navigate into the folder where you extracted/cloned the code.

Run `meteor` in the terminal.

The app will now be available on `localhost:3000`.

## Technology

Please refer to [Meteor Documentation](http://docs.meteor.com/#/full/) and [Meteor Guide](http://guide.meteor.com/)
on how to get started with Meteor and best practices. In addition this app follows the [Mantra recommendations](https://github.com/kadirahq/mantra).

[This article](http://tech.myemma.com/iifes-javascript-control-variable-scope/) supposedly helps to understand some Mantra code.

### React

React is used for the client using Mantra recommendations.

The user dashboard is in `client/modules/users/dashboard.jsx`.

Homepage is in `client/modules/pages/homepage.jsx`

### Materialize CSS

We are using Material design via the `poetic:materialize-scss`.

This allows you to use scss to change the theme easily.

Note: MaterializeCSS will be replaced in the near future with something else, probably Material-UI

### Routing

We are using `react-router` for routing.
You can find the routes in core module routes file.

### Roles

We are using `alanning:roles` for roles management.

Basic "user" role is added to each user after they register.

## Features

*   Login & Registration
*   Beta Signup
*   User profiles
*   User feed
*   Friending
*   Messaging
*   User search / listing

## Future plans

What is coming in the future?

*   Change Materialize CSS for Material-UI once `next` (aka v1) is released
*   React Storybook for all components
*   Default settings and other reusable components settings for all components
*   Improve existing functionality
*   Testing (Jest?)
*   Blogs
*   Badges
*   Administration components for everything
