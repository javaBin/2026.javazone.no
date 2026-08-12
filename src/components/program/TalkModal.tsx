import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { CloseIcon } from '@/components/program/icons'
import TalkDetails from '@/components/program/TalkDetails'

// Talk detail as a modal over the program list (background-location routing, see
// AppRoutes) — full-screen on phone, a centered dialog from the sm breakpoint up.
const TalkModal = () => {
  const navigate = useNavigate()
  const close = useCallback(() => void navigate(-1), [navigate])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close])

  // Rendered outside <main> (which has its own `relative z-10` stacking context that
  // would otherwise trap this below the site header, which is `fixed z-50` at the root).
  return createPortal(
    <div role="presentation" onClick={close} className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/60 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full h-full max-w-4xl overflow-y-auto bg-base-200 no-scrollbar sm:h-auto sm:max-h-[85vh] sm:rounded-3xl"
      >
        <div className="px-4 pt-6 pb-10 sm:px-8">
          <TalkDetails
            titleClassName="!text-4xl md:!text-5xl"
            closeControl={
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                title="Close"
                className="p-2 -m-2 rounded-full text-secondary hover:opacity-70"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            }
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default TalkModal
