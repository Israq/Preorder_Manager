# Preorder Manager

A full-stack preorder management application built with Next.js 16, Prisma, and SQLite.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** SQLite with Prisma ORM
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Date Formatting:** date-fns

## Features

- View all preorders with server-side filtering, sorting, and pagination
- Create new preorders with validation
- Edit existing preorders (pre-filled form)
- Toggle preorder status (Active/Inactive)
- Delete preorders with toast feedback
- Select all / individual row selection with checkboxes
- Responsive design

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

git clone <your-repo-url>
cd preorder-manager
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev

Open http://localhost:3000 to view the app.

## Project Structure

preorder-manager/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/preorders/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── status/route.ts
│   │   ├── preorders/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── preorder-form.tsx
│   │   ├── sort-dropdown.tsx
│   │   └── ui/
│   └── lib/
│       ├── prisma.ts
│       └── utils.ts
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md

## Database Schema

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

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/preorders | List with filter, sort, pagination |
| POST | /api/preorders | Create preorder |
| PUT | /api/preorders/[id] | Update preorder |
| PATCH | /api/preorders/[id]/status | Toggle status |
| DELETE | /api/preorders/[id] | Delete preorder |

## Seed Data

| Name | Products | Preorder When | Starts At | Status |
|------|----------|---------------|-----------|--------|
| Multi variant 3 | 1 | out-of-stock | Dec 15, 2025 | Inactive |
| Multi variant 2 | 1 | regardless-of-stock | Dec 15, 2025 | Active |
| Multi variants 1 | 1 | regardless-of-stock | Dec 15, 2025 | Active |
| Partial payment | 1 | regardless-of-stock | Aug 17, 2025 | Active |
| Shipping not sure | 1 | regardless-of-stock | Aug 17, 2025 | Active |
| Full payment | 1 | regardless-of-stock | Aug 17, 2025 | Active |
| Coming soon | 1 | regardless-of-stock | Dec 11, 2025 | Active |
| With ends | 1 | regardless-of-stock | Aug 14, 2025 | Active |
