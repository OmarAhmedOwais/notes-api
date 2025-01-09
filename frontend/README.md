## Overview
This application is a note-taking and folder management system built with React, Redux Toolkit, and React Router. It provides a login and registration flow, protected routes for authenticated users, and a clean interface for creating, viewing, updating, and deleting notes and folders.

## Features
- User authentication with protected routes.  
- Folder management (create, view, update, delete).  
- Note management (create, view, update, delete) with folder assignment.  
- Form validation with `react-hook-form` and Yup.  
- API data fetching using `@reduxjs/toolkit/query`.

## Project Structure
- `features/auth`: Contains login and register pages.  
- `features/folders`: Handles folder functionality (APIs, hooks, pages).  
- `features/notes`: Manages notes functionality.  
- 

AppRoutes.tsx

: Defines the routing for the entire application, including protected routes.  

## Getting Started
1. Clone the repository.  
    ```bash
    git clone https://github.com/OmarAhmedOwais/notes-api
    ```
2. **Install dependencies**:
   ```bash
   cd notes-api/backend
   npm install
   ```
3. Set environment variables (e.g. `VITE_API_BASE_URL` for API URL).  
4. Start the development server:  
   ```bash
   npm run dev
   ```
Visits `http://localhost:5173` by default.

## Building
To create a production build:  
```bash
npm run build
```
Then deploy the contents of the `dist` folder.

## License
MIT License. Use this project as you wish.  