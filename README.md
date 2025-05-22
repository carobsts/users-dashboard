# Users Dashboard

**A dockerized mock API and user administration dashboard**

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Repository Structure](#repository-structure)
5. [Getting Started](#getting-started)
   - [Clone Repository](#clone-repository)
   - [Docker Compose](#docker-compose)
6. [Environment Variables](#environment-variables)
7. [Available Endpoints](#available-endpoints)
8. [Development Workflow](#development-workflow)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview
This repository contains two services configured with Docker Compose:

- **Server**: A mock REST API built with [json-server](https://github.com/typicode/json-server) and [Express.js](https://expressjs.com/).
- **Client**: A Next.js-based user administration dashboard consuming the mock API.

Together, they demonstrate a full-stack setup for rapid prototyping and evaluation of your software design process.

---

## Tech Stack

### Server
- **Node.js** (v18)
- **Express.js** (v4)
- **json-server** (v0.17)

> _See `server/package.json` for exact versions._

### Client
- **Next.js** (v15)
- **React** (v19)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI** components
- **React Query** for data fetching
- **ECharts** for charts
- **Axios** for HTTP requests

> _See `client/package.json` for exact dependencies._

---

## Prerequisites

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
- Ensure ports **3000** and **8000** are available, or adjust them in `docker-compose.yml`.

---

## Repository Structure

```
/users-dashboard
├── docker-compose.yml      # Compose file for both services
├── server/                 # Mock API service
│   ├── db.json            # Mock data
│   ├── server.js          # Custom Express server configuration
│   ├── package.json       # Server dependencies & scripts
│   └── Dockerfile         # Dockerfile for server
└── client/                 # Next.js dashboard
    ├── app/                # Next.js pages
    ├── public/            # Static assets
    ├── styles/            # Tailwind CSS config
    ├── package.json       # Client dependencies & scripts
    ├── Dockerfile         # Dockerfile for client
    └── .env               # Environment variables template
```

---

## Getting Started

### Clone Repository
```bash
git clone https://github.com/carobsts/users-dashboard.git
cd users-dashboard
```

### Docker Compose
Build and start both services:
```bash
docker-compose up --build
```

- **Frontend** available at:  `http://localhost:3000`
- **Mock API** available at: `http://localhost:8000`

To stop and remove containers:
```bash
docker-compose down
```

---

## Environment Variables

The client uses a `.env` file in `client/`:
```env
# API base URL inside Docker network
REACT_APP_API_URL=http://0.0.0.0:8000
```

You can adjust this to:
- `http://localhost:8000` when running client locally outside Docker.

---

## Available Endpoints

Mock API endpoints served by json-server:

| Endpoint      | Description                   |
|---------------|-------------------------------|
| `/users`      | List of users                 |
| `/statics`    | Dashboard statistics          |
| `/userTypes`  | Types or roles of users       |

---

## Development Workflow

1. **Code Changes**: Modify code in `server/` or `client/` locally.
2. **Live Reload**:
   - Server: `docker-compose up --build` picks up changes in `server` (volume-mounted).
   - Client: Next.js hot reload inside Docker via `CHOKIDAR_USEPOLLING=true`.
3. **Linting**: `docker-compose exec client npm run lint`.

---

## Troubleshooting

- **Ports in Use**: If ports 3000 or 8000 are busy, update `docker-compose.yml`:
  ```yaml
  ports:
    - "<HOST_PORT>:3000"
    - "<HOST_PORT>:8000"
  ```
- **Network Errors**: Ensure client points to `http://0.0.0.0:8000` inside Docker.
- **CORS Issues**: json-server allows all origins by default; if you customized CORS, verify headers.

---

Happy coding! 🚀