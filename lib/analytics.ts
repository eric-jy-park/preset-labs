"use client"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyrUmgyyFF-7EJHaI85kCXtmxSsUlJ41nkFttUHxAkpC_HdtW3KKZLEQN11cCQVsopc-w/exec"

// 쿠키에서 사용자 ID 가져오기 (기존 visitor tracking과 동일)
function getUserIdFromCookie(): string {
  if (typeof document === "undefined") return "unknown"
  const value = "; " + document.cookie
  const parts = value.split("; user=")
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || "unknown"
  }
  return "unknown"
}

// 타임스탬프 생성
function getTimeStamp(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 디바이스 감지
function getDevice(): string {
  if (typeof navigator === "undefined") return "unknown"
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? "mobile"
    : "desktop"
}

// 이벤트 추적 메인 함수
export async function trackEvent(params: {
  eventType: "preset_selected" | "intensity_changed" | "download_initiated"
  presetId?: string
  presetName?: string
  intensity?: number
  userEmail?: string
}) {
  try {
    const eventData = JSON.stringify({
      id: getUserIdFromCookie(),
      user_email: params.userEmail || "",
      event_type: params.eventType,
      preset_id: params.presetId || "",
      preset_name: params.presetName || "",
      intensity: params.intensity || 0,
      time_stamp: getTimeStamp(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
      device: getDevice(),
    })

    await fetch(
      `${GOOGLE_APPS_SCRIPT_URL}?action=insert&table=user_events&data=${eventData}`
    )
  } catch (error) {
    console.error("Event tracking error:", error)
  }
}
