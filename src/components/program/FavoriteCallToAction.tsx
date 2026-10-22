import { FavoriteStarIcon } from '@/components/program/FavoriteButton'

// A more prominent favorite toggle for the talk detail page — pairs the star with an
// explicit label so it reads as a call to action instead of a small icon-only affordance.
const FavoriteCallToAction = ({ sessionId, isFavorite, onToggle }: { sessionId: string; isFavorite: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={isFavorite}
    title={isFavorite ? 'Remove from my schedule' : 'Add to my schedule'}
    className={`relative inline-flex items-center justify-end w-52 h-14 pl-2 pr-14 text-xs font-semibold whitespace-nowrap bg-transparent transition-colors outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-brand sm:w-72 sm:h-24 sm:pr-24 sm:text-sm ${
      isFavorite ? 'text-brand' : 'text-ink hover:text-brand hover:underline'
    }`}
  >
    {isFavorite ? 'Added to my schedule' : 'Add to my schedule'}
    <FavoriteStarIcon
      sessionId={sessionId}
      isFavorite={isFavorite}
      className={`favorite-icon--cta absolute right-0 inset-y-0 my-auto ${
        isFavorite ? 'w-11 h-11 sm:w-20 sm:h-20' : 'w-9 h-9 text-muted sm:w-16 sm:h-16 mr-1'
      }`}
    />
  </button>
)

export default FavoriteCallToAction
