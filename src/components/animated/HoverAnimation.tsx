import './HoverAnimation.css'

import { useState } from 'react'

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
          {/* Fish */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`fish-${i}`} className={`fish fish-${i + 1}`}>
              <div className="fish-body">
                <div className="fish-tail" />
                <div className="fish-fin" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
