# Backend

This is the backend server for HitList, an application designed to help job seekers keep track of their job applications and stay organized during the job hunt.

## Introduction

This backend server is built with Node.js, Express.js, and MongoDB, and is responsible for handling the API endpoints required for the HitList application to function. The server is hosted on a remote server or locally on your machine, and must be running in order for the frontend of the application to function properly.

## Technologies

* Express 4.18.2
* Node 19.0.1
* MongoDB

## Installation

1. Clone this repository to your local machine
2. Ensure that you have Node.js and MongoDB installed on your machine
3. Create a .env file in the root directory of this folder ('backend'), and add your MongoDB URI as the `MONGODB_URI` variable and choose a PORT Number as the `PORT` variable.
4. Run `npm install` to install all the necessary dependencies
5. Run `npm start` to start the server

## API Reference
The following API endpoints are available:

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------|
| GET | /api/hitlist | Get all hits |
| POST | /api/hitlist | Add new hit |
| PUT | /api/hitlist/:id | Update hit with given id |
| DELETE | /api/hitlist/:id | Delete hit with given id |
| POST | /api/users | Add new user |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user with given id |
| POST | /api/login | User login |

