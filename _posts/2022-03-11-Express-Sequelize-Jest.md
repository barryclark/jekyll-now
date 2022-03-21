
---
layout: post
title: Basic Javascript REST API with DB and integration tests Part 1 - Express/Sequelize
---

## Overview

Through this series I intend to explain every step fully, if you follow these steps exactly you will get a working project. However I will also be placing links throughout where you can read up on concepts and programs in more detail. If you are reading this to learn I recommend taking the time to read a little further on each step where you can.

Now onto the details, in this series we will be going through every step required to create a very basic RESTful API that uses:

* [Express](https://expressjs.com/) for the server
* [Sequelize](https://sequelize.org/) for the database set up
* Containerised [Postgres](https://www.postgresql.org/) as the database
* [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) to conduct API tests

## Thank you's and Sources

At the beginning of this walkthrough I wanted to state my sources and how this article has been put together. As always in the open source world nothing is brand new and everything is iterative, in this case this walkthrough is an amalgamation of tutorials and articles I found online that helped me build this code from scratch. So thanks to these guys and definitely check their work out if you can.

* [Djamware RESTful API video](https://www.youtube.com/watch?v=oWSN9AQK1RM&t=852s)
* [Muhammad Lufty's article on Jest and Supertest](https://dev.to/mhmdlotfy96/testing-nodejs-express-api-with-jest-and-supertest-1bk0)

## Pre-requisites

I will include the versions of the installed software as I write, you should be able to complete the steps on newer versions but be aware that commands/syntax and compatibility may change

* Installed Node.JS and NPM - [Installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node v16.14.0 & npm 8.3.1)
* Docker - [Installation](https://docs.docker.com/get-docker/) (Docker 20.10.11)
* docker-compose - [Installation](https://docs.docker.com/compose/install/) (docker-compose version 1.29.2)
* I recommend an IDE of some sort to help write the code, I am using VSCode - [Installation](https://code.visualstudio.com/download) (1.65.2)
* A terminal, I will be using BASH. A terminal will be included on Linux and OSX. I'd recommend WSL on Windows [Installation](https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/)

## Steps

### Install Express and set up the scaffolding

1. Download Express generator

    ```bash
    npm install express-generator -g
    ```

2. Navigate to your projects folder

3. Scaffold an [Express](https://expressjs.com/) project

    ```bash
    express node-sequelize-postgres-jest-supertest --view=ejs
    ```

4. Move into the newly created project

    ```bash
    cd node-sequelize-postgres-jest-supertest
    ```

5. Install pre-packaged node packages

    ```bash
    npm install
    ```

### Add and configure Sequelize

1. Install [sequelize-cli](https://sequelize.org/master/manual/migrations.html) globally

    ```bash
    npm install -g sequelize-cli 
    npm install sequelize-cli 
    ```

2. Install [sequelize](https://sequelize.org/master/index.html) in the project

    ```bash
    npm install sequelize
    ```

3. Install the [Postgres](https://sequelize.org/master/manual/migrations.html) modules

    ```bash
    npm install pg pg-hstore
    ```

4. Create sequelize config file

    ```bash
    touch .sequelizerc
    ```

5. Open the project in your IDE

6. Edit the newly made .sequelizerc file and enter this text. For more info on what this config file does see [here](https://sequelize.org/master/manual/migrations.html)

    ```
    const path = require('path');

    module.exports = {
    "config": path.resolve('./config', 'config.json'),
    "models-path": path.resolve('./models'),
    "seeders-path": path.resolve('./seeders'),
    "migrations-path": path.resolve('./migrations')
    };
    ```

7. Initialize sequelize

    ```bash
    sequelize init
    ```

8. Edit the file in config/config.js so it looks like below

    ```
    {
    "development": {
        "username": "postgres",
        "password": "postgres",
        "database": "remakingeden",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "postgres",
        "database": "remakingeden_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "postgres",
        "password": "postgres",
        "database": "remakingeden_production",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
    }
    ``` 

Well done! You now have the scaffolding of a basic express project with sequelize installed and configured.

## Wrap up

So far we have looked at creating a generic express project and adding modules for sequelize and postgres. We have edited the config to make it ready to be used in the next stage of the walkthrough. This is a brilliant foundation on which to build the remaining API and tests.

If you have got lost at all, or would just like to learn more about what we have done please click on the links throughout the steps and read the extra documentation.

## What is next?

Next up we will look at creating a docker-compose file that will start a postgres container on our local machine with just one command. This will then be ready to fill with data using sequelize.

# Part 2 - Coming soon
