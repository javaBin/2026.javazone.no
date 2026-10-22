import { Link } from 'react-router-dom'

import Container from '@/components/layout/Container'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Conference',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Info', href: '/info' },
      { name: 'Tickets', href: '/tickets' },
      { name: 'Previous years', href: '/history' },
    ],
  },
  {
    title: 'Get involved',
    links: [
      { name: 'Speakers', href: '/speaker' },
      { name: 'Partners', href: '/partner' },
      { name: 'Volunteers', href: '/volunteer' },
    ],
  },
  {
    title: 'javaBin',
    links: [
      { name: 'java.no', href: 'https://www.java.no', external: true },
      { name: 'Code of conduct', href: 'https://java.no/principles', external: true },
      { name: 'javazone@java.no', href: 'mailto:javazone@java.no', external: true },
    ],
  },
]

const linkClass = 'text-muted no-underline transition-colors duration-200 ease-standard hover:text-ink hover:underline'

const Footer = () => {
  return (
    <footer className="border-t border-line">
      <Container className="py-12 grid-12 gap-y-10 lg:py-16">
        <div className="col-span-full lg:col-span-6">
          <Link to="/" className="text-xl font-semibold tracking-tight no-underline text-ink hover:text-ink">
            JavaZone
          </Link>
          <p className="max-w-sm mt-3 text-muted">The community-driven developer conference, organized by javaBin.</p>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="col-span-2">
            <h2 className="eyebrow">{column.title}</h2>
            <ul className="p-0 mt-4 space-y-2 list-none">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={linkClass}
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className={linkClass}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="pt-6 text-sm border-t col-span-full border-line text-subtle">Made by javaBin, the Norwegian Java User Group.</p>
      </Container>
    </footer>
  )
}

export default Footer
