# 🔧 Sole Traders

A responsive web application built for **CSC7084 (Web Development)** that connects registered traders with guest clients seeking local services. Traders can register, build a profile, list services, and manage incoming bookings; clients can browse a public directory, filter by trade and location, make bookings, and leave reviews.

The project is split into **two separate applications**: a server-rendered web app (Node.js, Express, EJS) and a standalone **REST API** that handles all database access. The web app never touches the database directly — every operation flows through the API.

---

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the App & API](#running-the-app--api)
- [REST API Endpoints](#rest-api-endpoints)
- [Security & Validation](#security--validation)
- [A Note on Secrets](#a-note-on-secrets)

---

## Architecture

The request–response flow follows a consistent pattern across the whole application:

```
Browser → Web App Route → App Controller → HTTP request (Axios)
        → REST API Route → API Controller → MySQL Query
        → JSON Response → App Controller → Rendered EJS View (or redirect)
```

This keeps a clean separation between the **web app layer** (routing, controllers, views, sessions) and the **data layer** (the API and its database queries). The web app makes HTTP requests to the API using Axios, often via `Promise.all` / `Promise.allSettled` for concurrent calls.

---

## Tech Stack

**Web App**
- Node.js + Express
- EJS templating (with shared navbar/footer partials)
- Bootstrap 5 + custom CSS
- Chart.js (trader statistics dashboard)
- express-session (session-based auth)
- bcrypt (password hashing)
- Axios (API requests)
- express-validator (server-side validation)
- morgan (request logging)
- dotenv (environment config)

**REST API**
- Node.js + Express
- mysql2 (MySQL connection)
- morgan, dotenv

**Database**
- MySQL (managed via phpMyAdmin)

---

## Features

- Trader registration with unique username/email and bcrypt-hashed passwords
- Profile setup with trade type, region, bio, and availability windows
- Service creation, editing, and deletion
- Public trader directory with trade-type and location filtering, sorted by rating
- Public trader profiles with services and a Chart.js statistics dashboard
- Client booking flow with date, availability-window, and overlap validation
- Trader booking management (view, filter by status, accept/reject)
- Client reviews with duplicate-prevention via a composite unique index
- Session-based authentication with protected routes and post-login redirect
- Standalone REST API covering full CRUD across all entities

---

## Project Structure

The repository contains two independent projects, each with its own `package.json` and `node_modules`.

```
Sole-Traders/
├── app/                        # Web application
│   ├── controllers/            # account, booking, service, trader, general
│   ├── middleware/             # auth + validation rules
│   ├── public/
│   │   ├── imgs/               # jpg / svg assets
│   │   ├── js/                 # client-side validation + chartfunctions.js
│   │   └── styles/             # custom CSS (imported into main.css)
│   ├── routes/                 # routes.js
│   ├── views/                  # account, booking, general, partials, service, trader
│   ├── sql/                    # exported database dump for the marker
│   ├── app.js                  # entry point
│   ├── config.env              # PORT, SESSION_SECRET
│   └── package.json
│
└── api/                        # Standalone REST API
    ├── controllers/            # account, booking, service, trade, general
    ├── routes/                 # apiroutes.js
    ├── utils/                  # dbconn.js (mysql2 connection)
    ├── app.js                  # Express app config (middleware, routes)
    ├── server.js               # server startup logic
    ├── config.env              # PORT + DB credentials
    └── package.json
```

> `app.js` and `server.js` are deliberately separated in the API so the Express app can be configured and exported independently of starting the server — a common Express best practice that also aids testing.

---

## Prerequisites

- **Node.js** (with npm)
- **MySQL** server (the project was developed with phpMyAdmin)
- **nodemon** for development auto-restart — install globally if you don't have it:

```bash
npm install -g nodemon
```

---

## Installation

Dependencies are installed **separately for each project**, since the app and API are independent. From the repository root:

```bash
# Install web app dependencies
cd app
npm install

# Install API dependencies
cd ../api
npm install
```

Each `npm install` reads the respective `package.json` and generates that project's `node_modules` folder.

---

## Database Setup

1. Start your MySQL server.
2. Import the exported database dump found in `app/sql/` (for example, via phpMyAdmin's **Import** tab). This creates the five core tables: `traders`, `profiles`, `service_listings`, `bookings`, and `ratings`.
3. Make sure the credentials in the API's `config.env` match your local MySQL setup (host, user, password, database, port).

---

## Environment Variables

Each project has its own `config.env` loaded with **dotenv**.

**`app/config.env`** (web app)
```
PORT=3000
SESSION_SECRET=your_session_secret
```

**`api/config.env`** (REST API)
```
PORT=3002
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=soletraders
```

> The API runs on port **3002** and all endpoints are served under the base path `http://localhost:3002/soletraders`. The web app's controllers point at this base URL.

---

## Running the App & API

Both projects need to be running at the same time — the web app depends on the API for all data. Open **two terminal windows**.

**Terminal 1 — start the REST API:**
```bash
cd api
nodemon server.js
```

**Terminal 2 — start the web app:**
```bash
cd app
nodemon app.js
```

Then open your browser to:

```
http://localhost:3000
```

> Using **nodemon** rather than plain `node` means either project automatically restarts whenever you save a change, which is handy during development. If a `start` or `dev` script is defined in either `package.json`, you can equivalently run `npm run dev` from within that project's folder. Start the API first so it's ready to receive the web app's requests.

---

## REST API Endpoints

All endpoints are prefixed with `http://localhost:3002/soletraders` and return JSON with appropriate status codes.

| Entity | Method | Endpoint | Description |
| --- | --- | --- | --- |
| Trade | GET | `/` | Get all traders |
| Trade | GET | `/trader/:id` | Get one trader by ID |
| Trade | GET | `/toptraders` | Top traders sorted by bookings |
| Trade | GET | `/trades` | Distinct trade types |
| Account | POST | `/login` | Return hashed password for a username |
| Account | POST | `/register` | Create a new trader |
| Account | POST | `/setupprofile/:id` | Create a profile |
| Account | GET | `/profile/:id` | Get profile for a trader |
| Account | GET | `/account/:id` | Get all trader + profile details |
| Account | PUT | `/updateaccount/:id` | Update trader/profile details |
| Service | GET | `/servicetitle/:id` | Distinct service titles |
| Service | GET | `/services/:id` | All services for a trader |
| Service | GET | `/editservice/:id` | Details for one service |
| Service | PUT | `/editservice/:id` | Update a service |
| Service | POST | `/addservice/:id` | Add a service |
| Service | DELETE | `/deleteservice/:id` | Delete a service |
| Booking | GET | `/bookings/:id` | All bookings for a trader |
| Booking | GET | `/booking/:id` | One booking's details |
| Booking | GET | `/bookingserv/:id` | Service details for a booking |
| Booking | POST | `/bookingserv/:id` | Add a booking |
| Booking | PUT | `/updatebooking/:id` | Update booking status |
| General | POST | `/checkavail/:id` | Check trader availability |
| General | POST | `/reviews/:id` | Add a review |

---

## Security & Validation

- **Two-tier validation** — Client-side scripts in `public/js` give immediate feedback against regex and required-field rules; server-side `express-validator` chains enforce stricter length, format, and sanitisation rules before the controller runs.
- **Parameterised queries** — All SQL uses `?` placeholders via mysql2, preventing SQL injection by ensuring user input is never interpolated into query strings.
- **Password hashing** — bcrypt with 12 salt rounds; the plaintext password is never sent to or stored by the API, and comparison happens on the web app side.
- **Route protection** — `isAuth` middleware guards trader-only routes and stores the original route for post-login redirect; an ownership check prevents a trader from viewing another trader's bookings via URL manipulation.
- **Session hygiene** — `resave: false` and `saveUninitialized: false` avoid unnecessary session writes and sessions for unauthenticated users.

---

## A Note on Secrets

This is a **university coursework project**, and the `config.env` files (containing the session secret and local database credentials) are intentionally included in the repository.

This is done deliberately so that the marker can clone the project, import the included database dump, and run both the app and API immediately without any additional configuration. The credentials only ever point at a **local development MySQL instance** with dummy data, so there is no real-world security exposure.

**In a production setting this would never be done.** Secrets would be excluded from version control via `.gitignore`, injected through the deployment environment, and rotated regularly — and the database would hold real user data that must be protected. The decision to commit them here is purely to make the submission self-contained and easy to assess, and I'm fully aware it is not appropriate practice outside this academic context.

A planned improvement noted in the project report is to add **API key authentication** between the web app and the REST API, since the API endpoints are currently reachable by anyone who knows the base URL.

---

*Built for CSC7084 Web Development, MSc Software Development.*
