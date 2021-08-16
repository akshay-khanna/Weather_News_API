
# News and Weather 

A Node express application providing users with facility to get weather details and news

The Application sample provides weather info for all users.

The news endpoint is authenticated.

Login Signup and Logout functionality are implemented as well with mongodb as database to store user details.

# API Reference



## Signup
```http
  POST /signup
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :-------------------------             |
| `name`    | `string` | **Required**.  User name               |
| `email`   | `string` | **Required**.  User email              |
| `password`| `string` | **Required**.  User password           |

#### Signup as a new user to application
Adds a new user details to database

## Login 

```http
  POST /login
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :-------------------------             |
| `email`   | `string` | **Required**. Registered User email    |
| `password`| `string` | **Required**. registered User password |

#### Login an preexisting user
Adds a jwtwebtoken to manage session for the user


## Logout 

```http
  POST /logout

  Bearer Token needs to be passed for the logged in user 
```


#### Logout an authenticated user
Removes jwtwebtoken to manage session for the user




## Get news

```http
  GET /news
  
  This is an authenticated request.
```


  | Parameter     | Type     | Description                                      |
| :--------       | :------- | :------------------------------------------------|
| `search`        | `string` | *Optional*  Search Keyword to be used by API     |

#### returns news

returns news headlines and link with either top news if no search parameter
or result for the keyword 

## Get weather

```http
  GET /weather

  No Authentication Required
```
 
#### returns weather

returns 5 days weather with date main Description and temperature along with city details.
## Installation

Clone the  github project

```
cd <News_Weather_API>

npm Install

Add the neccessary env variables in config folder .env file

npm run dev

```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`WEATHERAPIENDPOINT` url for the weather endpoint (e.g.) http://api.openweathermap.org/data/2.5/forecast

`WEATHERAPILOC` Location for which weather info is needed

`WEATHERAPIKEY` API KEY for openweathermap

`NEWSAPIKEY` API KEY for newsapi.org

`JWT_SECRET` Secret string for jwt
 
`MONGODB_URL` Mongo DB Url String with user password and database name

`PORT` Port on which application needs to run

`WEATHERUNIT` Unit for the weather api (standard, metric and imperial )
