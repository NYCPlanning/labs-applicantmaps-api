# Applicant Maps API

An Express API for creating, reading, and updating DCP Applicant Maps. It uses mongodb to store documents for an applicant mapping project.

Works with the [labs-applicantmaps](https://github.com/nycplanning/labs-applicantmaps) frontend app.

## Setting Up a Local Development Environment

### Requirements

You will need the following things installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) **version listed in .nvmrc**
  - We suggest installing versions of Node via [nvm](https://github.com/nvm-sh/nvm).
- [Yarn v1.x](https://classic.yarnpkg.com/lang/en/)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/get-started/)
- [Docker compose v2](https://docs.docker.com/compose/compose-file/)
  - Compose is available as a CLI plugin or through a setting in Docker Desktop

### Option 1: MongoDB and Node API in docker network
This option is useful when you are working on the frontend and simply want to run a local backend

* Run all services in the compose file, which includes the database and api
  - `docker compose up` 

### Option 2: MongoDB in docker and Node API on host
This option is useful when you are making changes to the API

* Run MongoDB in docker
  - `docker compose up database`
* Install the [listed](.nvmrc) version of Node
  - (If using nvm) `nvm install`
* Install Yarn and Nodemon
  - `npm i --location=global yarn nodemon`
* Install Dependencies using Yarn
  - `yarn`
* Copy the contents of `env.example.local` to a new file called `.env`. The contents of `.env.example.local` are pre-configured to connect to the database created by `compose.yaml`
  - `cat .env.example.local > .env` (or manually create the file, then copy and paste)
* Start the api server by running
  - `yarn run dev`

## Endpoints

`GET /projects/:id`
- Get a project's config by id

`POST /projects`
- Create a new project

`POST /projects/:id`
- Update an existing project by id.  This results in incrementing the `__v` attribute in mongodb.

## Environment Variables
When deploying, create a `.env` file based on `.env.example`.

`MONGO_URI` - the connection string for the mongodb database

`NODE_ENV` - 'development', 'staging', or 'production'

## Schema

Schema is defined in `models/projects.js`.  On creation of a new project, `shortid` is used to generate a unique hash that is stored in the `_id property`

```
{
  _id: {
    type: String,
    required: true,
    default: shortid.generate(),
  },
  meta: {
    type: Object,
    required: true,
  },
  maps: {
    type: Array,
    required: true,
  },
}
```
