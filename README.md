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

### 3. Configure Journium Analytics

This app uses [Journium](https://journium.app) for analytics tracking. You'll need to set up a Journium account and get your API key.

#### Get Your Journium API Key

1. **Sign up** for a free Journium account at [journium.app/signup](https://journium.app/signup)
2. **Create an application** in your [Journium dashboard](https://dashboard.journium.app/apps/new)
3. **Copy your Publishable Key** from [Developers | API Keys](https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/api-keys)
4. **Add it to `.env.local`** file:

```bash
# Open .env.local file
nano .env.local
```

Replace `your_publishable_key_here` with your actual key:

```bash
NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

> **Note:** Development keys start with `pk_test_`, production keys start with `pk_live_`

### 4. Run the Development Server

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

### 5. Verify Journium Integration

Once the dev server is running:

1. **Open [http://localhost:3000](http://localhost:3000)** in your browser
2. **Look for the verification widget** in the bottom-right corner (only visible in development)
3. **Check browser console** (F12 → Console) - you should see Journium debug logs
4. **Click "Send Test Event"** in the verification widget
5. **View events in dashboard** at [Developers | Events](https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/events)

#### What Should You See?

**In Browser Console:**
```
[Journium] Initialized with key: pk_test_...
[Journium] Tracking pageview: /
[Journium] Tracking event: journium_verification_loaded
[Journium] Tracking event: test_button_clicked
```

**In Journium Dashboard:**
- `pageview` events for each page navigation
- `journium_verification_loaded` event on page load
- `test_button_clicked` events when you click the test button
- Automatic click tracking for buttons and links (autocapture)

### 6. Start Using Looply

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

### Journium events not showing?

**Check your API key:**
```bash
# Verify your .env.local file
cat .env.local
# Should show: NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_test_...
```

**Restart dev server after changing `.env.local`:**
```bash
# Stop server (Ctrl+C) and restart
pnpm dev
```

**Check browser console:**
- Open DevTools (F12) → Console tab
- Look for `[Journium]` debug logs
- Check for error messages

**Common issues:**
- ❌ API key doesn't start with `pk_` - verify you copied the correct key
- ❌ No console logs - ensure `debug: true` in config and you're in development mode
- ❌ `.env.local` not loading - check file name is exactly `.env.local` (not `.env.local.txt`)
- ❌ Environment variable not available - must use `NEXT_PUBLIC_` prefix for client-side access

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Analytics:** Journium

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
