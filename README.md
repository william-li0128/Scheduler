# Interview Scheduler
## Project Description

Interview Scheduler is a Single Page Application(SPA) to track students interviews built with the latest tools and techniques for optimized user experience.
The App allows users to add, edit and delete appointments in real time. It uses  React built-in and custom hooks
Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format.
Moreover, for quality assurance, the project follows best practices of Test Driven Development (TDD).i.e, individual Component is tested in isolation as well as End-to-End testing is performed.

## Project Features
- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- The days show the number of slots available
- A user can switch between days and see detailed information
- Booked and available slots are clearly differentiated
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- A user can change the details of an existing interview by pressing the edit icon
- A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
- Days display currently remaining spots and show updates after each modification

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
### Daily view
!['booked-slots-available'](https://github.com/william-li0128/Scheduler/blob/master/docs/appointment_page.png?raw=true)
*By selecting a weekday , a user can see booked appointments and available slots for each day.*

### Book an Appointment
!['book-an-appointment'](https://github.com/william-li0128/Scheduler/blob/master/docs/new_appointment.png?raw=true)
*A user can choose any empty slot to book an appointment*

### No slot available for a specific day
!['after-booking'](https://github.com/william-li0128/Scheduler/blob/master/docs/new_appointment-saved.png?raw=true)
*Booked appoinments would get displayed in the homepage after saving*

### No slot left for a specific day
!['no-slot-left'](https://github.com/william-li0128/Scheduler/blob/master/docs/no_slot_left.png?raw=true)
*Nav bar rendered to grey when no slot left for that day*

### Deleting an appointment
!['delete-an-appointment'](https://github.com/william-li0128/Scheduler/blob/master/docs/delete_appointment.png?raw=true)
*When a user wants to delete an appointment, there will be a confirmation popup*


## API server/*Database Setup

For full functionality both must run concurrently: the client and the API server applications.
- Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in README to install and setup the database
- Fork and clone this repo
- Navigate to the root directory and install dependencies with `npm install`
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project `npm start`

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, SASS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Testing Library and Cypress