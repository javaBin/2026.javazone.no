import starfishSvg from '@/assets/icons/JZ26-Icon-Starfish-free.svg?raw'

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

const FavoriteButton = ({ sessionId, isFavorite, onToggle }: { sessionId: string; isFavorite: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation()
      onToggle()
    }}
    aria-pressed={isFavorite}
    aria-label="Toggle favorite"
    className={`shrink-0 -m-3 w-11 h-11 favorite-icon transition-opacity ${isFavorite ? '' : 'text-secondary opacity-40 hover:opacity-60'}`}
    style={{ transform: `rotate(${getRotation(sessionId)}deg)` }}
    dangerouslySetInnerHTML={{ __html: starfishSvg }}
  />
)

export default FavoriteButton
