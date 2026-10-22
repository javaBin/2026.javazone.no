import React from 'react'

export interface Topic {
  title: React.ReactNode
  body: React.ReactNode
  /** Optional anchor id for the topic heading. */
  id?: string
}

interface TopicRowsProps {
  topics: Topic[]
  /** Heading level for topic titles: h2 for page topics (default), h3 for e.g. FAQ questions under an h2. */
  as?: 'h2' | 'h3'
}

// Editorial split for running text (style.md §5.4 pattern 2): topic heading on the left,
// body on the right, topics separated by hairlines. Stacks to one column below 1024px.
const TopicRows = ({ topics, as: Tag = 'h2' }: TopicRowsProps) => {
  const titleClass = Tag === 'h2' ? 'text-subsection' : 'text-xl font-semibold tracking-tight md:text-2xl'

  return (
    <div className="border-b border-line">
      {topics.map((topic, idx) => (
        <div key={topic.id ?? idx} className="grid-12 gap-y-4 py-10 border-t border-line md:py-12">
          <Tag id={topic.id} className={`col-span-full m-0 lg:col-span-4 ${titleClass}`}>
            {topic.title}
          </Tag>
          <div className="col-span-full prose-flow lg:col-span-7 lg:col-start-6">{topic.body}</div>
        </div>
      ))}
    </div>
  )
}

export default TopicRows
