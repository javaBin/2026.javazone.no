import React from 'react'

interface EditorialIntroProps {
  /** Small overline above the heading. */
  eyebrow?: string
  title: React.ReactNode
  /** Heading element; defaults to h2. Use h1 for a page's main heading. */
  as?: 'h1' | 'h2'
  /** Optional lead paragraph(s) below the heading. */
  children?: React.ReactNode
  id?: string
}

// Pattern 1 (style.md §5.4): small overline + large text block, left-aligned on the grid.
const EditorialIntro = ({ eyebrow, title, as: Tag = 'h2', children, id }: EditorialIntroProps) => {
  return (
    <div className="grid-12">
      <div className="col-span-full lg:col-span-9">
        {eyebrow && <p className="eyebrow m-0 mb-4">{eyebrow}</p>}
        <Tag id={id} className="text-section m-0">
          {title}
        </Tag>
        {children && <div className="mt-6 max-w-2xl space-y-4 text-lg text-muted md:text-xl">{children}</div>}
      </div>
    </div>
  )
}

export default EditorialIntro
