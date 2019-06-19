Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

[![Maintainability](https://api.codeclimate.com/v1/badges/364872e4cd924658e574/maintainability)](https://codeclimate.com/github/kriswonder/automart2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/364872e4cd924658e574/test_coverage)](https://codeclimate.com/github/kriswonder/automart2/test_coverage)

[![Coverage Status](https://coveralls.io/repos/github/kriswonder/automart2/badge.svg?branch=develop)](https://coveralls.io/github/kriswonder/automart2?branch=develop)

[![Build Status](https://travis-ci.org/kriswonder/automart2.svg?branch=develop)](https://travis-ci.org/kriswonder/automart2)


## UI

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub Pages link for UI
[AutoMart/UI link](https://kriswonder.github.io/automart2/UI/index.html)

---------------------------------------------------------------------

## SERVER

## API documentation was done using swagger and can be accessed using this  url 
[Api documentation link](https://automart2.herokuapp.com/api-docs)

## Pivotal Tracker can be accessed using this this url  
[Pivotal Tracker link :(https://www.pivotaltracker.com/n/projects/2348908)
## Used Tools

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* (run time Environment for running JS codes)
 ```
### Framework
```
 *Express* (used for building fast APIs)
 ```
### Testing Framework and assertion library
```
 *Mocha* and *Chai*
 ```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
### Heroku link Example
[AutoMart heroku link] (https://automart2.herokuapp.com/)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository ```https://github.com/kriswonder/automart2.git``` or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Run the test
```
> npm test
```
server runs on port 3000

## _API Endpoints_

| Endpoint                                                      | Functionality                          | HTTP method |
| ------------------------------------------------------------- | :------------------------------------: | ----------: |
| /api/v1/auth/signup                                           | Create a user account                       | POST   |
| /api/v1/auth/login                                            | Login a user                                | POST   |
| /api/v1/car                                                   | Create a car advertiment                    | POST   |
| /api/v1/car/:id                                               | Get a single car by its id                  | GET    |
| /api/v1/car                                                   | Get all cars                                | GET    |
| /api/v1/car?status=avaliable&minPrice=100000&maxPrice=5000000 | View all car between the min and max prices | GET    |
| /api/v1/car?status=avaliable&manufacturer=benz                | Return all coupe benz cars                  | GET    |
| /api/v1/car?status=avaliable&bodyType=coupe                   | Return all coupe bodyType cars              | GET    |
| /api/v1/car?status=avaliable&state=new                        | Return all new cars                         | GET    |
| /api/v1/car/:id/status                                        | Modify status of a car(sold/unsold)         | PATCH  |           |/api/v1/car/:id/status                                         | Modify price of a car                       | PATCH  |
| /api/v1/car/:id/flag                                          | Flag an advert as fraudulent                | POST   |
| /api/v1/car/:id                                               | Delete an advert                            | DELETE |
| /api/v1/order                                                 | Create an order for a car                   | POST   |
| /api/v1/order/:id?price                                       | Modify an order for a car                   | PATCH  |
| /api-docs                                                     | Read API documentation                      | GET    |


## Author
- Okeke Christopher
- Email: okekechristopher05@gmail.com

---

## License & copyright
Copyright (c) Okeke Christopher

