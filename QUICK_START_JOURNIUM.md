# Quick Start: Verify Journium Integration

Follow these steps to verify that Journium is working correctly in this application.

## Prerequisites

- Node.js 18+ installed
- pnpm installed
- Journium account (sign up at https://journium.app/signup)

## Step 1: Get Your Journium API Key

1. **Sign up** at https://journium.app/signup
2. **Create an application** at https://dashboard.journium.app/apps/new
3. **Copy your publishable key** from https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/api-keys
   - Development key starts with `pk_test_`
   - Production key starts with `pk_live_`

## Step 2: Configure Environment

Edit `.env.local` file and replace the placeholder:

```bash
NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

Save the file.

## Step 3: Install Dependencies (if needed)

```bash
pnpm install
```

## Step 4: Start Development Server

```bash
pnpm dev
```

Wait for the server to start. You should see:

```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
```

## Step 5: Open Browser and Check Console

1. **Open** http://localhost:3000
2. **Open DevTools** (Press F12 or Cmd+Option+I on Mac)
3. **Go to Console tab**

### ✅ What You Should See in Console:

```
[Journium] Initialized with key: pk_test_...
[Journium] Session ID: ses_...
[Journium] Tracking pageview: /
[Journium] Event queued: pageview
[Journium] Tracking event: journium_verification_loaded
[Journium] Event queued: journium_verification_loaded
[Journium] Flushing 2 events to server
[Journium] Events sent successfully
```

### ❌ If You See Errors:

**"Invalid API key"**
- Check that your key starts with `pk_test_` or `pk_live_`
- Verify you copied the full key without extra spaces

**No logs at all**
- Restart the dev server (Ctrl+C, then `pnpm dev`)
- Check that `.env.local` file exists in project root
- Verify debug mode is enabled (it is by default in development)

## Step 6: Use Verification Widget

Look for a widget in the **bottom-right corner** of the page.

1. **Click "Send Test Event"** button
2. Watch the counter increment
3. Check console for new event logs

### ✅ What You Should See:

```
[Journium] Tracking event: test_button_clicked
[Journium] Event queued: test_button_clicked
[Journium] Flushing 1 events to server
[Journium] Events sent successfully
```

## Step 7: Navigate Between Pages

Click around the app:
- Go to Sign In page (`/auth/sign-in`)
- Go to Sign Up page (`/auth/sign-up`)

### ✅ What You Should See:

Each navigation should log:
```
[Journium] Tracking pageview: /auth/sign-in
[Journium] Event queued: pageview
```

## Step 8: Test Sign-Up Flow

1. **Go to** http://localhost:3000/auth/sign-up
2. **Fill in the form:**
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. **Click "Create account"**

### ✅ What You Should See in Console:

```
[Journium] Tracking event: sign_up_attempted
[Journium] Event properties: {email_domain: "example.com", has_name: true}
[Journium] Identifying user: <user-id>
[Journium] Tracking event: sign_up_completed
[Journium] Event properties: {user_id: "<id>", plan: "free"}
[Journium] Events sent successfully
```

## Step 9: View Events in Dashboard

1. **Go to** https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/events
2. **Refresh** the page
3. **Look for your events** - they should appear within seconds

### ✅ Events You Should See:

| Event Name | When It Was Created |
|------------|---------------------|
| `pageview` | Every page navigation |
| `journium_verification_loaded` | When page loaded |
| `test_button_clicked` | When you clicked test button |
| `sign_up_attempted` | When form submitted |
| `sign_up_completed` | When account created |
| `$autocapture` | Various button/link clicks |

## Step 10: Generate Your First Insight (Optional)

1. **Go to** https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/insight-trackers
2. **Click "Analyze now"** on "User Engagement" tracker
3. **Monitor job** at https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/jobs
4. **Wait 1-2 minutes** for completion
5. **View insights** at https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/insights

---

## Summary Checklist

- ✅ API key configured in `.env.local`
- ✅ Dev server running
- ✅ Console shows Journium debug logs
- ✅ Verification widget visible (bottom-right)
- ✅ Test events tracked successfully
- ✅ Page navigation tracked
- ✅ Sign-up events tracked
- ✅ Events visible in dashboard

## Troubleshooting

### Issue: No verification widget visible

**Solution:**
- Widget only appears in development mode
- Check that `NODE_ENV` is `development`
- Restart dev server

### Issue: Events not appearing in dashboard

**Solution:**
- Wait 5-10 seconds and refresh
- Check console for successful event sending
- Verify API key is correct
- Make sure you're looking at the correct app instance

### Issue: Build fails

**Solution:**
```bash
rm -rf .next node_modules
pnpm install
pnpm dev
```

---

## Next Steps

✅ **Integration Complete!**

Read `JOURNIUM_INTEGRATION.md` for:
- Custom event tracking examples
- Available hooks reference
- Best practices
- Production deployment guide

Or check the main `README.md` for app usage instructions.
