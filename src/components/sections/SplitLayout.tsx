import React from 'react'

interface SplitLayoutProps {
  start: React.ReactNode
  end: React.ReactNode
  /** Column ratio on desktop: 5/7 (default) or 6/6. Stacks to one column below 1024px. */
  ratio?: '5/7' | '6/6'
  className?: string
}

const spans = {
  '5/7': ['lg:col-span-5', 'lg:col-span-7'],
  '6/6': ['lg:col-span-6', 'lg:col-span-6'],
} as const

// Pattern 2 (style.md §5.4): two columns, text plus optional media or a graphic surface.
const SplitLayout = ({ start, end, ratio = '5/7', className = '' }: SplitLayoutProps) => {
  const [startSpan, endSpan] = spans[ratio]
  return (
    <div className={`grid-12 gap-y-8 ${className}`.trim()}>
      <div className={`col-span-full ${startSpan}`}>{start}</div>
      <div className={`col-span-full ${endSpan}`}>{end}</div>
    </div>
  )
}

export default SplitLayout
