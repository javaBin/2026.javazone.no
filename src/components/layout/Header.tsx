// Hamburger menu animation originally written by Tamino Martinius: https://www.sliderrevolution.com/resources/css-hamburger-menu/
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Assets } from '@/Assets'
import { useMotion } from '@/hooks/useMotion'
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
    name: 'Program',
    href: '/program',
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
    name: 'Food',
    href: '/food',
  },
  {
    name: 'Tickets',
    href: '/tickets',
  },
]

const SparklesIcon = () => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)

const Header = () => {
  const scrolled = useScrollingUp()
  const { pathname } = useLocation()
  const isMainPage = pathname === '/'
  const hidden = !isMainPage && !scrolled
  const [isOpen, setIsOpen] = useState(false)
  const { motionEnabled, toggleMotion } = useMotion()

  return (
    <header className={`${hidden ? 'slideUpHeader' : 'fixed top-0 z-50 w-full transition-transform duration-300 ease-in-out translate-y-0'}`}>
      <div className="pointer-events-none absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />
      <div className="relative flex items-center">
        <Link
          to="/"
          aria-label="JavaZone home"
          className="px-3 py-2 no-underline transition-all duration-200 bg-transparent hover:bg-transparent hover:opacity-80 rounded-3xl md:px-4"
        >
          <img src={Assets.images.wordmark} alt="JavaZone" className="h-6 w-auto" />
        </Link>

        <nav className="flex-wrap px-2 py-4 hidden sm:!flex">
          {navLinks.map((link, id) => (
            <Link
              key={id}
              className="px-3 py-2 text-xl font-medium no-underline transition-all duration-200 bg-transparent text-primary sm:text-md md:text-xl md:px-4 rounded-3xl hover:underline hover:bg-transparent"
              to={link.href}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center ml-auto">
          <button
            type="button"
            onClick={toggleMotion}
            aria-label="Toggle animations"
            aria-pressed={motionEnabled}
            className={`flex items-center gap-2 px-3 py-1.5 mr-1 rounded-full border border-primary/50 text-primary text-sm font-medium cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/10 ${motionEnabled ? '' : 'opacity-50'}`}
          >
            <SparklesIcon />
            <span className="hidden sm:inline">Animations</span>
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
          ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none '}
        `}
      >
        {navLinks.map((link, id) => (
          <Link
            key={id}
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 text-lg font-medium no-underline bg-transparent text-primary rounded-xl hover:opacity-90 hover:underline hover:bg-transparent"
            to={link.href}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
