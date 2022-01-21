# GYMIFY Fitness-Slot-Booking

<!-- PROJECT LOGO -->
<br />

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>About the Project</li>
    <li>Built with</li>
    <li>Getting started</li>
    <li>Prerequisites</li>
    <li>Project structure</li>
    <li>List of APIs</li>
    <li>Contribute</li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Our idea is to create a Gym / sport club slot booking application for employees. The application will be booking & subscription platform that enables employees to browse and book fitness & wellness services across partnered gyms / sports clubs in India (or any local campus for now) making it a holistic destination for all things fitness and sports.

YouTube video explaining the project as on 23rd May, 2021 (may not include newly updated features): https://youtu.be/oyxZlfoSnPs

### Built With

This web application uses the following technology

- [ReactJS](https://reactjs.org)
- [Create React App](https://create-react-app.dev/)
- [Reactstrap](https://reactstrap.github.io/)
- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com/)
- [MomentJS](https://momentjs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Firebase](https://firebase.google.com/)

<!-- GETTING STARTED -->

## Getting Started

To run this application locally

1. Clone the repo

2. Install NPM packages in client directory and server directory
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Create a firebase firestore database with collection name `event`
4. Add your firebase service account API key in `server/serviceAccountKey.json`
5. Add your Stripe API keys in `/client/.env` file.

### Prerequisites

You need to have the following Prerequisite to get started

- NodeJS
- Firebase Account
- Stripe test API

## Project Structure

| Folder Path         | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| client              | This directory contains all the files needed for Client Side Rendering.               |
| client/public       | This directory contains all static content for the web app                            |
| client/src          | This directory contains all the dynamic content for the web app                       |
| client/assets       | This directory contains CSS and images required for each component of the web app     |
| client/components   | This directory contains all the components for each web page                          |
| client/timezones    | This file contains all the strings of timezone as per the latest IANA database        |
| server              | This directory contains all the files needed for server side rendering                |
| server/routes       | This directory contains all the files to routes to API Calls                          |
| server/staticConfig | This file contains all the static configuration variables used throughout the backend |

## List of APIs

| API Routes   | Parameters         | Description                                                                                                                                                                                                          |
| ------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /freeSlots   | Date, Timezone     | Return all the free slots available for a given date converted to whatever timezone we pass.                                                                                                                         |
| /createEvent | DateTime, Duration | All the data passed will create the event and store that into the firestore document, if the event already exists for that time you need to return status code 422 or else just store it and return with status 200. |
| /getEvents   | startDate, endDate | Return all the events between given StartDate & EndDate                                                                                                                                                              |

<!-- CONTRIBUTING -->

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
