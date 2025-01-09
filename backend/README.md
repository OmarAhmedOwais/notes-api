
# Notes API

A **NestJS** backend providing:
- **Folder** and **Note** management
- **User** management with roles (`admin`, `user`)
- **JWT-based Authentication** (Register/Login) with role-based guards

This app uses **TypeORM** with **PostgreSQL**, **class-validator** for DTO validation, and supports **pagination**, **search**, **timestamps**, and **soft deletes**.

---

## Table of Contents

1. [Features](#features)  
2. [Technology Stack](#technology-stack)  
3. [Project Structure](#project-structure)  
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
6. [Configuration](#configuration)  
7. [Running the App](#running-the-app)  
8. [API Endpoints](#api-endpoints)  
   - [Auth Endpoints](#auth-endpoints)  
   - [User Endpoints](#user-endpoints)  
   - [Folder Endpoints](#folder-endpoints)  
   - [Note Endpoints](#note-endpoints)  
9. [License](#license)  
---

## 1. Features

1. **User Authentication & Authorization**  
   - Register new users and login with username/password.  
   - Protected endpoints with JWT.  
   - Role-based access control (e.g. only admins can manage other users).  

2. **User Module**  
   - Create, Read, Update, Delete users (restricted to **admin**).  
   - Users have roles: `admin` or `user`.  

3. **Folder Module**  
   - CRUD (Create, Read, Update, Delete) operations on folders.  
   - Search folders by keyword.  

4. **Note Module**  
   - CRUD operations on notes.  
   - **Two note types**: `TEXT` or `LIST` (handled with an `enum`).  
   - Filter notes by folder or a search keyword.  
   - Pagination (`skip`, `take`, `order`).  

5. **Validation**  
   - Automatic validation (`class-validator`) on DTOs.  

6. **Timestamps** & **Soft Deletes** (optional)  
   - Auto-managed `createdAt`, `updatedAt`, and optional `deletedAt` for notes and users.  

---

## 2. Technology Stack

- **Node.js**
- **NestJS**  
- **TypeORM**  
- **PostgreSQL**  
- **class-validator**, **class-transformer**  
- **Passport** + **JWT**  

---

## 3. Project Structure

A typical file structure might look like:

```
src/
  auth/
    auth.controller.ts
    auth.module.ts
    auth.service.ts
    dtos/
    decorators/
    guards/
    strategies/
  common/
    decorators/
    utils/
  folders/
    folders.controller.ts
    folders.module.ts
    folders.service.ts
    dtos/
    folder.entity.ts
  notes/
    notes.controller.ts
    notes.module.ts
    notes.service.ts
    dtos/
    note.entity.ts
    note-type.enum.ts
  users/
    users.controller.ts
    users.module.ts
    users.service.ts
    dtos/
    user.entity.ts
    user-role.enum.ts
  main.ts
  app.module.ts
```

---

## 4. Prerequisites

1. **Node.js** and **npm** (or **yarn**) installed.  
2. **PostgreSQL** database (local or remote).  
3. Ensure your environment variables or `.env` file is configured.

---

## 5. Installation

1. **Clone** the repository:
   ```bash
   git clone https://github.com/OmarAhmedOwais/notes-api.git
   ```
2. **Install dependencies**:
   ```bash
   cd notes-api/backend
   npm install
   ```
---

## 6. Configuration

### 6.1 Environment Variables

Create a `.env` file or set environment variables:

```
# Postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=my_nest_db

# Server
PORT=3001

# JWT
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

**`JWT_SECRET`** is critical for signing JWT tokens. Make it complex in production.

### 6.2 TypeORM Configuration

In your `app.module.ts` or a dedicated TypeORM config file, ensure you read from these variables. Example:

```ts
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, // turn off in production
    }),
    // ...other modules
  ],
})
export class AppModule {}
```

---

## 7. Running the App

**Run the Seeder**:
   ```bash
   npm run seed
   ```
**Development**:

```bash
npm run start:dev
```
Visits `http://localhost:3001` by default.
**Swagger Documentation**:
Visits `http://localhost:3001/documentation` by default.
**Production**:
```bash
npm run build
npm run start:prod
```

---

## 8. API Endpoints

Below is a summary of key endpoints. Some endpoints require authentication and specific roles.

### Auth Endpoints

| Method | Endpoint       | Description                       | Access     |
|-------:|:--------------|:-----------------------------------|:-----------|
| **POST**   | `/auth/login`    | Login with username & password, returns JWT | Public |
| **POST**   | `/auth/register` | Register a new user account               | Public |

<details>
<summary>Example request/response</summary>

**Request**:
```
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "strong_password"
}
```

**Response**:
```
200 OK
{
  "access_token": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    ...
  }
}
```
</details>

---

### User Endpoints

| Method | Endpoint     | Description                   | Access         |
|-------:|:------------|:------------------------------|:---------------|
| **GET**    | `/users`       | Get all users              | Admin only     |
| **GET**    | `/users/:id`   | Get a user by ID           | Admin only     |
| **POST**   | `/users`       | Create a new user          | Admin only     |
| **PATCH**  | `/users/:id`   | Update a user’s info       | Admin only     |
| **DELETE** | `/users/:id`   | Delete a user              | Admin only     |

<details>
<summary>Example request/response</summary>

**Request**:
```
POST /users
Authorization: Bearer <JWT_TOKEN_FOR_ADMIN>
Content-Type: application/json

{
  "username": "alice",
  "email": "alice@example.com",
  "password": "somePassword",
  "role": "user"
}
```

**Response**:
```
201 Created
{
  "id": 2,
  "username": "alice",
  "email": "alice@example.com",
  "role": "user"
}
```
</details>

---

### Folder Endpoints

| Method | Endpoint         | Description                    | Access                 |
|-------:|:----------------|:-------------------------------|:-----------------------|
| **GET**    | `/folders`         | Get all folders             | Auth required (JWT)    |
| **GET**    | `/folders/search`  | Search folders by `keyword` | Auth required (JWT)    |
| **GET**    | `/folders/:id`     | Get a folder by ID          | Auth required (JWT)    |
| **POST**   | `/folders`         | Create a new folder         | Auth required (JWT)    |
| **PATCH**  | `/folders/:id`     | Update an existing folder   | Auth required (JWT)    |
| **DELETE** | `/folders/:id`     | Delete a folder             | Auth required (JWT)    |

<details>
<summary>Example request/response</summary>

**Request**:
```
POST /folders
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "My Work Folder"
}
```

**Response**:
```
201 Created
{
  "id": 1,
  "name": "My Work Folder",
  "notes": []
}
```
</details>

---

### Note Endpoints

| Method | Endpoint       | Description                                                                                                                                  | Access              |
|-------:|:--------------|:---------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|
| **GET**    | `/notes`         | Get all notes; supports `folderId`, `keyword`,`noteType`, `skip`, `take`, `order` as query params                                                                 | Auth required (JWT) |
| **GET**    | `/notes/:id`     | Get a single note by ID                                                                                                                  | Auth required (JWT) |
| **POST**   | `/notes`         | Create a new note; requires `title`, `content`, `type` (`TEXT` or `LIST`), and `folderId`                                              | Auth required (JWT) |
| **PATCH**  | `/notes/:id`     | Update an existing note (change content, folder, etc.)                                                                                 | Auth required (JWT) |
| **DELETE** | `/notes/:id`     | Delete a note (by default a hard delete, but can be soft delete if configured)                                                          | Auth required (JWT) |

<details>
<summary>Example request/response</summary>

**Request**:
```
POST /notes
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "My Todo List",
  "content": "Buy groceries, Clean room",
  "type": "LIST",
  "folderId": 1
}
```

**Response**:

```
201 Created
{
  "id": 100,
  "title": "My Todo List",
  "content": "Buy groceries, Clean room",
  "type": "LIST"
}
```

</details>

---

## 9. License

[MIT](LICENSE) – or any license of your choice.

---
