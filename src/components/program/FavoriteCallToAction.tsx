import { FavoriteStarfishIcon } from '@/components/program/FavoriteButton'

// A more prominent favorite toggle for the talk detail page — pairs the starfish with an
// explicit label so it reads as a call to action instead of a small icon-only affordance.
const FavoriteCallToAction = ({ sessionId, isFavorite, onToggle }: { sessionId: string; isFavorite: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={isFavorite}
    className={`relative inline-flex items-center justify-end w-52 h-14 pl-2 pr-14 text-xs font-semibold whitespace-nowrap bg-transparent transition-colors sm:w-72 sm:h-24 sm:pr-24 sm:text-sm ${
      isFavorite ? 'text-accent-primary' : 'text-primary hover:text-accent-primary hover:underline'
    }`}
  >
    {isFavorite ? 'Added to my schedule' : 'Add to my schedule'}
    <FavoriteStarfishIcon
      sessionId={sessionId}
      isFavorite={isFavorite}
      className={`absolute right-0 inset-y-0 my-auto w-11 h-11 sm:w-20 sm:h-20 ${isFavorite ? '' : 'text-secondary'}`}
    />
  </button>
)

export default FavoriteCallToAction
