# Live Chat App

A full-stack real-time chat application built with the MERN ecosystem and Socket.IO.
The project includes user authentication, profile management, one-to-one messaging, real-time online status, and image support in chat messages.

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [Available Scripts](#available-scripts)
9. [API Reference](#api-reference)
10. [Socket Events](#socket-events)
11. [Build and Deployment](#build-and-deployment)
12. [Troubleshooting](#troubleshooting)

## Overview

This project is organized as a monorepo with two applications:

- `backend/`: Express API + Socket.IO server + MongoDB access
- `frontend/`: React + Vite client application

Authentication is cookie-based using JWT. Real-time updates are provided by Socket.IO for online user presence and incoming messages.

## Key Features

- User signup, login, auth session check, and logout
- Protected routes on both backend and frontend
- Profile picture upload (Cloudinary)
- One-to-one chat messaging
- Optional image attachments in messages
- Real-time message delivery with Socket.IO
- Real-time online users list
- New user broadcast for sidebar updates
- Theme persistence using local storage

## Tech Stack

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- Socket.IO
- JSON Web Token (`jsonwebtoken`)
- `bcryptjs` for password hashing
- `cookie-parser`
- Cloudinary SDK

### Frontend

- React 19
- Vite
- Zustand (state management)
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS + DaisyUI
- React Hot Toast

## Architecture

### High-level Flow

1. User authenticates through `/api/auth/*` routes.
2. Backend signs a JWT and stores it in an HTTP-only cookie (`jwt_token`).
3. Frontend validates session with `/api/auth/check-auth`.
4. After auth, frontend opens a Socket.IO connection with `userID` in query params.
5. Backend maps `userID -> socket.id` to track online users.
6. Sending a message persists data in MongoDB and emits `newMessage` to the receiver (if online).

### Data Models

`User`

- `email` (unique, required)
- `fullName` (required)
- `password` (hashed)
- `profilePic` (string URL)
- `createdAt`, `updatedAt`

`Mesg`

- `senderId` (ObjectId -> User)
- `reciverId` (ObjectId -> User)
- `text` (optional)
- `image` (optional URL)
- `createdAt`, `updatedAt`

## Project Structure

```text
live_chat_app/
|- backend/
|  |- src/
|  |  |- controllers/      # auth + messaging business logic
|  |  |- lib/              # DB, socket, cloudinary, token utils
|  |  |- middleware/       # auth guard
|  |  |- models/           # mongoose schemas
|  |  |- routers/          # API route definitions
|  |  \- server.js         # app bootstrap
|  \- package.json
|- frontend/
|  |- src/
|  |  |- components/       # reusable UI parts
|  |  |- pages/            # route pages
|  |  |- store/            # zustand stores
|  |  |- lib/              # axios config + utilities
|  |  \- App.jsx           # route setup + auth gate
|  \- package.json
\- package.json            # root scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended Node.js 20 LTS)
- npm 9+
- MongoDB database (local or Atlas)
- Cloudinary account (for profile/message images)

### 1) Clone and install dependencies

```bash
git clone https://github.com/AmalKrishnaKP/live_chat_app.git
cd live_chat_app

# install root dependencies (optional but recommended)
npm install

# install backend and frontend dependencies
npm install --prefix backend
npm install --prefix frontend
```

### 2) Configure environment variables

Create a `.env` file inside `backend/` with the values listed in the Environment Variables section below.

### 3) Run the applications

Use two terminals:

Terminal 1 (backend)

```bash
npm run dev --prefix backend
```

Terminal 2 (frontend)

```bash
npm run dev --prefix frontend
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## Environment Variables

Create `backend/.env` and define:

```env
PORT=5001
MONGODB_URI=<your_mongodb_connection_string>
JWT_KEY=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
NODE_ENV=development
```

Notes:

- `JWT_KEY` should be a long random secret.
- In production, set `NODE_ENV=production` to enable secure cookie behavior and static frontend serving from backend.

## Available Scripts

### Root (`package.json`)

- `npm run build`: installs backend/frontend dependencies and builds frontend
- `npm run start`: starts backend server

### Backend (`backend/package.json`)

- `npm run dev`: starts backend with nodemon
- `npm run start`: starts backend with node

### Frontend (`frontend/package.json`)

- `npm run dev`: starts Vite dev server
- `npm run build`: builds frontend assets
- `npm run preview`: previews production build
- `npm run lint`: runs ESLint

## API Reference

Base URL (local): `http://localhost:5001`

### Auth routes

- `POST /api/auth/signup`
  - Body: `{ fullName, email, password }`
  - Response: created user payload + auth cookie
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Response: user payload + auth cookie
- `POST /api/auth/logout`
  - Response: clears auth cookie
- `GET /api/auth/check-auth` (protected)
  - Response: authenticated user
- `PUT /api/auth/update-profile` (protected)
  - Body: `{ profilePic }` (base64/image data)
  - Response: updated user

### Message routes

- `GET /api/mesg/users` (protected)
  - Response: users list for sidebar (excluding current user)
- `GET /api/mesg/personal/:id` (protected)
  - Response: conversation history between current user and `:id`
- `POST /api/mesg/send/:reciverId` (protected)
  - Body: `{ text, image }`
  - Response: created message

## Socket Events

Server emits:

- `getOnlineUsers`: array of currently online user IDs
- `newMessage`: newly created message sent to the receiver socket
- `newSignUps`: payload for newly created users

Client behavior:

- Connects after successful auth with query `{ userID }`
- Subscribes to `newMessage` for active conversation updates
- Updates online user state from `getOnlineUsers`

## Build and Deployment

### Production build

```bash
npm run build
```

This will:

1. Install backend dependencies
2. Install frontend dependencies
3. Build frontend assets into `frontend/dist`

### Start production server

```bash
npm run start
```

When `NODE_ENV=production`, backend serves the frontend static build.

## Troubleshooting

- Cookies/auth not working in browser:
  - Make sure frontend URL matches backend CORS origin (`http://localhost:5173` in development).
  - Ensure Axios uses `withCredentials: true` (already configured).
- Database connection fails:
  - Verify `MONGODB_URI` and network access/IP whitelist if using Atlas.
- Image upload issues:
  - Check Cloudinary credentials in `backend/.env`.
- Socket connection not established:
  - Confirm backend is running on `http://localhost:5001`.
  - Ensure user is authenticated before socket connect is triggered.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with clear messages
4. Open a pull request with context and screenshots (if UI changes)

## License

This project is currently marked as `ISC` in package files.