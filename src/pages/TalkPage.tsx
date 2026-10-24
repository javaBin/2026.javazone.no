import { Link } from 'react-router-dom'

import arrowLeftSvg from '@/assets/icons/arrow-left.svg?raw'
import TalkDetails from '@/components/program/TalkDetails'

// ── TalkPage ──────────────────────────────────────────────────────────────────
// Full-page presentation, used for direct navigation and deep links. When opened
// from within the app (e.g. clicking a session card), TalkModal is used instead.
// TalkDetails itself sets the page's Open Graph tags once the session data loads.

const TalkPage = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 lg:pt-16">
      <div className="max-w-3xl px-4 mx-auto md:px-8">
        <div className="pt-2 pb-8 sm:pt-6">
          <TalkDetails
            closeControl={
              <Link
                to="/program"
                aria-label="Back to program"
                title="Back to program"
                className="inline-block p-2 -m-4 no-underline back-link text-muted hover:opacity-70"
              >
                <span aria-hidden="true" className="w-18 h-18 back-arrow-icon" dangerouslySetInnerHTML={{ __html: arrowLeftSvg }} />
              </Link>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default TalkPage
