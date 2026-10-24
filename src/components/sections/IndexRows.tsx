import { Link } from 'react-router-dom'

import ArrowIcon from '@/components/ArrowIcon'

export interface IndexRow {
  title: string
  href: string
  /** Short supporting text — beside the title on wide screens, below it on narrow ones. */
  description?: string
  /** Small label in front of the title, e.g. an index number. */
  label?: string
}

interface IndexRowsProps {
  rows: IndexRow[]
  /** Larger type, for archive/year indexes (style.md §5.4 pattern 5). */
  size?: 'default' | 'large'
}

const rowClass = 'group flex items-center gap-6 py-5 text-ink no-underline transition-colors duration-200 ease-standard hover:text-brand md:py-6'

// Patterns 3 and 5 (style.md §5.4): full-width entries separated by hairlines, each with an arrow.
const IndexRows = ({ rows, size = 'default' }: IndexRowsProps) => {
  const titleClass = size === 'large' ? 'text-section' : 'text-xl font-semibold tracking-tight md:text-2xl'

  return (
    <ul className="m-0 p-0 list-none border-y border-line divide-y divide-line">
      {rows.map((row) => {
        const isExternal = /^(https?:|mailto:)/.test(row.href)
        const content = (
          <>
            <span className="flex-1 min-w-0 md:flex md:items-baseline md:gap-8">
              {row.label && <span className="block mb-1 text-sm font-medium text-muted tabular-nums md:mb-0 md:w-16 md:shrink-0">{row.label}</span>}
              <span className={`block md:w-5/12 md:shrink-0 ${titleClass}`}>{row.title}</span>
              {row.description && <span className="block mt-1 text-muted md:mt-0 md:flex-1">{row.description}</span>}
            </span>
            <ArrowIcon className="w-5 h-5 transition-transform duration-200 ease-standard group-hover:translate-x-1" />
          </>
        )

        return (
          <li key={row.href}>
            {isExternal ? (
              <a href={row.href} className={rowClass} {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {content}
              </a>
            ) : (
              <Link to={row.href} className={rowClass}>
                {content}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default IndexRows
