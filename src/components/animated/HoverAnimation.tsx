import './HoverAnimation.css'

import { useState } from 'react'

import jellySwim from '../../assets/jellySwim.gif'

interface HoverAnimationProps {
  children: React.ReactNode
}

export const HoverAnimation = ({ children }: HoverAnimationProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="hover-animation-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && (
        <div className="animation-wrapper">
          {/* Bubbles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`bubble-${i}`} className={`bubble bubble-${i + 1}`} />
          ))}
          {/* Jellyfish */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`jellyfish-${i}`} className={`jellyfish jellyfish-${i + 1}`}>
              <img src={jellySwim} alt="jellyfish" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
