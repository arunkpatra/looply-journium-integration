# Journium Integration - Quick Reference Card

## 🚀 SETUP (3 Steps)

### 1. Get API Key
- Sign up: https://journium.app/signup
- Create app: https://dashboard.journium.app/apps/new
- Copy key: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/api-keys

### 2. Configure
```bash
# Edit .env.local
NEXT_PUBLIC_JOURNIUM_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Run
```bash
pnpm dev
```

---

## ✅ VERIFY (5 Checks)

1. **Console Logs** (F12)
   ```
   [Journium] Initialized with key: pk_test_...
   [Journium] Tracking pageview: /
   ```

2. **Widget Visible**
   - Look bottom-right corner
   - Click "Send Test Event"

3. **Navigate Pages**
   - Each page = pageview event

4. **Test Sign-Up**
   - Go to `/auth/sign-up`
   - Fill form and submit
   - Check console for events

5. **Dashboard Events**
   - https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/events
   - Should see events within seconds

---

## 📊 EVENTS TRACKED

| Event | When | Automatic |
|-------|------|-----------|
| `pageview` | Every navigation | ✅ |
| `$autocapture` | Clicks, interactions | ✅ |
| `journium_verification_loaded` | Widget loads | ✅ |
| `test_button_clicked` | Test button | Manual |
| `sign_up_attempted` | Form submit | Manual |
| `sign_up_completed` | Account created | Manual |

---

## 💻 CUSTOM TRACKING CODE

### Track Event
```typescript
import { useTrackEvent } from "@journium/nextjs"

const trackEvent = useTrackEvent()
trackEvent("action_name", { 
  property: "value" 
})
```

### Identify User
```typescript
import { useIdentify } from "@journium/nextjs"

const identify = useIdentify()
identify(userId, {
  email: "user@example.com",
  name: "User Name"
})
```

---

## 🔧 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| No console logs | Restart dev server |
| No events in dashboard | Wait 10s, check API key |
| Widget not showing | Only visible in dev mode |
| Build errors | `rm -rf .next && pnpm dev` |

---

## 📚 DOCUMENTATION

- **Quick Start**: `QUICK_START_JOURNIUM.md`
- **Full Guide**: `JOURNIUM_INTEGRATION.md`
- **Summary**: `INTEGRATION_SUMMARY.md`
- **Official**: https://docs.journium.app

---

## 🌐 DASHBOARD LINKS

- Events: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/events
- API Keys: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/api-keys
- Trackers: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/developers/insight-trackers
- Insights: https://dashboard.journium.app/apps/j_app~/instances/j_app_inst~/insights

---

## 🎯 NEXT STEPS

1. ✅ Replace placeholder API key
2. ✅ Run `pnpm dev`
3. ✅ Check console logs
4. ✅ Test verification widget
5. ✅ View events in dashboard
6. 🎉 Start tracking custom events!
