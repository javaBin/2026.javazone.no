const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export const RoomIcon = ({ className = 'w-3 h-3 shrink-0' }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const ClockIcon = ({ className = 'w-3 h-3 shrink-0' }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
)

export const LanguageIcon = ({ className = 'w-3 h-3 shrink-0' }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.4 2.6 3.8 5.8 3.8 9s-1.4 6.4-3.8 9c-2.4-2.6-3.8-5.8-3.8-9s1.4-6.4 3.8-9Z" />
  </svg>
)
