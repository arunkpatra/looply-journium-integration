# Journium Integration Guide

This document explains how Journium analytics has been integrated into this Next.js application.

## What is Journium?

Journium is an analytics platform that turns raw telemetry data into narrative insights. It automatically captures user behavior and generates actionable analytics without requiring manual dashboard creation.

## Integration Overview

### What Was Added

1. **Package Installation**
   - Added `@journium/nextjs` SDK (v1.1.1)

2. **Environment Configuration**
   - Created `.env.local` with `NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY`

3. **Provider Setup**
   - Wrapped app with `<NextJourniumProvider>` in `app/layout.tsx`
   - Enabled debug mode for development
   - Enabled auto-tracking of pageviews
   - Enabled autocapture for clicks and interactions

4. **Verification Component**
   - Created `components/journium-verification.tsx` for testing (dev only)
   - Displays integration status
   - Allows sending test events
   - Shows event counter

5. **Custom Event Tracking Example**
   - Added event tracking to sign-up flow (`app/auth/sign-up/page.tsx`)
   - Tracks: `sign_up_attempted`, `sign_up_completed`
   - Identifies users with `useIdentify()` hook

## Configuration Details

### Provider Configuration (app/layout.tsx)

```typescript
<NextJourniumProvider
  config={{
    publishableKey: process.env.NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY!,
    options: {
      debug: process.env.NODE_ENV === "development",  // Console logs in dev
      autoTrackPageviews: true,                       // Track route changes
      autocapture: true,                              // Track clicks automatically
    },
  }}
>
```

### What Gets Tracked Automatically

1. **Pageviews**: Every route navigation in your Next.js app
2. **Clicks**: Button clicks, link clicks, and interactive elements
3. **Form Submissions**: When autocapture is enabled
4. **Session Data**: User sessions with 30-minute timeout (default)

## Custom Event Tracking

### Available Hooks

```typescript
import { 
  useTrackEvent,    // Track custom events
  useIdentify,      // Identify users
  useReset,         // Reset user identity (logout)
  useJournium       // Access analytics instance
} from "@journium/nextjs"
```

### Example: Track Custom Event

```typescript
"use client"

import { useTrackEvent } from "@journium/nextjs"

export function MyComponent() {
  const trackEvent = useTrackEvent()
  
  const handleAction = () => {
    trackEvent("custom_action", {
      feature: "my_feature",
      value: 123,
      metadata: { foo: "bar" }
    })
  }
  
  return <button onClick={handleAction}>Track Action</button>
}
```

### Example: Identify User

```typescript
"use client"

import { useIdentify } from "@journium/nextjs"

export function LoginComponent() {
  const identify = useIdentify()
  
  const handleLogin = (user) => {
    // Identify user in Journium
    identify(user.id, {
      email: user.email,
      name: user.name,
      plan: user.plan,
      created_at: user.createdAt
    })
  }
}
```

## Verification & Testing

### Local Development Verification

1. **Start Development Server**
   ```bash
   pnpm dev
   ```

2. **Check Browser Console** (F12 → Console)
   Look for Journium debug logs:
   ```
   [Journium] Initialized with key: pk_test_...
   [Journium] Tracking pageview: /
   [Journium] Tracking event: journium_verification_loaded
   ```

3. **Use Verification Widget**
   - Look for the widget in bottom-right corner (dev only)
   - Click "Send Test Event" button
   - Watch event counter increment
   - Check console for event logs

4. **Navigate Around**
   - Visit different pages (`/auth/sign-in`, `/auth/sign-up`, etc.)
   - Each navigation should log a pageview event
   - Click buttons and links to see autocapture events

5. **View Events in Dashboard**
   - Go to [Journium Dashboard - Events](https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/events)
   - You should see all tracked events within a few seconds
   - Events include metadata like pathname, properties, timestamps

### Testing Sign-Up Flow

1. Navigate to `/auth/sign-up`
2. Fill out the form and submit
3. Check console for these events:
   - `sign_up_attempted` (when form is submitted)
   - `sign_up_completed` (when account is created)
   - User identification with properties

## Event Examples

### Events Currently Being Tracked

| Event Name | When Fired | Properties |
|------------|------------|------------|
| `pageview` | On every route change | `pathname`, `url`, `referrer` |
| `journium_verification_loaded` | When verification widget mounts | `timestamp`, `page` |
| `test_button_clicked` | When test button clicked | `count`, `timestamp` |
| `sign_up_attempted` | When sign-up form submitted | `email_domain`, `has_name` |
| `sign_up_completed` | When account created | `user_id`, `plan` |
| `$autocapture` | On button/link clicks | `element_text`, `element_type`, etc. |

## Dashboard Access

### View Your Data

1. **Events**: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/events
2. **Insight Trackers**: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/insight-trackers
3. **Jobs**: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/jobs
4. **Insights**: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/insights

### Generate Insights

1. Go to Insight Trackers page
2. Click "Analyze now" on the default "User Engagement" tracker
3. Wait 1-2 minutes for job to complete
4. View generated insights in the Insights page

## Troubleshooting

### No Events Showing in Dashboard

**Check API Key**
```bash
cat .env.local
# Should show: NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_test_...
```

**Verify Key Format**
- Development: `pk_test_...`
- Production: `pk_live_...`

**Restart Dev Server**
```bash
# Stop server (Ctrl+C)
pnpm dev
```

### No Console Logs

**Check Debug Mode**
- Ensure `debug: true` in provider config
- Only works in `NODE_ENV === "development"`

**Check Browser Console Settings**
- Ensure console isn't filtering logs
- Look for `[Journium]` prefix

### Events Not Being Tracked

**Check Provider Wrapping**
- Ensure `<NextJourniumProvider>` wraps your entire app
- Check `app/layout.tsx` for proper setup

**Check Environment Variable**
- Must start with `NEXT_PUBLIC_` for client-side access
- Must be in `.env.local` file (not `.env`)

### TypeScript Errors

If you see TypeScript errors, try:
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
pnpm dev
```

## Production Deployment

### Environment Variables

**Development** (`.env.local`):
```bash
NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_test_your_dev_key
```

**Production** (Vercel/hosting platform):
```bash
NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_live_your_prod_key
```

### Build & Deploy

1. Set production API key in hosting platform environment variables
2. Build application: `pnpm build`
3. Deploy as normal
4. Debug mode automatically disabled in production
5. Verification widget won't appear in production

## Best Practices

### Event Naming

- Use snake_case: `user_signed_up` ✅ not `UserSignedUp` ❌
- Be descriptive: `checkout_completed` ✅ not `done` ❌
- Use past tense: `item_purchased` ✅ not `item_purchase` ❌

### Event Properties

- Keep properties flat when possible
- Use consistent property names across events
- Include relevant context (user_id, plan, feature, etc.)
- Don't include sensitive data (passwords, credit cards, etc.)

### User Identification

- Identify users after authentication
- Include relevant user properties (email, name, plan)
- Don't include PII if not necessary
- Reset identity on logout using `useReset()`

## Next Steps

1. **Add Custom Events**: Identify key user actions to track
2. **Create Insight Trackers**: Set up analytics for specific metrics
3. **Review Insights**: Check dashboard regularly for generated insights
4. **Iterate**: Refine tracking based on insights

## Resources

- [Journium Documentation](https://docs.journium.app)
- [Next.js SDK Reference](https://docs.journium.app/docs/nextjs)
- [React Hooks Guide](https://docs.journium.app/docs/react/hooks)
- [Events Concepts](https://docs.journium.app/docs/concepts/events)
- [Dashboard](https://dashboard.journium.app)
