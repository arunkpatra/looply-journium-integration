# Looply - Habit Tracker

A modern, beautiful habit tracking application built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- ✅ User authentication and account management
- ✅ Create and manage daily habits
- ✅ Track habit completion with intuitive logging
- ✅ Visualize progress with insights and analytics
- ✅ Beautiful, responsive UI with Radix UI components
- ✅ Built with Next.js App Router for optimal performance

## Prerequisites

- Node.js 18+ installed
- pnpm package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/looply.git
cd looply
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run the Development Server

```bash
pnpm dev
```

The server will start at **http://localhost:3000**

<details>
<summary>Using a custom port?</summary>

```bash
pnpm dev -- -p 3001
```
</details>

### 4. Start Using Looply

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Sign up** for an account (use any email/password, e.g., `test@example.com` / `password123`)
- **Create your first habit** (e.g., "Drink 8 glasses of water")
- **Log habit completions** throughout your day
- **View insights** to track your progress over time

> **Note:** This is a demo app with local data storage. Your data is stored only in your browser.

## Troubleshooting

### Build errors?
- Delete `node_modules` and `.next` cache, then reinstall dependencies:
  ```bash
  rm -rf node_modules .next && pnpm install
  ```
- Ensure Node.js version is 18+:
  ```bash
  node --version
  ```

### Port already in use?
- Use a different port:
  ```bash
  pnpm dev -- -p 3001
  ```
- Or stop the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **State Management:** React Hooks

## Project Structure

```
looply/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Protected app routes
│   │   ├── habits/        # Habit management
│   │   ├── home/          # Dashboard/home
│   │   ├── insights/      # Analytics and insights
│   │   └── log/           # Habit logging
│   ├── auth/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── onboarding/        # User onboarding flow
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/                   # Utility functions and helpers
└── public/                # Static assets
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues
