# 🏠 RentNest — Frontend

**RentNest** is a modern, high-performance real estate and rental property management platform designed for the Bangladesh market. It provides a responsive and user-friendly experience for tenants, landlords, and administrators to discover, list, manage, and monitor rental properties.

The frontend is built with **Next.js App Router, TypeScript, Tailwind CSS, and modern UI primitives**, following a server-driven architecture for authentication, data fetching, mutations, and cache management.

> **Note:** The RentNest backend is maintained in a separate repository and is consumed by this frontend through a dedicated API service layer.

---

## ✨ Key Features

### 🔎 Property Search & Filtering

* Search properties by **Division and District**
* Filter properties by **category**
* Filter by **minimum and maximum price (BDT)**
* Filter by **floor**
* Debounced property search
* URL-based search parameters
* Responsive property browsing experience
* Dynamic filtering with server-side data fetching

---

## 👥 Role-Based Dashboards

RentNest provides dedicated dashboards and workflows based on the authenticated user's role.

### 🏠 Landlord Portal

Landlords can:

* Create property listings
* Update property information
* Change property status
* Delete property listings
* View incoming rental requests
* Manage rental applications
* View property-related information and analytics
* Manage their profile

### 🧑 Tenant Portal

Tenants can:

* Browse available rental properties
* Search and filter properties
* Submit rental requests
* Track rental request status
* Manage their profile
* Process rental payments
* View payment-related information

### 🛡️ Admin Portal

Administrators can:

* Monitor platform-wide statistics
* Manage registered users
* Activate user accounts
* Block user accounts
* Monitor system-level information
* Manage their profile

---

## ⚡ Architecture

RentNest follows a **server-driven frontend architecture** using Next.js Server Actions and a dedicated API service layer.

### Application Flow

```text
User Interaction
       │
       ▼
React / Client Component
       │
       ▼
Next.js Server Action
       │
       ▼
Service Layer
       │
       ▼
Backend REST API
       │
       ▼
Database
       │
       ▼
API Response
       │
       ▼
Cache Revalidation
       │
       ▼
Updated UI
```

The frontend and backend are maintained as **separate repositories**, allowing both applications to be developed, deployed, and maintained independently.

---

## 🔐 Authentication

The application uses cookie-based JWT authentication.

Key authentication features include:

* JWT-based authentication
* `accessToken` stored in cookies
* Server-side authenticated API requests
* Protected dashboard routes
* Role-based access control
* Authentication-aware service functions
* Token handling through the API service layer

The frontend does not directly handle the backend database or business logic. Instead, it communicates with the backend through REST API endpoints.

---

## 🔄 Server Actions

Next.js Server Actions are used to organize server-side operations and mutations.

Examples include:

* Authentication operations
* Property management
* Rental request management
* User management
* Profile operations
* Payment-related operations

This keeps the UI components focused on presentation while moving server-side operations into dedicated action modules.

---

## 🚀 Cache Management

RentNest uses Next.js caching and revalidation capabilities to keep the UI synchronized with backend data.

### Key techniques

* Server-side data fetching
* On-demand cache invalidation
* `revalidateTag()`
* Tag-based cache management
* Reduced unnecessary API requests
* Immediate UI updates after mutations

For example, after a successful mutation, the relevant cache tag can be revalidated so that the updated information is reflected without requiring unnecessary full-page refreshes.

---

## 🛠️ Tech Stack

### Core Technologies

* **Next.js 15+** — App Router
* **React** — UI development
* **TypeScript** — Type-safe development

### Styling & UI

* **Tailwind CSS** — Utility-first CSS framework
* **shadcn/ui** — Reusable UI components
* **Radix UI** — Accessible UI primitives
* **Base UI** — Modern UI primitives
* **Lucide React** — Icon library

### API & Data Communication

* **Next.js Server Actions**
* **Fetch / Axios**
* **REST API**
* **JWT Authentication**
* **Cookie-based authentication**

### Notifications

* **Sonner** — Toast notifications

---

## 📁 Project Structure

```text
RENTNEST-FRONTEND/
│
├── app/
│   │
│   ├── (authRoutes)/
│   │   ├── _actions/
│   │   ├── _components/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (publicRoutes)/
│   │   ├── _actions/
│   │   ├── _components/
│   │   ├── payment/
│   │   └── properties/
│   │
│   ├── dashboard/
│   │   │
│   │   ├── _actions/
│   │   ├── _components/
│   │   ├── _config/
│   │   │
│   │   ├── admin/
│   │   │   ├── manage-users/
│   │   │   ├── profile/
│   │   │   └── page.tsx
│   │   │
│   │   ├── landlord/
│   │   │   ├── properties/
│   │   │   ├── requests/
│   │   │   ├── profile/
│   │   │   └── page.tsx
│   │   │
│   │   └── tenant/
│   │       ├── requests/
│   │       ├── profile/
│   │       └── page.tsx
│   │
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── loading.tsx
│
├── components/
│   └── # Shared and reusable UI components
│
├── hooks/
│   └── # Custom React hooks
│
├── lib/
│   └── # Types, constants and UI utilities
│
├── public/
│   └── # Static assets and SVG icons
│
├── services/
│   └── # API service layer and token handlers
│
├── utils/
│   └── # Helper utilities
│
├── .env
├── AGENTS.md
├── API_INTEGRATION.md
├── package.json
└── README.md
```

