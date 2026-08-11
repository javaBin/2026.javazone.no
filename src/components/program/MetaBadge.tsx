import type { ReactNode } from 'react'

const SIZE_CLASSES = {
  sm: 'gap-1 px-2 py-0.5 text-[11px]',
  md: 'gap-1.5 px-3 py-1 text-sm',
} as const

const MetaBadge = ({ icon, label, accent, size = 'sm' }: { icon?: ReactNode; label: string; accent?: boolean; size?: keyof typeof SIZE_CLASSES }) => (
  <span
    className={`inline-flex items-center font-medium rounded-full whitespace-nowrap shrink-0 ${SIZE_CLASSES[size]} ${
      accent ? 'bg-accent-primary/20 text-accent-primary' : 'bg-base-100/40 text-secondary'
    }`}
  >
    {icon}
    {label}
  </span>
)

export default MetaBadge
