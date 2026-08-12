import type { ReactNode } from 'react'

const SIZE_CLASSES = {
  sm: 'gap-1 px-2 py-0.5 text-[11px]',
  md: 'gap-1.5 px-3 py-1 text-sm',
} as const

const TONE_CLASSES = {
  default: 'bg-base-100/60 text-primary',
  accent: 'bg-accent-primary/20 text-accent-primary',
  pop: 'bg-pop text-pop-secondary',
  'pop-outline': 'bg-transparent border border-pop text-pop',
} as const

const MetaBadge = ({
  icon,
  label,
  tone = 'default',
  size = 'sm',
  title,
  className = '',
}: {
  icon?: ReactNode
  label: string
  tone?: keyof typeof TONE_CLASSES
  size?: keyof typeof SIZE_CLASSES
  title?: string
  className?: string
}) => (
  <span
    title={title}
    className={`inline-flex items-center font-semibold rounded-full whitespace-nowrap shrink-0 ${SIZE_CLASSES[size]} ${TONE_CLASSES[tone]} ${className}`}
  >
    {icon}
    {label}
  </span>
)

export default MetaBadge
