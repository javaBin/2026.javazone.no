import React from 'react'

import Container from '@/components/layout/Container'

interface PageHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  /** Lead text below the title. */
  children?: React.ReactNode
  /** Buttons or links below the lead. */
  actions?: React.ReactNode
}

// Top of a subpage: eyebrow + page heading (h1) + lead, left-aligned on the grid (style.md §5.4 pattern 1).
const PageHeader = ({ eyebrow, title, children, actions }: PageHeaderProps) => {
  return (
    <Container className="grid-12 pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
      <div className="col-span-full lg:col-span-9">
        {eyebrow && <p className="eyebrow m-0 mb-4">{eyebrow}</p>}
        <h1 className="text-section m-0">{title}</h1>
        {children && <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted md:text-xl">{children}</div>}
        {actions && <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">{actions}</div>}
      </div>
    </Container>
  )
}

export default PageHeader
