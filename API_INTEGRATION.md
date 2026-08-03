# API Integration & Endpoint Mapping

This document provides a comprehensive mapping of all backend API endpoints consumed by Server Actions within the Next.js application.

---

## 🌐 Base API Configuration
- **Base Environment Variable:** `process.env.BACKEND_API_URL`
- **Authentication Method:** Cookie-based (`accessToken`) passed in headers.

---

## 📌 Endpoint Summary Table

| Category | Server Action / Function | HTTP Method | Endpoint | Description & Cache Strategy |
| :--- | :--- | :---: | :--- | :--- |
| **Properties** | `getProperties` | `GET` | `/api/properties` | Fetch filtered list of public properties (cached for 1h, tag: `properties`). |
| **Properties** | `getPropertyById` | `GET` | `/api/properties/:id` | Fetch detailed single property info (`no-store`). |
| **Properties** | `getLandlordProperties` | `GET` | `/api/properties/landlord/all` | Fetch properties created by logged-in landlord (cached for 1h, tag: `landlord-properties`). |
| **Properties** | `addProperty` | `POST` | `/api/properties` | Create a new property listing (revalidates `properties` & `landlord-properties`). |
| **Properties** | `updateProperty` | `PUT` | `/api/properties/:id` | Update an existing property listing (revalidates `properties` & `landlord-properties`). |
| **Properties** | `updatePropertyStatus` | `PATCH` | `/api/properties/status/:id` | Update rental availability or status of a property. |
| **Properties** | `deleteProperty` | `DELETE` | `/api/properties/:id` | Delete a property listing (revalidates `properties` & `landlord-properties`). |
| **Requests** | `getTenantRequests` | `GET` | `/api/requests/tenant` | Fetch all rental requests created by the tenant (cached for 1h, tag: `tenant-requests`). |
| **Requests** | `getLandlordRequests` | `GET` | `/api/requests/landlord` | Fetch rental requests received by the landlord (cached for 1h, tag: `landlord-requests`). |
| **Requests** | `addRequests` | `POST` | `/api/requests` | Submit a new rental booking request (revalidates `tenant-requests`). |
| **Requests** | `updateRequestStatus` | `PATCH` | `/api/requests/landlord/:id` | Landlord approves/rejects rental request (revalidates `landlord-requests` & `tenant-requests`). |
| **Payments** | `createPayment` | `POST` | `/api/payments/create` | Initiate a payment for an approved rental request (revalidates `tenant-requests`). |
| **Analytics** | `getLandlordStats` | `GET` | `/api/properties/landlord/stats` | Fetch performance & booking statistics for landlords (cached for 1h, tag: `landlord-stats`). |
| **Analytics** | `getTenantStats` | `GET` | `/api/properties/tenant/stats` | Fetch rental history & stats for tenants (cached for 1h, tag: `tenant-stats`). |
| **Analytics** | `getAdminStats` | `GET` | `/api/properties/admin/stats` | Fetch global platform analytics for admins (cached for 1h, tag: `admin-stats`). |
| **User Mgmt** | `getAllUsers` | `GET` | `/api/auth/users` | Admin endpoint to fetch all registered users (cached for 1h, tag: `all-users`). |
| **User Mgmt** | `toggleUserStatus` | `PATCH` | `/api/auth/users/:id` | Admin endpoint to activate/block a user (revalidates `all-users`). |

---

## 🔍 Detailed Module Breakdown

### 1. Properties Module
- **Endpoints:** `/api/properties`, `/api/properties/:id`, `/api/properties/landlord/all`, `/api/properties/status/:id`
- **Supported Query Parameters:**
  - `searchTerm` (search location/title)
  - `page` (pagination)
  - `category`, `division`, `district` (location & property type filters)
  - `minRent`, `maxRent` (price range slider)
  - `floor` (floor level filter)
  - `sortBy`, `sortOrder` (sorting criteria)

### 2. Rental Requests Module
- **Endpoints:** `/api/requests`, `/api/requests/tenant`, `/api/requests/landlord`, `/api/requests/landlord/:id`
- **Functionality:** Handles the complete lifecycle of a rental application from creation by tenant to approval/rejection by landlord.

### 3. Payments Module
- **Endpoints:** `/api/payments/create`
- **Functionality:** Creates a payment transaction session associated with a confirmed `requestId`.

### 4. Admin & User Management
- **Endpoints:** `/api/auth/users`, `/api/auth/users/:id`, `/api/properties/admin/stats`
- **Functionality:** Allows administrator accounts to monitor overall system metrics, inspect all registered users, and adjust user account status.

---

## ⚡ Cache Invalidation & Revalidation Strategy

This app uses **On-Demand Revalidation (`revalidateTag`)** along with Next.js Cache Tags:

```typescript
// Revalidation tags configured across actions
- "properties"           // Public property catalog
- "landlord-properties"  // Landlord dashboard property listings
- "tenant-requests"      // Tenant application tracking
- "landlord-requests"    // Landlord pending requests
- "all-users"           // Admin user management table



