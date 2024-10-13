# Dashboard-app

## Overview
This project is an interactive dashboard built with Next.js, Recharts, and Supabase. It lets users log in, see various metrics, and visualize data in different ways.

## Features
- **User Authentication**: Users can sign up and log in using Supabase.
- **Real-Time Data**: Some dashboard widgets update in real time.
- **Responsive Design**: The dashboard looks good on both desktop and mobile devices.
- **Dark Mode**: Users can switch between light and dark themes.
- **Data Export**: Users can download data as CSV files.

## Technologies Used
- **Frontend**: Next.js, React, Recharts, Bootstrap
- **Backend**: Supabase (for the database and authentication)
- **Deployment**: Vercel (where the app is hosted)

## Getting Started

### Prerequisites
Before you begin, make sure you have these installed:
- Node.js (version 16 or higher)
- npm or yarn (for managing packages)

### Installation
1. **Clone the Repository**:
   git clone https://github.com/Pradeepreddybudida/Dashboard-app.git
   cd Dashboard-app/dashboard-project

2. **Install Dependencies** : 
    npm install 

### Running the project Locally
To start the application locally, run:
npm run dev
Then, open your browser and go to http://localhost:3000 to see the dashboard application.

### Deployment 
The app is hosted on Vercel. You can check it out here : https://dashboardapp-tau.vercel.app 

### API Documentation 

## Authentication Endpoints 
**POST /api/auth/signup**
- Registers a new user.
-Data to send : 
   email: User's email (required)
   password: User's password (required)
-Response :
   201: User created successfully.
   400: Email is already in use.

**POST /api/auth/login**
-  Logs in an existing user.
- Data to Send:
    email: User's email (required)
    password: User's password (required)
- Response:
    200: Successful login, returns user session.
    401: Invalid credentials.
  
## Data Management Endpoints
**GET /api/data**
- Gets all data entries from the database.
- Response:
   200: Returns a list of data entries.
  
**POST /api/data**
- Creates a new data entry.
- Data to Send:
  metric name: The title of the data entry (required)
  value: The value of the data entry (required)
-Response:
   201: Data entry created successfully.

### Documentation
## Setup Instructions
For more information on how to set up and run the project locally, check the **Getting Started** section above.

