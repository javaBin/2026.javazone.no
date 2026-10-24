import { useMemo } from 'react'

import { partners } from '../assets/partners/partners.ts'

// Partner logos in a quiet hairline grid. Renders nothing until partners are added.
export const PartnerBanner = () => {
  const shuffledPartners = useMemo(() => [...partners].sort(() => Math.random() - 0.5), [])

  if (shuffledPartners.length === 0) return null

  return (
    <ul className="grid grid-cols-2 m-0 p-0 list-none border-t border-l border-line md:grid-cols-4 lg:grid-cols-6">
      {shuffledPartners.map((partner) => (
        <li key={partner.name} className="border-r border-b border-line">
          <a
            target="_blank"
            href={partner.homepageUrl}
            rel="noopener noreferrer"
            className="flex items-center justify-center h-28 p-6 transition-opacity duration-200 ease-standard hover:opacity-70"
          >
            <img src={partner.logoUrl} alt={partner.name} className="max-h-12 w-full object-contain" loading="lazy" />
          </a>
        </li>
      ))}
    </ul>
  )
}
