
## Introduction and Assumption

This project is the code Challenge of Myob to do a payroll system. It is deployed on Heroku and avaliable on URL: [https://payrollsystemmyob.herokuapp.com](https://payrollsystemmyob.herokuapp.com)

* The tax rate I'm using to generate tax is the newest one avaliable on ATO
* The system can only generate and pay the current calendar month's payslip (The version of can input the pay period is also avaliable)
* The date of pay period will always be the same day at the 28th of the month.
* The backend used moongoose Atlas as database, to make life easy, I put the URL straight away in the code. The right way is to put it in .env file

## Technology Stack
1. Using React + Redux as the front-end framwork. Because it required to calculate all data at front-end, to manage data and calculation, I choose to put all calculation in redux to deal with data.
2. Using Express + mongodb as the backend. Because it is easy and quick to build a functional backend server to serve frontend, and mongodb can store the information as JSON format, easy to get and post. 
## Install and run
You need to install Node.js to run the following script.

As this project has a server side and a client side

### installation
1. `cd payroll_system` to go to the project
2. Then install the node_modules `npm install`
### running locally
1. run the server `npm run dev`, front-end will running on port 3000, the server will run on 5000
2. open [http://localhost:3000](http://localhost:3000)

### running test
1. make sure to run npm run dev first and keep the server running
2. `npm run test` to lauch the test

## Demo
![payroll demo](/demo.gif)



