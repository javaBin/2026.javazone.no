// Hamburger menu animation originally written by Tamino Martinius: https://www.sliderrevolution.com/resources/css-hamburger-menu/
import { useState } from 'react'

const navLinks = [
  {
    name: 'JavaZone',
    href: '/',
  },
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className={`fixed top-0 z-50 w-full`}>
      <div
        className="
                pointer-events-none absolute inset-0 backdrop-blur-sm
                [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]
            "
      />
      <div className="relative flex items-center">
        <nav className="flex-wrap px-2 py-4 mx-auto sm:mx-0 hidden sm:!flex">
          {navLinks.map((link, id) => (
            <a
              key={id}
              className="px-3 py-2 text-xl font-semibold no-underline transition-transform duration-200 bg-transparent text-primary sm:text-md md:text-xl md:px-4 rounded-3xl hover:text-accent-secondary hover:bg-transparent"
              href={link.href}
            >
              {link.name}
            </a>
          ))}
        </nav>
        <a
          className="!flex sm:!hidden bg-transparent text-primary font-semibold no-underline text-xl py-2 px-4 ml-2 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:text-accent-secondary hover:bg-transparent"
          href="/"
        >
          JavaZone
        </a>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className={`sm:!hidden ml-auto hamburger-menu text-primary cursor-pointer transition ${isOpen ? 'is-open' : ''}`}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true" className="w-20 h-20">
            <circle cx="50" cy="50" r="30" />
            <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
            <path className="line--2" d="M0 50h70" />
            <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
          </svg>
        </button>
      </div>
      <nav
        className={`
          relative w-full sm:!hidden flex-col items-start gap-2 px-4 py-4 -mt-2
          backdrop-blur-lg rounded-b-3xl overflow-hidden transition-all 
          duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
          [mask-image:linear-gradient(to_top,black_85%,transparent_100%)]
          ${isOpen ? 'max-h-[400px] opacity-100 !flex' : 'max-h-0 opacity-0 pointer-events-none'}
        `}
      >
        {navLinks.slice(1).map((link, id) => (
          <a
            key={id}
            className={`
              w-full px-4 py-3 text-lg font-semibold no-underline
              bg-transparent text-primary rounded-xl
              hover:opacity-90 hover:text-accent-secondary hover:bg-transparent
              ${isOpen ? 'translate-y-0 opacity-100' : 'flex col-auto'}
            `}
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
