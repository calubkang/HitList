# Frontend

This is the frontend for HitList, an application designed to help job seekers keep track of their job applications and stay organized during the job hunt.

## Introduction

The frontend of HitList communicates with a backend server using HTTP requests. Specifically, it uses the axios library to send HTTP requests to the backend API. The frontend interacts with the backend through the services folder, which contains modules that define functions for sending requests to the API. These functions abstract away the details of making HTTP requests, and provide a simplified interface for the frontend to interact with the backend.

## Technologies

* BootStrap 5.2.2
* React 18.2.0
* Axios 1.1.3

## Frontend/Backend Communication

Here's an example of how the frontend interacts with the backend to create a new hit. The following code can be found in the App.js file on lines 213-239: 

```javascript

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

This code snippet shows a function called `addHit` that's responsible for creating a new hit. When the user submits a form to create a new hit, the `addHit` function is called. It creates a new hit object with the form data, and then uses the `listService.createHit` function to send an HTTP POST request to the backend API to create the new hit. Once the request is successful, the frontend updates its state with the new hit. Since the `createHit` function is defined in the services folder, we need to include ```import listService from './services/list' ```. 

Here's how the `listService` module sends an HTTP POST request to create a new hit:

```javascript
const createHit = async newHit => {
  const response = await axios.post(baseUrl, newHit, config)
  return response.data
}
```
This code snippet shows the `createHit` function that sends an HTTP POST request to the backend API to create a new hit. It uses the `axios.post` method to send the request, passing in the API endpoint (`baseUrl`), the data for the new hit (`newHit`), and a configuration object (`config`) that contains any additional information needed for the request (e.g. authentication headers).


## Setup and Launch

* Clone the repository into a folder for frontend
* Run ```npm install```
* Run  ```npm start```
    * Runs the app in the development mode.\
      Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

