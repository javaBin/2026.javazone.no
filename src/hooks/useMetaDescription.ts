import { useEffect } from 'react'

// This is a client-rendered SPA with no per-route <meta name="description"> baked into
// index.html, so each page sets its own here. No cleanup on unmount: the next page's
// effect always overwrites this before the user sees it, regardless of the order React
// Router mounts/unmounts pages during a route change.
export function useMetaDescription(description: string) {
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
  }, [description])
}
