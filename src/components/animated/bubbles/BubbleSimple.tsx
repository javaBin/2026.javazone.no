import './BubbleSimple.css'
import jellyfish from '@/assets/bubbles/JZ26-Icon-Jellyfish.svg'
import lobster from '@/assets/bubbles/JZ26-Icon-Lobster.svg'
import octopus from '@/assets/bubbles/JZ26-Icon-Octopus.svg'
import shark from '@/assets/bubbles/JZ26-Icon-Shark.svg'
import starfish from '@/assets/bubbles/JZ26-Icon-Starfish.svg'
import stingray from '@/assets/bubbles/JZ26-Icon-Stingray.svg'
import tropicalFish from '@/assets/bubbles/JZ26-Icon-TropicalFish.svg'
import turtle from '@/assets/bubbles/JZ26-Icon-Turtle.svg'

const iconBubbles = [
  { src: jellyfish,   alt: 'Jellyfish',    left: '8%',  size: 72, delay: 5,  duration: 22 },
  { src: lobster,     alt: 'Lobster',      left: '22%', size: 60, delay: 14, duration: 30 },
  { src: octopus,     alt: 'Octopus',      left: '42%', size: 76, delay: 2,  duration: 20 },
  { src: shark,       alt: 'Shark',        left: '58%', size: 64, delay: 19, duration: 35 },
  { src: starfish,    alt: 'Starfish',     left: '78%', size: 56, delay: 8,  duration: 26 },
  { src: stingray,    alt: 'Stingray',     left: '33%', size: 70, delay: 24, duration: 38 },
  { src: tropicalFish, alt: 'Tropical fish', left: '68%', size: 58, delay: 11, duration: 24 },
  { src: turtle,      alt: 'Turtle',       left: '88%', size: 66, delay: 0,  duration: 28 },
]

const BubbleSimple = () => {
  return (
    <div className="bubble-simple-container" aria-hidden="true">
      <div className="bubble-simple">
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        <span className="bubble" />
        {iconBubbles.map(({ src, alt, left, size, delay, duration }) => (
          <span
            key={alt}
            className="bubble bubble-icon"
            style={{
              left,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <img src={src} alt={alt} width={size} height={size} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default BubbleSimple
