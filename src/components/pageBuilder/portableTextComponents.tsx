import type { PortableTextReactComponents } from '@portabletext/react'

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold text-primary mt-8 mb-4 first:mt-0">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-primary mt-7 mb-3 first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold text-primary mt-6 mb-3 first:mt-0">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold text-base-content mt-5 mb-2 first:mt-0">{children}</h4>,
    normal: ({ children }) => <p className="leading-relaxed text-base-content mb-4 last:mb-0">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-base-content/70 my-4">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const link = value as { href?: string; blank?: boolean } | null
      return (
        <a
          href={link?.href ?? '#'}
          target={link?.blank ? '_blank' : undefined}
          rel={link?.blank ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-5 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-5 mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base-content">{children}</li>,
    number: ({ children }) => <li className="text-base-content">{children}</li>,
  },
}
