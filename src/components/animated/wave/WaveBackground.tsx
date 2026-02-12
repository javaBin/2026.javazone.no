// Based on code from https://codepen.io/goodkatz/pen/LYPGxQz
import '@/components/animated/wave/WaveBackground.css'

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
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          <linearGradient id="wave-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="0" y2="52">
            <stop offset="0%" stopColor="#bee8e6" opacity="0.25" />
            <stop offset="5%" stopColor="#57c4d1" opacity="0.25" />
            <stop offset="20%" stopColor="#0f6c77" />
            <stop offset="50%" stopColor="#0b3554" />
            <stop offset="100%" stopColor="#071a2b" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="parallax">
          <use className="wave1" xlinkHref="#gentle-wave" x="48" y="0" fill="url(#wave-gradient)" />
          <use className="wave2" xlinkHref="#gentle-wave" x="48" y="3" fill="url(#wave-gradient)" />
          <use className="wave3" xlinkHref="#gentle-wave" x="48" y="5" fill="url(#wave-gradient)" />
          <use className="wave4" xlinkHref="#gentle-wave" x="48" y="7" fill="url(#wave-gradient)" />
        </g>
      </svg>
    </div>
  )
}
/*const WaveBackground = () => {
  return (
    <div className="wave-container">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use className="wave1" xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(7,26,43,0.7)" />
          <use className="wave2" xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(7,26,43,0.5)" />
          <use className="wave3" xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(7,26,43,0.3)" />
          <use className="wave4" xlinkHref="#gentle-wave" x="48" y="7" fill="#071A2B" />
        </g>
      </svg>
    </div>
  )
}*/

export default WaveBackground
