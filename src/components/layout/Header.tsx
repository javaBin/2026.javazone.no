import { useState } from 'react'

import { Assets } from '@/Assets.ts'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  console.log('is open?', isOpen)
  return (
    <header className="fixed top-0 z-50 w-screen">
      <div
        className="
                pointer-events-none absolute inset-0 backdrop-blur-sm
                [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]
                [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]
            "
      />
      <div className="relative flex p-4">
        <nav className="flex-wrap px-2 mx-auto sm:mx-0 hidden sm:!flex">
          <a
            className="bg-transparent text-primary font-semibold no-underline text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
            href={'/'}
          >
            Info
          </a>
          <a
            className="bg-transparent text-primary font-semibold no-underline text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
            href={'/history'}
          >
            History
          </a>
          <a
            className="bg-transparent text-primary font-semibold no-underline text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
            href={'/partner'}
          >
            Partners
          </a>
          <a
            className="bg-transparent text-primary font-semibold no-underline text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
            href={'/speaker'}
          >
            Speakers
          </a>
          <a
            className="bg-transparent text-primary font-semibold no-underline text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
            href={'/volunteer'}
          >
            Volunteers
          </a>
        </nav>
        <h1 className="ml-auto hidden sm:!flex text-primary font-semibold text-md md:text-xl p-2">JavaZone</h1>
        <button type="button" onClick={() => setIsOpen((v) => !v)} aria-label="Toggle menu" className="!flex sm:!hidden items-start ml-auto px-2">
          <img
            src={Assets.icons.waves.src}
            alt="Menu"
            title={`${Assets.icons.waves.attribute} (${Assets.icons.waves.license})`}
            className="w-10 h-10"
          />
        </button>
      </div>
    </header>
  )
}

export default Header
