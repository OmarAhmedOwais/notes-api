# Notes Application

A full-stack **Note-Taking Application** built with **NestJS** for the backend and **React** for the frontend. The application allows users to register, log in, manage folders and notes, and provides JWT-based authentication with role-based access control.

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Running the Application](#running-the-application)
8. [Building for Production](#building-for-production)
9. [API Endpoints](#api-endpoints)
10. [License](#license)

---

## 1. Features

### Backend

- **User Authentication & Authorization**
  - User registration and login with JWT-based authentication.
  - Role-based access control (`admin`, `user`).
- **User Management**
  - Admins can create, read, update, and delete users.
- **Folder Management**
  - Create, read, update, and delete folders.
  - Search folders by keyword.
- **Note Management**
  - Create, read, update, and delete notes.
  - Support for two note types: `TEXT` and `LIST`.
  - Assign notes to folders.
  - Pagination and search functionality.
- **Validation and Error Handling**
  - DTO validation using `class-validator`.
  - Comprehensive error responses.
- **Timestamps & Soft Deletes**
  - Automatic management of `createdAt`, `updatedAt`, and optional `deletedAt` fields.

### Frontend

- **User Interface**
  - Clean and intuitive UI built with React and Material-UI.
- **Authentication**
  - Login and registration pages.
  - Protected routes for authenticated users.
- **Folder and Note Management**
  - Create, view, update, and delete folders and notes.
  - Assign notes to folders.
- **Form Validation**
  - Form handling with `react-hook-form` and validation with Yup.
- **State Management**
  - Data fetching and caching using `@reduxjs/toolkit/query`.
- **Routing**
  - Client-side routing with React Router.

---

## 2. Technology Stack

### Backend

- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Passport.js** with JWT strategy
- **class-validator**, **class-transformer**

### Frontend

- **React**
- **Redux Toolkit**
- **React Router**
- **Material-UI (MUI)**
- **react-hook-form** and **Yup** for form handling and validation
- **Vite** for development and building

---

## 3. Project Structure

The repository is structured as follows:

```
notes-api/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── folders/
│   │   ├── notes/
│   │   ├── users/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── folders/
│   │   │   └── notes/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 4. Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** (or **yarn**) installed.
- **PostgreSQL** database installed and running.
- **Git** installed to clone the repository.

---

## 5. Installation

### 5.1 Clone the Repository

```bash
git clone https://github.com/OmarAhmedOwais/notes-api.git
```

### 5.2 Install Backend Dependencies

```bash
cd notes-api/backend
npm install
```

### 5.3 Install Frontend Dependencies

In a new terminal window, navigate to the frontend directory:

```bash
cd notes-api/frontend
npm install
```

---

## 6. Configuration

### 6.1 Backend Configuration

Create a `.env` file in the `backend` directory by copying the example file:

```bash
cd notes-api/backend
cp .env.example .env
```

Edit the `.env` file and set your environment variables:

```
# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=notes_db

# Server Configuration
PORT=3001

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

**Note:** Replace `your_jwt_secret_key` with a secure secret key.

### 6.2 Frontend Configuration

Create a `.env` file in the `frontend` directory:

```bash
cd notes-api/frontend
touch .env
```

Add the following environment variables to the `.env` file:

```
VITE_API_BASE_URL=http://localhost:3001
```

**Note:** Adjust the `VITE_API_BASE_URL` if your backend server is running on a different host or port.

---

## 7. Running the Application

### 7.1 Running the Backend

#### 7.1.1 Start PostgreSQL

Ensure your PostgreSQL database is running and accessible with the credentials specified in your `.env` file.

#### 7.1.2 Run Database Migrations (Optional)

If you have database migrations set up, run them to initialize your database schema.

#### 7.1.3 Seed the Database

If there is a seed script available, you can run:

```bash
cd notes-api/backend
npm run seed
```

#### 7.1.4 Start the Backend Server

```bash
cd notes-api/backend
npm run start:dev
```

The backend server should now be running at `http://localhost:3001`.

#### 7.1.5 Swagger Documentation (Optional)

You can access the API documentation (if enabled) at `http://localhost:3001/documentation`.

### 7.2 Running the Frontend

In a new terminal window, start the frontend development server:

```bash
cd notes-api/frontend
npm run dev
```

The frontend application should now be running at `http://localhost:5173`.

---

## 8. Building for Production

### 8.1 Building the Backend

To build the backend for production:

```bash
cd notes-api/backend
npm run build
```

Then start the production server:

```bash
npm run start:prod
```

### 8.2 Building the Frontend

To create a production build of the frontend:

```bash
cd notes-api/frontend
npm run build
```

The build artifacts will be located in the `dist` folder.

---

## 9. API Endpoints

For detailed information about the backend API endpoints, refer to the Swagger documentation (if available) or see the summary below.

### 9.1 Auth Endpoints

- **POST** `/auth/login` - Login with username and password, returns JWT.
- **POST** `/auth/register` - Register a new user account.

### 9.2 User Endpoints

- **GET** `/users` - Get all users (Admin only).
- **GET** `/users/:id` - Get a user by ID (Admin only).
- **POST** `/users` - Create a new user (Admin only).
- **PATCH** `/users/:id` - Update a user's information (Admin only).
- **DELETE** `/users/:id` - Delete a user (Admin only).

### 9.3 Folder Endpoints

- **GET** `/folders` - Get all folders (Authenticated users).
- **GET** `/folders/search` - Search folders by keyword (Authenticated users).
- **GET** `/folders/:id` - Get a folder by ID (Authenticated users).
- **POST** `/folders` - Create a new folder (Authenticated users).
- **PATCH** `/folders/:id` - Update an existing folder (Authenticated users).
- **DELETE** `/folders/:id` - Delete a folder (Authenticated users).

### 9.4 Note Endpoints

- **GET** `/notes` - Get all notes with optional filtering and pagination (Authenticated users).
- **GET** `/notes/:id` - Get a single note by ID (Authenticated users).
- **POST** `/notes` - Create a new note (Authenticated users).
- **PATCH** `/notes/:id` - Update an existing note (Authenticated users).
- **DELETE** `/notes/:id` - Delete a note (Authenticated users).

---

## 10. License

This project is licensed under the MIT License.

---

## Additional Notes

- **Form Validation:** The frontend uses `react-hook-form` and Yup for handling and validating forms.
- **State Management:** The application uses Redux Toolkit for state management, and RTK Query for data fetching.
- **Protected Routes:** The frontend uses React Router to handle routing, with protected routes that require authentication.
- **Material-UI Components:** The UI is built using Material-UI components for a consistent look and feel.

---

## Troubleshooting

- **CORS Issues:** Ensure that the backend server has CORS enabled to allow requests from the frontend origin.
- **Database Connection Errors:** Double-check your PostgreSQL connection details in the backend `.env` file.
- **Port Conflicts:** Make sure no other services are running on the ports used by the backend (`3001`) and frontend (`5173`).

---