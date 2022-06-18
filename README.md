# Economist Scraping Assessment

# The assignment
We would like you to create a web application that shows data collected by the Economist
website (https://www.economist.com/).

- The data should be provided by an API infrastructure.
- To earn extra credit you need to provide a scraping system that allows us to retrieve data from the Economist website in realtime.

- The features it should include:
  - Show in a list of articles from the Economist website
  - Create an authentication system with a simple signup and login setup
  - Create an API infrastructure that gives back the list of article and single article information (only to logged-in users)

- Extra credit features:
  - Website scraping of the Economist website
  - Put the project online using Heroku or similar

## Build and Run with Docker and docker-compose

> It is possible execute `./run.sh` script, in order to run the application and configure MongoDb instance to persist the data.

or, to launch the single commands:

1. Build Docker image by:

```shell
$ docker build -t economist_scraping:latest .
```

2. Run docker-compose command:

```shell
$ docker-compose up -d 
```

## Build and Run on your Local Machine

In alternative, you can build and run the application on your local machine.

1. Install dependencies by:

```shell
$ npm install
```

2. Build application by:

```shell
$ npm run build
```

3. Run unit tests and integration tests, in order to understand if everything is well:

```shell
$ npm test
```

4. Finally, run the application:

```shell
$ npm start
```

## Description

The application provides three different endpoint, in order to retrieve and persist the main info about each article
from [Economist newspaper](https://www.economist.com/) website.

In particular:

- Trigger the parser of the Article homepage, retrieve title and subtitle and persist them
    - `POST <HOST>/api/v1/articles`
      
    The above API provides the list of ids of each article.


- Retrieve all articles by:
    - `GET <HOST>/api/v1/articles`


- Retrieve the single article, providing the article identifier
    - `GET <HOST>/api/v1/articles/<ARTICLE_ID>`

For example, you can verify the above endpoint by following cURL commands:
> curl -X POST http://localhost:3000/api/v1/articles
> 
> curl -X GET http://localhost:3000/api/v1/articles
> 
> curl -X GET http://localhost:3000/api/v1/articles/<ARTICLE_ID>
