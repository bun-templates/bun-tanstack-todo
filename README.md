# Bun + TanStack Todo

This example shows a full-stack todo application built with [Bun](https://bun.com), [TanStack Start](https://tanstack.com/start), and PostgreSQL.

[→ Live demo](http://bun-tanstack-todo.vercel.app/)

## Tech Stack

- **Runtime and Package Manager**: [Bun](https://bun.com)
- **Framework**: [TanStack Start](https://tanstack.com/start)
- **Database**: PostgreSQL (via Bun's native SQL API)
- **UI Components**: [ShadCN](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Validation**: [Zod](https://zod.dev/)

## Prerequisites

- [Bun](https://bun.com) installed
- PostgreSQL database (local or cloud)

### PostgreSQL Options

What PostgreSQL you want to use is up to you. You can keep it local, or use providers like:
- [Neon](https://neon.tech)
- [Supabase](https://supabase.com/docs/guides/database/overview)
- [Railway](https://docs.railway.com/guides/postgresql)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

<details> <summary>Get started with PostgreSQL locally</summary>


If you already have `psql` installed:

```
createdb mydb
```

Otherwise, install PostgreSQL with Homebrew (or follow the official [instructions](https://www.postgresql.org/docs/current/tutorial-install.html))

```
brew install postgresql
brew services start postgresql
createdb mydb
```

Add to `.env`:

```
DATABASE_URL="postgresql://$(whoami)@localhost:5432/mydb"
```
</details>


## 🚀 Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <repo-url>
cd bun-tanstack-todo

# Install dependencies
bun install
```

### 2. Database Setup

Create a `.env` file in the root directory. You can copy `.env.example` as a starting point:

```bash
cp .env.example .env
```

Then edit `.env` with your database connection details:

```bash
# Add a Connection string:
DATABASE_URL=postgres://username:password@hostname:port/database


# Or use individual environment variables:
# PGHOST=localhost
# PGPORT=5432
# PGUSERNAME=postgres
# PGPASSWORD=password
# PGDATABASE=todos
```

### 3. Seed the Database

Run the seed script to create the table and add sample data. This will:
- Create the `todos` table if it doesn't exist
- ⚠️ **Clear existing todos** (for idempotency)
- Insert sample todos

```bash
bun run db:seed
```

### 4. Start Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start`- Start production server
- `bun run db:seed` - Seed the database
- `bun run lint` - Run Biome linter
- `bun run format` - Format code with Biome

---

To deploy to Vercel, make sure you add the following configuration:

```diff
nitro({
+	config: { 
+		vercel: {
+			functions: {
+				runtime: "bun1.x",
+			},
+		},
+	},
})
```

[→ More information about Nitro on Vercel](https://nitro.build/deploy/providers/vercel) 