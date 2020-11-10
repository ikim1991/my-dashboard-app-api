# My Dashboard Back-end  

### Summary  

For the sole purpose of trying to be more productive, I created this personalized dashboard web application. The dashboard has several functionalities such as:
  - A Task Manager (To-Do List)
  - A collection of developer-related job postings from 4 different sources
  - A collection of financial data such as the intraday data as well as news and press releases of several stock tickers

The back-end application is hosted on Heroku using its free-tier plan. This may cause the first login to take a few seconds to load as the app is put to sleep after 30 minutes of inactivity.  

The front-end web application is hosted on GitHub using GitHub pages.  
[Website Link](https://ikim1991.github.io/my-dashboard-app/)  
[GitHub Repo](https://github.com/ikim1991/my-dashboard-app/)  

The Back-end was built using Express.js and MongoDB on Node.js. It also utilizes JWTs for user authentication and persistence sessions, as well as bcrypt.js for storing passwords.  

A 16:9 aspect ratio resolution is recommended.  
The app is currently not supported on mobile and tablets.  
Minimum screen resolution width of 1024px required.  

### Images  

![Login Page](./app-images/login.png "Login Page")  
The main Login Page (Screenshot from 1366x768 resolution)  

![Register Page](./app-images/register.png "Register Page")  
Register Page (Screenshot from 1366x768 resolution)  

![On Register](./app-images/onregister.png "On Register")  
Main page on first load after registering (Screenshot from 1366x768 resolution)  

![Add Stock Tickers](./app-images/addstocktickers.png "Add Stock Tickers")  
Lobby (Screenshot from 1366x768 resolution)  

![Financial Data](./app-images/financialdata.png "Financial Data")  
Updating stock tickers and financial data (Screenshot from 1366x768 resolution)  

![Job Postings](./app-images/jobpostings.png "Job Postings")  
Collection of job postings (Screenshot from 1366x768 resolution)  

![Create New Task](./app-images/newtask.png "Create New Task")  
Create a new task and add to the To-Do list (Screenshot from 1366x768 resolution)  

![To Do List](./app-images/todolist.png "To Do List")  
Example of what the dashboard could look like (Screenshot from 1366x768 resolution)  

### License  

The MIT License (MIT)  

Copyright 2020 Chris Kim  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
