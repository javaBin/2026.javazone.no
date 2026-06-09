import { useLocation } from 'react-router-dom'

import { useTheme } from '@/hooks/useTheme'

const Footer = () => {
  const { pathname } = useLocation()
  const blur = pathname !== '/' && pathname !== '/test'
  const { theme, setTheme } = useTheme()

  return (
    <footer className="relative w-full z-40 mt-8">
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
          className="text-primary hover:underline hover:bg-transparent no-underline py-2 px-4 rounded-3xl transition-all duration-200 ease-[ease]"
        >
          Made by javaBin
        </a>
        <a
          href="https://java.no/principles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline hover:bg-transparent no-underline py-2 px-4 rounded-3xl transition-all duration-200 ease-[ease]"
        >
          Code of conduct
        </a>
        {theme === 'light' && (
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setTheme('dark')}
            className="absolute right-0 bottom-0 w-8 h-8 opacity-0 cursor-default"
          />
        )}
      </div>
    </footer>
  )
}

export default Footer
