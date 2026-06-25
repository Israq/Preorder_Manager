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
│ ├── schema.prisma
│ ├── seed.ts
│ └── migrations/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── preorders/
│ │ │ ├── route.ts
│ │ │ └── [id]/
│ │ │ ├── route.ts
│ │ │ └── status/
│ │ │ └── route.ts
│ │ ├── preorders/
│ │ │ ├── page.tsx
│ │ │ ├── new/
│ │ │ │ └── page.tsx
│ │ │ └── [id]/
│ │ │ └── edit/
│ │ │ └── page.tsx
│ │ ├── page.tsx
│ │ ├── layout.tsx
│ │ └── globals.css
│ ├── components/
│ │ ├── preorder-form.tsx
│ │ ├── sort-dropdown.tsx
│ │ └── ui/
│ └── lib/
│ ├── prisma.ts
│ └── utils.ts
├── prisma.config.ts
├── components.json
├── package.json
├── tsconfig.json
└── README.md

## Database Schema

```prisma
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
```
