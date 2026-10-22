import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import Container from '@/components/layout/Container'

interface NavItem {
  name: string
  href: string
  /** At most one item gets the pill treatment (style.md §5.2). */
  emphasis?: boolean
}

const navLinks: NavItem[] = [
  { name: 'About', href: '/about' },
  { name: 'Info', href: '/info' },
  { name: 'Partners', href: '/partner' },
  { name: 'Speakers', href: '/speaker' },
  { name: 'Volunteers', href: '/volunteer' },
  { name: 'Tickets', href: '/tickets', emphasis: true },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[15px] font-medium text-ink no-underline decoration-1 underline-offset-[6px] transition-colors duration-200 ease-standard hover:text-brand ${
    isActive ? 'underline' : ''
  }`

const pillClass =
  'inline-flex items-center min-h-11 px-5 rounded-full bg-brand text-white text-[15px] font-medium no-underline transition-colors duration-200 ease-standard hover:bg-brand-hover hover:text-white'

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center min-h-14 text-lg font-medium no-underline transition-colors duration-200 ease-standard hover:text-brand ${
    isActive ? 'text-brand' : 'text-ink'
  }`

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    {open ? (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ) : (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    )}
  </svg>
)

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const menuId = useId()

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setIsOpen(false), [pathname])
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header className="relative z-50 border-b border-line bg-canvas">
      <Container className="flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="text-xl font-semibold tracking-tight text-ink no-underline hover:text-ink">
          JavaZone
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 m-0 p-0 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} className={link.emphasis ? pillClass : linkClass}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls={menuId}
          className="lg:hidden inline-flex items-center gap-2 min-h-11 -mr-3 px-3 text-[15px] font-medium text-ink"
        >
          Menu
          <MenuIcon open={isOpen} />
        </button>
      </Container>

      <nav id={menuId} aria-label="Main" hidden={!isOpen} className="lg:hidden absolute inset-x-0 top-full border-b border-line bg-canvas">
        <Container>
          <ul className="m-0 p-0 list-none divide-y divide-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} className={mobileLinkClass}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  )
}

export default Header
