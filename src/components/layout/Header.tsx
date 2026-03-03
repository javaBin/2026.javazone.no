// Hamburger menu animation originally written by Tamino Martinius: https://www.sliderrevolution.com/resources/css-hamburger-menu/
import { useState } from 'react'

const navLinks = [
  {
    name: 'JavaZone',
    href: '/',
  },
  {
    name: 'History',
    href: '/history',
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
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  console.log('is open?', isOpen)
  return (
    <header className={`fixed top-0 z-50 w-screen`}>
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
              className="bg-transparent text-primary font-semibold no-underline text-xl sm:text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
              href={link.href}
            >
              {link.name}
            </a>
          ))}
        </nav>
        <a
          className="!flex sm:!hidden bg-transparent text-primary font-semibold no-underline text-xl py-2 px-4 ml-2 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
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
      {isOpen ? (
        <nav className="relative w-full !flex sm:!hidden items-start justify-between px-4 pb-8 -mt-4">
          {navLinks.slice(1).map((link, id) => (
            <a
              key={id}
              className="bg-transparent text-primary font-semibold no-underline text-lg py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
              href={link.href}
            >
              {link.name}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

export default Header
