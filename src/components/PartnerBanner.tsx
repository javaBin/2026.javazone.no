import { useMemo } from 'react'

import { partners } from '../assets/partners/partners.ts'
import { HoverAnimation } from './animated/HoverAnimation'

export const PartnerBanner = () => {
  const shuffledPartners = useMemo(() => [...partners].sort(() => Math.random() - 0.5), [])

  return (
    <div className="block w-screen p-4 ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] mt-4">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
        {shuffledPartners.map((partner) => (
          <HoverAnimation key={partner.name}>
            <a target="_blank" href={partner.homepageUrl} rel="noopener noreferrer">
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-16 w-40 object-contain transition-transform hover:scale-125"
                loading="lazy"
              />
            </a>
          </HoverAnimation>
        ))}
      </div>
    </div>
  )
}
