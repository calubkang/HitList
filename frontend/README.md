# Frontend

This is the frontend for HitList, an application designed to help job seekers keep track of their job applications and stay organized during the job hunt.

## Introduction

The frontend of HitList communicates with a backend server using HTTP requests. Specifically, it uses the axios library to send HTTP requests to the backend API. The frontend interacts with the backend through the services folder, which contains modules that define functions for sending requests to the API. These functions abstract away the details of making HTTP requests, and provide a simplified interface for the frontend to interact with the backend.

## Technologies

* BootStrap 5.2.2
* React 18.2.0
* Axios 1.1.3

## Frontend/Backend Communication

Here's an example of how the frontend interacts with the backend to create a new hit:

```

import listService from './services/list'

const addHit = (event) => {
  event.preventDefault()
  const newHit = {
    company: newCompName,
    position: newPos,
    contact: newContactName,
    email: newEmail,
    reachedOut: false,
    interviewScheduled: false,
    interviewFinished: false,
  }
  listService.createHit(newHit)
    .then(newItem => {
      setListItems(listItems.concat(newItem))
      resetForm()
    })
}

```
## Setup and Launch

* Clone the repository into a folder for frontend
* Run ```npm install```
* Run  ```npm start```
    * Runs the app in the development mode.\
      Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

