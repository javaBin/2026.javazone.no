import React from 'react'

export interface QuietGridItem {
  title: string
  body: React.ReactNode
}

interface QuietGridProps {
  items: QuietGridItem[]
  columns?: 2 | 3
}

// Pattern 4 (style.md §5.4): two or three aligned items, separated only by a top hairline.
const QuietGrid = ({ items, columns = 3 }: QuietGridProps) => {
  const span = columns === 3 ? 'md:col-span-4' : 'md:col-span-4 lg:col-span-6'
  return (
    <div className="grid-12 gap-y-10">
      {items.map((item) => (
        <div key={item.title} className={`col-span-full ${span} border-t border-line pt-6`}>
          <h3 className="m-0 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
          <div className="mt-3 space-y-3 text-muted">{item.body}</div>
        </div>
      ))}
    </div>
  )
}

export default QuietGrid
