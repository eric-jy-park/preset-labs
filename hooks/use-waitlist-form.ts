"use client"

import type React from "react"

import { useState } from "react"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyrUmgyyFF-7EJHaI85kCXtmxSsUlJ41nkFttUHxAkpC_HdtW3KKZLEQN11cCQVsopc-w/exec"

function getCookieValue(name: string): string | undefined {
  const value = "; " + document.cookie
  const parts = value.split("; " + name + "=")
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()
  }
}

function setCookieValue(name: string, value: string, days: number) {
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

export function useWaitlistForm() {
  const [email, setEmail] = useState("")
  const [advice, setAdvice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      alert("이메일이 유효하지 않아 알림을 드릴 수가 없습니다.")
      return
    }

    setIsLoading(true)

    try {
      const userId = getUVfromCookie()
      const ip = await getClientIp()

      // Submit waitlist data
      const waitlistData = JSON.stringify({
        id: userId,
        email,
        advice,
      })

      await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=insert&table=tab_final&data=${waitlistData}`)

      // Log visitor data
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

      await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=insert&table=visitors&data=${visitorData}`)

      // Show success and reset form
      setShowSuccess(true)
      setEmail("")
      setAdvice("")
    } catch (error) {
      console.error("Submission error:", error)
      alert("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    setEmail,
    advice,
    setAdvice,
    isLoading,
    showSuccess,
    setShowSuccess,
    handleSubmit,
  }
}
