// Based on code from https://codepen.io/goodkatz/pen/LYPGxQz
import '@/components/animated/wave/WaveBackground.css'

import { Assets } from '@/Assets.ts'

const WaveBackground = () => {
  return (
    <div className="wave-container">
      <img src={Assets.images.cityscape} width={'100%'} className="wave-container__bg-image" alt="Decorative background image of cityscape" />
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        overflow="visible"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          <linearGradient id="wave-gradient" gradientUnits="userSpaceOnUse" x1={0} y1={24} x2={0} y2={52}>
            <stop offset="0%" stopColor="var(--blue-lagoon)" stopOpacity={0.3} />
            <stop offset="10%" stopColor="var(--reef-teal)" />
            <stop offset="30%" stopColor="#11586e" />
            <stop offset="100%" stopColor="var(--deep-ocean)" />
          </linearGradient>

          <linearGradient id="crest-highlight" x1="100%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--blue-lagoon)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--reef-teal)" stopOpacity={0.1} />
          </linearGradient>

          <filter id="glow" filterUnits="userSpaceOnUse" x={-200} y={0} width={600} height={100}>
            <feGaussianBlur stdDeviation={1.5} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="parallax">
          <use className="wave1" xlinkHref="#gentle-wave" x={48} y={0} fill="url(#wave-gradient)" />
          <use
            className="crest crest1"
            xlinkHref="#gentle-wave"
            x={48}
            y={0}
            fill="none"
            stroke="url(#crest-highlight)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <use className="wave2" xlinkHref="#gentle-wave" x={48} y={3} fill="url(#wave-gradient)" />
          <use
            className="crest crest2"
            xlinkHref="#gentle-wave"
            x={48}
            y={3}
            fill="none"
            stroke="url(#crest-highlight)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <use className="wave3" xlinkHref="#gentle-wave" x={48} y={5} fill="url(#wave-gradient)" />
          <use
            className="crest crest3"
            xlinkHref="#gentle-wave"
            x={48}
            y={5}
            fill="none"
            stroke="url(#crest-highlight)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <use className="wave4" xlinkHref="#gentle-wave" x={48} y={7} fill="url(#wave-gradient)" />

          <use
            className="crest crest4"
            xlinkHref="#gentle-wave"
            x={48}
            y={7}
            fill="none"
            stroke="url(#crest-highlight)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </g>
      </svg>
    </div>
  )
}

export default WaveBackground
