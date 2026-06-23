import jellyfish from '@/assets/bubbles/JZ26-Icon-Jellyfish.svg'
import octopus from '@/assets/bubbles/JZ26-Icon-Octopus.svg'
import stingray from '@/assets/bubbles/JZ26-Icon-Stingray.svg'
import turtle from '@/assets/bubbles/JZ26-Icon-Turtle.svg'

const icons = [
  { src: turtle, alt: 'Turtle', left: '12%', size: 60, delay: 0, duration: 80 },
  { src: jellyfish, alt: 'Jellyfish', left: '38%', size: 68, delay: 20, duration: 80 },
  { src: octopus, alt: 'Octopus', left: '63%', size: 56, delay: 40, duration: 80 },
  { src: stingray, alt: 'Stingray', left: '85%', size: 64, delay: 60, duration: 80 },
]

const BubbleIcons = () => {
  return (
    <div className="bubble-simple-container" aria-hidden="true">
      <div className="bubble-simple">
        {icons.map(({ src, alt, left, size, delay, duration }) => (
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

export default BubbleIcons
