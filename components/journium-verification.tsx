"use client"

import { useTrackEvent } from "@journium/nextjs"
import { useEffect, useState } from "react"

/**
 * Journium Event Verification Component
 * 
 * This component helps verify that Journium is correctly integrated.
 * It tracks custom events and displays status information.
 */
export function JourniumVerification() {
  const trackEvent = useTrackEvent()
  const [eventCount, setEventCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Track component mount event
    trackEvent("journium_verification_loaded", {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    })
  }, [trackEvent])

  const handleTestEvent = () => {
    trackEvent("test_button_clicked", {
      count: eventCount + 1,
      timestamp: new Date().toISOString(),
    })
    setEventCount(eventCount + 1)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border bg-card p-4 shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Journium Verification</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Integration active. Events are being tracked.
          </p>
          <div className="mt-2 space-y-1 text-xs">
            <p>Test events sent: <span className="font-mono font-semibold">{eventCount}</span></p>
            <p className="text-muted-foreground">Check browser console for debug logs.</p>
          </div>
          <button
            onClick={handleTestEvent}
            className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Send Test Event
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
