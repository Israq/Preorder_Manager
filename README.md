# Preorder Manager

A full-stack preorder management application built with Next.js 16, Prisma, and SQLite.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** SQLite with Prisma ORM
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Date Formatting:** date-fns

---

## Features

- View all preorders with server-side filtering, sorting, and pagination
- Create new preorders with validation
- Edit existing preorders (pre-filled form)
- Toggle preorder status (Active/Inactive)
- Delete preorders with toast feedback
- Select all / individual row selection with checkboxes
- Responsive design

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

```bash
git clone <your-repo-url>
cd preorder-manager
npm install

Database Setup
bash
npx prisma migrate dev --name init
npx prisma db seed
Run Development Server
bash
npm run dev
Open http://localhost:3000 to view the app.

Project Structure
text
preorder-manager/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── preorders/
│   │   │       ├── route.ts          # GET (list), POST (create)
│   │   │       └── [id]/
│   │   │           ├── route.ts      # PUT (update), DELETE
│   │   │           └── status/
│   │   │               └── route.ts  # PATCH (toggle status)
│   │   ├── preorders/
│   │   │   ├── page.tsx              # List page
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Create page
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx      # Edit page
│   │   ├── page.tsx                  # Redirect to /preorders
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── preorder-form.tsx         # Shared form component
│   │   ├── sort-dropdown.tsx         # Sort dropdown
│   │   └── ui/                       # shadcn/ui components
│   └── lib/
│       ├── prisma.ts                 # Prisma client singleton
│       └── utils.ts                  # Utility functions
├── package.json
├── tsconfig.json
└── README.md
Database Schema
prisma
model Preorder {
  id           String    @id @default(cuid())
  name         String
  products     Int       @default(1)
  preorderWhen String    @default("regardless-of-stock")
  startsAt     DateTime
  endsAt       DateTime?
  status       Boolean   @default(true)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
API Endpoints
Method	Endpoint	Description
GET	/api/preorders	List preorders (filter, sort, paginate)
POST	/api/preorders	Create new preorder
PUT	/api/preorders/[id]	Update preorder
DELETE	/api/preorders/[id]	Delete preorder
PATCH	/api/preorders/[id]/status	Toggle active/inactive
Query Parameters for GET
Parameter	Options
filter	all, active, inactive
sortBy	name, createdAt, startsAt, endsAt
sortOrder	asc, desc
page	page number
limit	items per page
Seed Data
The seed script creates 8 sample preorders including:

Multi variant 3 (out-of-stock)

Multi variant 2 (regardless-of-stock)

Partial payment

Full payment

Coming soon

With ends

Run npx prisma db seed to populate the database.

Author
Syed Ragib Israq


```
