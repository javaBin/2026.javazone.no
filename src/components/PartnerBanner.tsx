import './PartnerBanner.css'

import { useMemo } from 'react'

import { partners } from '../assets/partners/partners.ts'
import { HoverAnimation } from './animated/HoverAnimation'

export const PartnerBanner = () => {
  const shuffledPartners = useMemo(() => [...partners].sort(() => Math.random() - 0.5), [])

  return (
    <div className="block w-screen p-4 ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] mt-4">
      <div className="flex flex-wrap justify-center gap-10">
        {shuffledPartners.map((partner) => (
          <HoverAnimation key={partner.name}>
            <a target="_blank" href={partner.homepageUrl}>
              <img
                width={10}
                height={10}
                src={partner.logoUrl}
                alt={partner.name}
                className="h-16 w-40 transform transition-transform hover:scale-125"
              />
            </a>
          </HoverAnimation>
        ))}
      </div>
    </div>
  )
}
