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
        <div className="flex px-2 mx-auto sm:mx-0">
          <a
            className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90"
            href={'/'}
          >
            Info
          </a>
          <a
            className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90"
            href={'/history'}
          >
            History
          </a>
          <a
            className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90"
            href={'/partner'}
          >
            Partners
          </a>
          <a
            className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90"
            href={'/speaker'}
          >
            Speakers
          </a>
          {/* <a
            className="btn-ghost font-semibold text-md md:text-xl py-2 px-3 md:px-4 rounded-3xl transition-transform transition-opacity duration-200 hover:opacity-90"
            href={'/volunteer'}
          >
            Volunteer
          </a> */}
        </div>
        <div className="flex-none ml-auto px-2 hidden sm:flex items-center justify-center">
          <h1 className="font-bold">JavaZone</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
