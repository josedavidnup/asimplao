# PERN APP - Dog Breeds

<img height="200" src="./dog.jpg" />

## Project goals

- Build an App using React, Redux, Node and Sequelize.
- Affirm and connect the concepts learned in the race.
- Learn best practices.
- Learn and practice the GIT workflow.

## Starting

1. Fork the repository to have a copy of it on your accounts
2. Clone the repository on your computers to start working

You will have a `boilerplate` with the general structure of both the server and the client.

**IMPORTANT:** It is necessary to have at least the latest stable version of Node and NPM. Make sure you have it in order to correctly install the dependencies needed to run the project.

Currently the required versions are:

- **Node**: 12.18.3 or higher
- **NPM**: 6.14.16 or higher

To check which version you have installed:

```bash
node -v
npm -v
```

## BoilerPlate

The boilerplate has two folders: `api` and `client`. In these folders will be the code of the back-end and the front-end respectively.

In `api` create a file called: `.env` that has the following form:

```env
DB_USER=postgresUser
DB_PASSWORD=postgresPassword
DB_HOST=localhost
```

Replace `postgresUser` and `postgresPassword` with your own credentials to connect to postgres. This file will be ignored on github upload, as it contains sensitive information (credentials).

Additionally, it will be necessary to create from psql a database called `dogs`

The `client` content was created using: Create React App.

## Description

The general idea is to create an application in which you can see different dog breeds along with relevant information about them using the external api [the dog api](https://thedogapi.com/) and from it be able, among other things:

- Search dogs
- Filter / Sort them
- Add favorite dogs
- Add new dogs

**IMPORTANT**: To be able to use this external API it is necessary to create an account to obtain an API Key that must then be included in all the requests we make to rawg simply by adding `?api_key={YOUR_API_KEY}` at the end of each endpoint . Add the key in the `.env` file so that it is not uploaded to the repository for security reasons and use it from there.

**IMPORTANT**: For the filtering and sorting functionalities you can NOT use the external API endpoints that already return the filtered or ordered results but you must do it yourself. In particular, some of the ordering or filtering must be done from the frontend.

#### Used technologies

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Frontend

A React/Redux app should be developed that contains the following screens/routes.

**Initial page**: It is a landing page with:

- [ ] Some background image representative of the project
- [ ] Button to enter home (`Main route`)

**Main path**: contains:

- [ ] Search input to find dog breeds by name
- [ ] Area where the list of dog breeds will be seen. You will need to show your:
  - Image
  - Name
  - Temper
  - Weight
- [ ] Buttons/Options to filter by:
  - Temper
  - Existing race (that is, those that come from the API) or added by us (created through the form)
- [ ] Buttons/Options to sort both ascending and descending dog breeds by:
  - Alphabetical order
  - Weight
- [ ] Paginated to search and display the following breeds, showing 8 breeds per page.

**Dog Breed Detail Path** - Contains

- [ ] The fields shown in the main route for each breed (image, name and temperament)
- [ ] Height
- [ ] Weight
- [ ] Years of life

**Dog Breed Creation Path** - Contains

- [ ] A form **controlled with JavaScript** with the following fields:
  - Name
  - Height (Differentiate between minimum and maximum height)
  - Weight (Differentiate between minimum and maximum weight)
  - Years of life
- [ ] Possibility to select/add one or more temperaments
- [ ] Button/Option to create a new breed of dog

## Database

The database model has the following entities

- [ ] Breed with the following properties:
      -ID\
  - Name \
  - Height \
  - Weight \
  - Years of life
- [ ] Temperament with the following properties:
      -ID
  - Name

The associations between both entities is many-to-many since a dog breed can have several "temperaments" simultaneously and, in turn, a "temperament" can correspond to multiple different dog breeds. For example, the `pug` breed is docile, intelligent and sociable (among others). But at the same time, there are other dog breeds that are also sociable or intelligent.

## Backend

The server is developed in Node/Express with the following routes:

**IMPORTANT**: Filtering, sorting, paging and these features are implemented and created without using the external API features.

- [ ] **GET /dogs**:
  - Get a list of dog breeds
  - Returns only the data needed for the parent path
- [ ] **GET /dogs?name="..."**:
  - Get a list of dog breeds that contain the word entered as query parameter
  - If no dog breed exists, display an appropriate message
- [ ] **GET /dogs/{idBreed}**:
  - Get the detail of a particular dog breed
  - Brings only the data requested in the dog breed detail route
  - Include associated temperaments
- [ ] **POST /dogs**:
  - Receives the data collected from the controlled form of the dog breed creation path by body
  - Create a dog breed in the database related to their temperaments
- [ ] **GET /temperaments**:
  - Get all possible temperaments
  - In the first instance they are obtained from the external API and stored in their own database and then used from there