---

## 🔗 Backend Integration

RentNest uses a **separated frontend and backend architecture**.

```text
┌─────────────────────────────────┐
│         RentNest Frontend       │
│                                 │
│ Next.js                         │
│ TypeScript                      │
│ React                           │
│ Tailwind CSS                    │
└───────────────┬─────────────────┘
                │
                │ REST API
                │ HTTP Requests
                ▼
┌─────────────────────────────────┐
│          RentNest Backend       │
│                                 │
│ Authentication                  │
│ Business Logic                  │
│ API Endpoints                   │
│ Validation                      │
│ Database Operations             │
│ Payment Processing              │
└───────────────┬─────────────────┘
                │
                ▼
         ┌───────────────┐
         │   Database    │
         └───────────────┘
```

The backend is **not included in this repository**.

The frontend communicates with the backend through the API service layer located in:

```text
services/
```

API endpoint mappings and integration details are documented in:

```text
API_INTEGRATION.md
```

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

For local development, it may look like:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Important:** Never commit sensitive environment variables, tokens, API keys, or secrets to the repository.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm / pnpm / yarn
* Git
* A running instance of the RentNest backend API

---

### 1. Clone the Repository

```bash
git clone [<frontend-repository-url>](https://github.com/tomalhossencse/RentNest-Frontend)
```

Navigate into the project:

```bash
cd RentNest-Frontend
```

---

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Make sure the backend API is running and accessible from the frontend.

---

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Create an optimized production build.

```bash
npm run start
```

Start the production server.

```bash
npm run lint
```

Run ESLint to check the codebase.

---

## 🔄 Data Flow

A typical property-related operation follows this flow:

```text
User
 │
 ▼
Property UI
 │
 ▼
Server Action
 │
 ▼
Service Function
 │
 ▼
Backend API
 │
 ▼
Backend Business Logic
 │
 ▼
Database
 │
 ▼
Response
 │
 ▼
Server Action
 │
 ▼
revalidateTag()
 │
 ▼
Updated UI
```

This approach provides a clear separation between:

* UI
* Server Actions
* API communication
* Backend business logic
* Database operations

---

## 📋 API Integration

All frontend-to-backend API mappings are documented in:

```text
API_INTEGRATION.md
```

The document helps developers understand which backend endpoints are used by different frontend features.

The frontend does not contain the backend implementation or database layer.

---

## 📊 Main Application Modules

| Module              | Description                                         |
| ------------------- | --------------------------------------------------- |
| Authentication      | Login, registration and authentication management   |
| Property Management | Create, update, search and manage rental properties |
| Property Search     | Location, category, price and floor-based filtering |
| Rental Requests     | Submit and manage rental applications               |
| Landlord Dashboard  | Property and request management                     |
| Tenant Dashboard    | Rental requests, profile and payments               |
| Admin Dashboard     | User and system management                          |
| Profile Management  | User profile information and updates                |
| Payments            | Rental payment processing                           |
| Notifications       | User feedback and action notifications              |

---

## 🎯 Project Goals

RentNest was designed with the following goals:

* Make rental property discovery easier
* Provide an intuitive property search experience
* Give landlords efficient property management tools
* Allow tenants to submit and track rental requests
* Provide role-specific dashboards
* Give administrators centralized platform management
* Maintain a scalable and maintainable frontend architecture
* Separate frontend and backend responsibilities
* Provide a responsive experience across devices

---

## 🧩 Design Principles

The frontend follows several development principles:

* Component-based architecture
* Reusable UI components
* Type-safe development with TypeScript
* Separation of concerns
* Server-side data handling where appropriate
* Modular Server Actions
* Dedicated API service layer
* Role-based access control
* Responsive design
* Reusable hooks and utilities
* Targeted cache invalidation

---

## 📌 Project Status

**Status:** Active Development

RentNest is being developed as a full-stack real estate and rental management platform with independently maintained frontend and backend applications.

---

## 👨‍💻 Author

**Tomal Hossen**
Full Stack Developer
Bangladesh

---

## 📄 License

This project is developed for educational, portfolio, and application-development purposes.
