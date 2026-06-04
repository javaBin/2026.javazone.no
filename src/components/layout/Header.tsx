// Hamburger menu animation originally written by Tamino Martinius: https://www.sliderrevolution.com/resources/css-hamburger-menu/
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Assets } from '@/Assets'
import { useTheme } from '@/hooks/useTheme'
import useScrollingUp from '@/hooks/useScrollingUp.ts'

const navLinks = [
  // {
  //   name: 'Program',
  //   href: '/program',
  // },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Partners',
    href: '/partner',
  },
  {
    name: 'Speakers',
    href: '/speaker',
  },
  {
    name: 'Volunteers',
    href: '/volunteer',
  },
  {
    name: 'Tickets',
    href: '/tickets',
  },
]

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const Header = () => {
  const scrolled = useScrollingUp()
  const { pathname } = useLocation()
  const isMainPage = pathname === '/'
  const hidden = !isMainPage && !scrolled
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`${hidden ? 'slideUpHeader' : 'fixed top-0 z-50 w-full transition-transform duration-300 ease-in-out translate-y-0'}`}>
      <div className="pointer-events-none absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />
      <div className="relative flex items-center">
        <a
          href="/"
          aria-label="JavaZone home"
          className="flex items-center py-2 px-3 ml-1 rounded-2xl transition-opacity duration-200 hover:opacity-75 no-underline"
        >
          <img src={Assets.images.dukeLogo} alt="JavaZone" className="h-12 w-auto" />
        </a>

        <nav className="flex-wrap px-2 py-4 hidden sm:!flex">
          {navLinks.map((link, id) => (
            <a
              key={id}
              className="px-3 py-2 text-xl font-medium no-underline transition-all duration-200 bg-transparent text-primary sm:text-md md:text-xl md:px-4 rounded-3xl hover:underline hover:bg-transparent"
              href={link.href}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center ml-auto">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Bytt til lys modus' : 'Bytt til mørk modus'}
            className={`flex items-center gap-2 px-3 py-1.5 mr-1 rounded-full border border-primary/50 text-primary text-sm font-medium cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/10 ${theme === 'light' ? 'invisible' : ''}`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span>{theme === 'dark' ? 'Lys modus' : 'Mørk modus'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className={`sm:!hidden hamburger-menu text-primary cursor-pointer transition ${isOpen ? 'is-open' : ''}`}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true" className="w-20 h-20">
              <circle cx="50" cy="50" r="30" />
              <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
              <path className="line--2" d="M0 50h70" />
              <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
            </svg>
          </button>
        </div>
      </div>
      <nav
        inert={!isOpen}
        className={`
          relative w-full sm:!hidden flex-col items-start gap-2 px-4 py-4 -mt-2
          backdrop-blur-lg rounded-b-3xl overflow-hidden transition-all
          duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          [mask-image:linear-gradient(to_top,black_85%,transparent_100%)] !flex
          ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none '}
        `}
      >
        {navLinks.map((link, id) => (
          <a
            key={id}
            className="w-full px-4 py-3 text-lg font-medium no-underline bg-transparent text-primary rounded-xl hover:opacity-90 hover:underline hover:bg-transparent"
            href={link.href}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
