// Small right-pointing line arrow for directional cues (style.md §6). Inherits the text colour.
const ArrowIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`shrink-0 ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

export default ArrowIcon
