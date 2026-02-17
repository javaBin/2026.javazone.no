// Based on code from https://codepen.io/goodkatz/pen/LYPGxQz
import '@/components/animated/wave/WaveBackground.css'

const layers = [
  { cls: 'wave1', y: 0, crest: 'crest1', opacity: 0.5 },
  { cls: 'wave2', y: 3, crest: 'crest2', opacity: 0.4 },
  { cls: 'wave3', y: 5, crest: 'crest3', opacity: 0.3 },
  { cls: 'wave4', y: 7, crest: 'crest4', opacity: 0.2 },
]

const WaveBackground = () => {
  return (
    <div className="wave-container">
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

          <linearGradient id="crest-highlight" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={150} y2={0}>
            <stop offset="0%" stopColor="var(--sea-mist)" stopOpacity={0.12} />
            <stop offset="55%" stopColor="var(--sea-mist)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--reef-teal)" stopOpacity={0.35} />
          </linearGradient>

          <mask id="crest-mask" maskUnits="userSpaceOnUse" x={0} y={24} width={150} height={28}>
            <rect x={0} y={24} width={150} height={28} fill="url(#crest-fade)" />
          </mask>

          <linearGradient id="crest-fade" gradientUnits="userSpaceOnUse" x1={0} y1={34} x2={0} y2={52}>
            <stop offset="0%" stopColor="var(--sea-mist)" stopOpacity={1} />
            <stop offset="55%" stopColor="var(--sea-mist)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--reef-teal)" stopOpacity={0} />
          </linearGradient>

          <filter id="glow" filterUnits="userSpaceOnUse" x={-200} y={0} width={600} height={200}>
            <feGaussianBlur stdDeviation={1.5} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="parallax">
          {layers.map(({ cls, y, crest, opacity }) => (
            <g key={cls}>
              <use key={`${cls}-wave`} className={cls} xlinkHref="#gentle-wave" x={48} y={y} fill="url(#wave-gradient)" />
              <use
                key={`${cls}-crest`}
                className={crest}
                xlinkHref="#gentle-wave"
                x={48}
                y={y}
                fill="none"
                stroke="url(#crest-highlight)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                mask="url(#crest-mask)"
                filter="url(#glow)"
                opacity={opacity}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default WaveBackground
