import { useLocation } from 'react-router-dom'

const Footer = () => {
  const { pathname } = useLocation()
  const blur = pathname !== '/'

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40">
      <div
        className={`${blur ? 'backdrop-blur-sm' : ''}
                pointer-events-none absolute inset-0
                [mask-image:linear-gradient(to_top,black_75%,transparent_100%)]
                [-webkit-mask-image:linear-gradient(to_top,black_75%,transparent_100%)]`}
      />

      <div className="relative bg-transparent flex justify-center gap-4 p-4 shadow-lg">
        <a
          href="https://www.java.no"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:bg-reef-teal no-underline py-2 px-4 rounded-3xl transition-all duration-200 ease-[ease]"
        >
          Made by javaBin
        </a>
        <a
          href="https://java.no/principles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:bg-reef-teal no-underline py-2 px-4 rounded-3xl transition-all duration-200 ease-[ease]"
        >
          Code of conduct
        </a>
      </div>
    </footer>
  )
}

export default Footer
