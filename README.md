# 🏢 RentNest — Frontend

A high-performance, responsive real estate and rental property management platform tailored for searching, listing, and managing rentals in Bangladesh. Built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and modern UI primitives.

---

## 🌟 Key Features

### 🔎 Search & Filtering
- **Dynamic Filtering:** Search properties by location (Division & District), price range BDT, floor, and category.
- **Debounced Search:** Smooth and responsive property search experience.

### 👥 Role-Based Dashboards
- **Landlord Portal:** Manage property listings (Create, Update, Change Status, Delete), track incoming rental requests, and view analytics.
- **Tenant Portal:** Submit rental applications, track request status, manage profile, and process rental payments.
- **Admin Portal:** Manage user accounts (Activate/Block users) and monitor system-wide metrics.

### ⚡ Server-Driven Architecture
- **Next.js Server Actions:** Full backend API integration via modular Server Actions with cookie-based JWT authentication (`accessToken`).
- **Cache Management:** On-demand cache revalidation (`revalidateTag`) ensuring immediate UI updates following data mutations.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI & Icons:** Radix UI / Base UI, Shadcn UI, [Lucide React](https://lucide.react.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

---

## 📁 Repository Structure

```text
RENTNEST-FRONTEND/
├── app/
│   ├── (atuhRoutes)/       # Authentication route group (login, register)
│   │   ├── _actions/       # Auth-specific server actions
│   │   ├── _components/    # Auth-specific UI components
│   │   ├── login/
│   │   └── register/
│   ├── (publicRoutes)/     # Public user routes (landing page, property browsing)
│   │   ├── _actions/       # Public server actions
│   │   ├── _components/    # Public page components
│   │   ├── payment/        # Payment processing page
│   │   └── properties/     # Single & list property views
│   ├── dashboard/          # Protected role-based dashboards
│   │   ├── _actions/       # Dashboard shared server actions
│   │   ├── _components/    # Dashboard UI components (Profile, Tables, Modals)
│   │   ├── _config/        # Dashboard layout & navigation config
│   │   ├── admin/          # Admin pages (manage-users, profile, page)
│   │   ├── landlord/       # Landlord pages (properties, requests, profile, page)
│   │   └── tenant/         # Tenant pages (requests, profile, page)
│   ├── error.tsx           # Global error boundary
│   ├── globals.css         # Tailwind & custom CSS rules
│   ├── layout.tsx          # Root layout
│   └── loading.tsx        # Global loading state
├── components/             # Reusable shared UI primitives
├── hooks/                  # Custom React hooks
├── lib/                    # TypeScript types, constants & UI utilities
├── public/                 # Static assets & SVG icons
├── services/               # API service layer & refresh token handlers
├── utils/                  # Helper utilities
├── .env                    # Local environment variables
├── AGENTS.md               # Repository AI agent guidelines
└── API_INTEGRATION.md      # API endpoint mapping documentation
