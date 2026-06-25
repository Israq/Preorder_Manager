# Preorder Manager

A full-stack preorder management application built with Next.js 16, Prisma, and SQLite. Features server-side filtering, sorting, pagination, status toggles, and a clean minimal UI.

---

## Features

- **Server-Side Filtering** — Filter preorders by All, Active, or Inactive status
- **Server-Side Sorting** — Sort by Name, Created At, Starts At, or Ends At (ascending/descending)
- **Server-Side Pagination** — Paginated results with page navigation
- **Status Toggle** — Switch preorders between Active/Inactive with instant database update
- **Delete with Feedback** — Remove preorders with toast confirmation
- **Create & Edit** — Shared form with validation, pre-filled values for editing
- **Selection Checkboxes** — Individual row selection + Select All
- **Loading States** — Loader shown while saving changes
- **Responsive Design** — Works on desktop and mobile
- **Seed Data** — 8 sample preorders included for testing

---

## Tech Stack

| Layer             | Technologies             |
| ----------------- | ------------------------ |
| **Framework**     | Next.js 16 (App Router)  |
| **Database**      | SQLite + Prisma ORM      |
| **Language**      | TypeScript               |
| **Styling**       | Tailwind CSS + shadcn/ui |
| **Icons**         | Lucide React             |
| **Notifications** | Sonner                   |
| **Date Handling** | date-fns                 |

---

## Quick Start

### Prerequisites

- Node.js 22+
- npm

### Setup

```bash
git clone <your-repo-url>
cd preorder-manager
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Open [http://localhost:3000/preorders](http://localhost:3000/preorders)

---

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

---

## API Endpoints

| Method | Endpoint                     | Description                             |
| ------ | ---------------------------- | --------------------------------------- |
| GET    | `/api/preorders`             | List preorders (filter, sort, paginate) |
| POST   | `/api/preorders`             | Create new preorder                     |
| PUT    | `/api/preorders/[id]`        | Update preorder                         |
| DELETE | `/api/preorders/[id]`        | Delete preorder                         |
| PATCH  | `/api/preorders/[id]/status` | Toggle active/inactive                  |

### Query Parameters

| Parameter   | Options                                   |
| ----------- | ----------------------------------------- |
| `filter`    | `all`, `active`, `inactive`               |
| `sortBy`    | `name`, `createdAt`, `startsAt`, `endsAt` |
| `sortOrder` | `asc`, `desc`                             |
| `page`      | page number                               |
| `limit`     | items per page                            |

---

## How It Works

1. **List Page** — View all preorders in a table. Filter by status tabs, sort by clicking the sort icon, navigate pages.
2. **Create Preorder** — Click "Create Preorder" button, fill the form, save. Redirects back to list.
3. **Edit Preorder** — Click the pencil icon on any row. Form pre-fills with existing data. Save updates the record.
4. **Status Toggle** — Click the switch to instantly activate/deactivate a preorder. Toast confirms the change.
5. **Delete** — Click the trash icon. Record is removed with toast feedback.
6. **Selection** — Check individual rows or use Select All checkbox.

---

## Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Sample data
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/preorders/
│   │   │   ├── route.ts       # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       ├── route.ts   # PUT (update), DELETE
│   │   │       └── status/
│   │   │           └── route.ts  # PATCH (toggle)
│   │   ├── preorders/
│   │   │   ├── page.tsx       # List page
│   │   │   ├── new/
│   │   │   │   └── page.tsx   # Create page
│   │   │   └── [id]/edit/
│   │   │       └── page.tsx   # Edit page
│   │   ├── page.tsx           # Redirect
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── preorder-form.tsx  # Shared form
│   │   ├── sort-dropdown.tsx  # Sort menu
│   │   └── ui/                # shadcn/ui
│   └── lib/
│       ├── prisma.ts          # DB client
│       └── utils.ts           # Helpers
├── package.json
└── README.md
```

---

## Seed Data

8 sample preorders created on seed:

- Multi variant 3 (out-of-stock, inactive)
- Multi variant 2 (regardless-of-stock, active)
- Multi variants 1 (regardless-of-stock, active)
- Partial payment (regardless-of-stock, active)
- Shipping not sure (regardless-of-stock, active)
- Full payment (regardless-of-stock, active)
- Coming soon (regardless-of-stock, active)
- With ends (regardless-of-stock, active)

---

## Troubleshooting

| Issue               | Solution                                                   |
| ------------------- | ---------------------------------------------------------- |
| Migration fails     | Delete `prisma/dev.db` and re-run `npx prisma migrate dev` |
| Seed fails          | Ensure migration ran first                                 |
| Page not found      | Visit `/preorders`, not `/`                                |
| Form not submitting | Check all required fields are filled                       |
| Toggle not working  | Check network tab for API errors                           |

---

## Author

**Syed Ragib Israq**
