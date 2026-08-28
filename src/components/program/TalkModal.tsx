import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import { CloseIcon } from '@/components/program/icons'
import TalkDetails from '@/components/program/TalkDetails'

const TITLE_ID = 'talk-modal-title'
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

// Talk detail as a modal over the program list (background-location routing, see
// AppRoutes) — full-screen on phone, a centered dialog from the sm breakpoint up.
const TalkModal = () => {
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const close = useCallback(() => void navigate(-1), [navigate])

  // Standard modal dialog behavior: move focus in on open, trap Tab inside while open,
  // and hand focus back to whatever opened the modal (the session card link) on close.
  useEffect(() => {
    triggerRef.current = document.activeElement
    dialogRef.current?.focus()
    return () => {
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close])

  // Rendered outside <main> (which has its own `relative z-10` stacking context that
  // would otherwise trap this below the site header, which is `fixed z-50` at the root).
  return createPortal(
    <div role="presentation" onClick={close} className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/60 sm:items-center sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full h-full max-w-4xl overflow-y-auto bg-base-200 no-scrollbar outline-none sm:h-auto sm:max-h-[85vh] sm:rounded-3xl"
      >
        <div className="px-4 pt-6 pb-10 sm:px-8">
          <TalkDetails
            titleId={TITLE_ID}
            titleClassName="!text-4xl md:!text-5xl"
            updatePageMeta={false}
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
