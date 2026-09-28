# Task Management Application

A full-stack Task Management Application built with React and Node.js.

## Architecture

```text
task-management-app/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page-level components
│       └── services/       # Frontend API clients
│
├── server/                 # Node.js/Express backend
│   └── src/
│       ├── controllers/    # HTTP request/response handling
│       ├── db/             # SQLite connection and schema
│       ├── middleware/     # Validation/error middleware
│       ├── routes/         # API route definitions
│       └── services/       # Application/business logic
│
└── package.json            # Root development scripts
```

## Prerequisites

- Node.js 20+ recommended
- npm

## Setup

Install dependencies from the repository root:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Then start both applications:

```bash
npm run dev
```

The development servers are expected to run at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Current Status

This repository contains the initial project foundation only.

Implemented:

- React/Vite frontend scaffold
- Express backend scaffold
- SQLite database configuration
- Initial database schema
- Environment configuration examples
- Separation of routes, controllers, services, middleware, and database code
- Frontend API service boundary
- Testing configuration for future tests

Not implemented yet:

- Task CRUD operations
- Complete task management UI
- Authentication
- Actual automated tests

## Development Direction

Future work should implement task operations through the following flow:

```text
React component
    ↓
Frontend task service
    ↓
Express route
    ↓
Controller
    ↓
Task service
    ↓
SQLite
```
