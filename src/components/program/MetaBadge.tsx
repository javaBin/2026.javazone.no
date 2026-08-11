import type { ReactNode } from 'react'

const MetaBadge = ({ icon, label, accent }: { icon?: ReactNode; label: string; accent?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full whitespace-nowrap shrink-0 ${
      accent ? 'bg-accent-primary/20 text-accent-primary' : 'bg-base-100/40 text-secondary'
    }`}
  >
    {icon}
    {label}
  </span>
)

export default MetaBadge
