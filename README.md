# AI Job Portal

An AI-powered Job Portal built using React, Node.js, Express, and MySQL. The platform allows users to search jobs, apply for positions, analyze resumes, and track applications through a personalized dashboard.

## Features

### User Features

* User Registration and Login
* JWT Authentication
* Browse Available Jobs
* Search Jobs by Skill
* Apply for Jobs
* Resume Analyzer
* Personalized Dashboard
* Application Tracking

### Admin Features

* Admin Login
* Add New Jobs
* Manage Job Listings

## Tech Stack

### Frontend

* React.js
* Bootstrap 5
* React Router DOM
* Chart.js

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* PDF Parse

### Database

* MySQL

## Project Structure

```text
job-portal-dashboard
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── routes
│   ├── db.js
│   └── package.json
│
├── database
│   └── schema.sql
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/job-portal-dashboard.git
cd job-portal-dashboard
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jobportal

JWT_SECRET=your_secret_key
```

### Start Backend

```bash
cd server
node index.js
```

### Start Frontend

```bash
cd client
npm run dev
```

## Screenshots

### Home Page

Add screenshot here

### Jobs Page

Add screenshot here

### Resume Analyzer

Add screenshot here

### Dashboard

Add screenshot here

### My Applications

Add screenshot here

## Future Improvements

* AI-based Job Recommendation Engine
* Email Notifications
* Interview Preparation Module
* Resume Score Enhancement Suggestions
* Company Profiles
* Admin Analytics Dashboard

## Author

Muhammad Razeen

GitHub: https://github.com/razeen43

