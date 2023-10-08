**Table of contents**

1. [Introduction](#introduction)
2. [How to run](#how-to-run)

## <a name="introduction"> Introduction </a>

The goal of this assigment was to create "Jokes" app where a user can browse, edit, create, delete jokes.

## <a name="how-to-run"> How to run </a>

**Running locally**

First you need to install all dependencies with the following command:

```bash
npm install
```

You need to create a `.env.development` (or `.env.pruduction` if you want to run the production build) file under root and set the api url:

```bash
REACT_APP_API_URL=https://retoolapi.dev/vcv4zy/
```

To run the app run the following command:

```bash
npm run start
```

**Running in container**

You can also run the app inside a docker container. You can use the following make commands to build, run and clean the container.

- Build the image:

```bash
make build-app
```

- Run the app:

```bash
make run
```

- Build and run the app:

```bash
make start
```

- Stop the container:

```bash
make stop
```

- Stop the container and cleanup:

```bash
make clean
```

**Running the e2e test**

You can run the e2e with the following command with the client running:

- Cypress Test Runner UI

```bash
make tests
```

- Cypress Headless mode

```bash
make tests-bg
```

# Assignment

## API

Endpoint URL: https://retoolapi.dev/vcv4zy/jokes

### Joke structure

```JSON
  {
    "id": 19,
    "Title": "Mountaineering",
    "Body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Author": "crubery6s@simplemachines.org",
    "Views": 98,
    "CreatedAt": 1670164409747
  }
```

### HTTP method endpoints

| Method Type  | Endpoint                          |
| ------------ | --------------------------------- |
| GET          | vcv4zy/jokes                      |
| GET filter   | vcv4zy/jokes?Views=84             |
| GET by id    | vcv4zy/jokes/1                    |
| GET paginate | vcv4zy/jokes/?\_page=2&\_limit=10 |
| POST         | vcv4zy/jokes                      |
| PUT          | vcv4zy/jokes/1                    |
| PATCH        | vcv4zy/jokes/1                    |
| DELETE       | vcv4zy/jokes/1                    |

You can see more routes [here](https://www.npmjs.com/package/json-server#routes)

## Specification

In the main page a table should list all the jokes paginated with options for 5 and 10 items per page selected by the user in the very bottom of the table with two buttons for next (>) and previous (<) page and one dropdown to select the 5 or 10 item limit.
The information shown in the table should have the following columns:

| Title     | Author               | Created Date | Views |
| --------- | -------------------- | ------------ | ----- |
| JokeTitle | crubery6s@\*\*\*.org | 23 Feb 2022  | 65    |

Author's and Date format should be exactly as in the example above

### Style

Columns has gaps and a vertical line between them like in the image bellow
![styling](https://i.imgur.com/j4d9fNG.png)

In the views column every number has to be one of the following colors following the rules:

- if the number of views is between 0 and 25,inclusive the number must be <span style="color:tomato">tomato</span>
- if the number of views is between 26 and 50,inclusive the number must be <span style="color:orange">orange</span>
- if the number of views is between 51 and 75,inclusive the number must be <span style="color:yellow">yellow</span>
- if the number of views is between 76 and 100,inclusive the number must be <span style="color:green">green</span>

### Functionality

1. Title should be a link leading to another page where the user should have a prefilled form with all the fields and a button to submit any changes for the specific item. There should be also a close button to go back if the user does not want to make any changes as well as a delete button to delete the item.
2. In the home page it should be also a add new joke button that leads to the same form as above but with all the form fields empty.
3. A dark mode toggle should switch background and text color.
4. In order for the user to have access to the application, a "token" should exist in cookies or local storage. If there is no "token" a login screen prompts the user to click a button that stores a "token". Also a logout button should displayed in the home page.

# Git

To start developing, create a git repository and add this file as Readme.md in the main branch. Then start developing the application in another branch.
