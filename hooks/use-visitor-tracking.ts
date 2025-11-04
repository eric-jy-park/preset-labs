"use client"

import { useEffect } from "react"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyrUmgyyFF-7EJHaI85kCXtmxSsUlJ41nkFttUHxAkpC_HdtW3KKZLEQN11cCQVsopc-w/exec"

function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const value = "; " + document.cookie
  const parts = value.split("; " + name + "=")
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()
  }
}

function setCookieValue(name: string, value: string, days: number) {
  if (typeof document === "undefined") return
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

function getUVfromCookie(): string {
  const hash = Math.random().toString(36).substring(2, 8).toUpperCase()
  const existingHash = getCookieValue("user")
  if (!existingHash) {
    setCookieValue("user", hash, 180)
    return hash
  }
  return existingHash
}

function padValue(value: number): string {
  return value < 10 ? "0" + value : value.toString()
}

function getTimeStamp(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${padValue(year)}-${padValue(month)}-${padValue(day)} ${padValue(hours)}:${padValue(minutes)}:${padValue(seconds)}`
}

async function getClientIp(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json")
    const data = await res.json()
    return data.ip || "unknown"
  } catch {
    return "unknown"
  }
}

async function trackVisitor() {
  try {
    const userId = getUVfromCookie()

    // Check if this user (ID) has already been tracked
    const storageKey = `visitor_tracked_${userId}`
    if (localStorage.getItem(storageKey)) {
      console.log("Visitor already tracked")
      return
    }

    const ip = await getClientIp()

    const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop"

    const utm = new URLSearchParams(window.location.search).get("utm")

    const visitorData = JSON.stringify({
      id: userId,
      time_stamp: getTimeStamp(),
      landingUrl: window.location.href,
      referer: document.referrer,
      device,
      utm: utm || "",
      ip,
    })

    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=insert&table=visitors&data=${visitorData}`)

    if (response.ok) {
      // Mark this user as tracked permanently
      localStorage.setItem(storageKey, "true")
      console.log("Visitor tracked successfully")
    } else {
      console.error("Failed to track visitor:", response.statusText)
    }
  } catch (error) {
    console.error("Visitor tracking error:", error)
  }
}

export function useVisitorTracking() {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      trackVisitor()
    }
  }, []) // Empty dependency array = runs once on mount
}
