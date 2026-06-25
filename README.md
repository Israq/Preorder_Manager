cat > README.md << 'EOF'

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

```bash
# Clone the repository
git clone <your-repo-url>
cd preorder-manager

# Install dependencies
npm install

# Set up the database and seed data
npx prisma migrate dev --name init
npx prisma db seed

# Start the development server
npm run dev
```

model Preorder {
id String @id @default(cuid())
name String
products Int @default(1)
preorderWhen String @default("regardless-of-stock")
startsAt DateTime
endsAt DateTime?
status Boolean @default(true)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

preorder-manager/
├── prisma/
│ ├── schema.prisma # Database schema
│ ├── seed.ts # Sample seed data (8 preorders)
│ └── migrations/ # Database migration files
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── preorders/
│ │ │ ├── route.ts # GET (list) & POST (create)
│ │ │ └── [id]/
│ │ │ ├── route.ts # PUT (update) & DELETE
│ │ │ └── status/
│ │ │ └── route.ts # PATCH (toggle status)
│ │ ├── preorders/
│ │ │ ├── page.tsx # List page (table, filters, sort, pagination)
│ │ │ ├── new/
│ │ │ │ └── page.tsx # Create preorder form
│ │ │ └── [id]/
│ │ │ └── edit/
│ │ │ └── page.tsx # Edit preorder form (pre-filled)
│ │ ├── page.tsx # Home page (redirects to /preorders)
│ │ ├── layout.tsx # Root layout with Inter font + Toaster
│ │ └── globals.css # Global styles
│ ├── components/
│ │ ├── preorder-form.tsx # Shared create/edit form component
│ │ ├── sort-dropdown.tsx # Sort dropdown (sort by + order)
│ │ └── ui/ # shadcn/ui components (button, table, switch, etc.)
│ └── lib/
│ ├── prisma.ts # Prisma client singleton
│ └── utils.ts # Utility functions (cn)
├── prisma.config.ts # Prisma v7 configuration
├── components.json # shadcn/ui configuration
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── README.md # Project documentation
