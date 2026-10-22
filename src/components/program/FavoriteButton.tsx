import starSvg from '@/assets/icons/star.svg?raw'

const ROTATION_MIN = -10
const ROTATION_MAX = 35

// Deterministic per-session tilt so each card's star sits at a slightly different angle,
// but stays stable across re-renders and favorite toggles.
function getRotation(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  const range = ROTATION_MAX - ROTATION_MIN
  return ROTATION_MIN + (Math.abs(hash) % (range + 1))
}

// The star icon itself — favorited is filled, unfavorited is an outline,
// both in whatever text color the caller applies.
export const FavoriteStarIcon = ({
  sessionId,
  isFavorite,
  className = 'w-11 h-11',
}: {
  sessionId: string
  isFavorite: boolean
  className?: string
}) => (
  <span
    aria-hidden="true"
    data-favorite={isFavorite}
    className={`favorite-icon inline-block shrink-0 ${className}`}
    style={{ transform: `rotate(${getRotation(sessionId)}deg)` }}
    dangerouslySetInnerHTML={{ __html: starSvg }}
  />
)

const SIZE_CLASSES = {
  sm: { button: 'shrink-0 -m-1.5 w-7 h-7', icon: 'w-7 h-7' },
  md: { button: 'shrink-0 -m-3 w-11 h-11', icon: 'w-11 h-11' },
} as const

const FavoriteButton = ({
  sessionId,
  isFavorite,
  onToggle,
  size = 'md',
}: {
  sessionId: string
  isFavorite: boolean
  onToggle: () => void
  size?: keyof typeof SIZE_CLASSES
}) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation()
      onToggle()
    }}
    aria-pressed={isFavorite}
    aria-label={isFavorite ? 'Remove from my schedule' : 'Add to my schedule'}
    title={isFavorite ? 'Remove from my schedule' : 'Add to my schedule'}
    className={`${SIZE_CLASSES[size].button} group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand`}
  >
    <FavoriteStarIcon
      sessionId={sessionId}
      isFavorite={isFavorite}
      className={`favorite-icon--card ${SIZE_CLASSES[size].icon} transition-opacity ${isFavorite ? '' : 'text-ink opacity-70 group-hover:opacity-90'}`}
    />
  </button>
)

export default FavoriteButton
