const Header = () => {
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
        <div className="flex flex-wrap px-2 mx-auto sm:mx-0">
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
          {/*todo: fix hamburger menu*/}
          <a
            className="hidden bg-transparent text-primary font-semibold no-underline text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform duration-200 hover:opacity-90 hover:bg-base-300"
            href={'/volunteer'}
          >
            Volunteers
          </a>
        </div>
        <div className="absolute right-0 top-0 p-4 flex items-center justify-center">
          <h1 className="text-transparent sm:text-primary font-semibold text-md md:text-xl py-2">JavaZone</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
