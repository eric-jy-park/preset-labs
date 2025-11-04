import React from "react"

interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Camera lens outer circle */}
      <circle cx="16" cy="16" r="14" fill="url(#logoGradient)" />

      {/* Camera lens inner detail */}
      <circle cx="16" cy="16" r="10" fill="#fff" fillOpacity="0.2" />
      <circle cx="16" cy="16" r="6" fill="#fff" fillOpacity="0.3" />

      {/* Aperture blades */}
      <path
        d="M16 10 L19 16 L16 16 Z"
        fill="#fff"
        fillOpacity="0.4"
      />
      <path
        d="M22 16 L16 19 L16 16 Z"
        fill="#fff"
        fillOpacity="0.4"
      />
      <path
        d="M16 22 L13 16 L16 16 Z"
        fill="#fff"
        fillOpacity="0.4"
      />
      <path
        d="M10 16 L16 13 L16 16 Z"
        fill="#fff"
        fillOpacity="0.4"
      />

      {/* Center dot */}
      <circle cx="16" cy="16" r="2" fill="#fff" />
    </svg>
  )
}
