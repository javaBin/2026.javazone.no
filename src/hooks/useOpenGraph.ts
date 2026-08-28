import { useEffect } from 'react'

const DEFAULT_OG_IMAGE = '/og/javazone-2026-og-fallback.png'

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.content = content
}

interface OpenGraphOptions {
  title: string
  description: string
  /** Overrides og:description while leaving the SEO meta description as `description`. Defaults to `description`. */
  ogDescription?: string
  /** Path or URL to an image; resolved against the current origin. Defaults to the site fallback image. */
  image?: string
  /**
   * Set to false to skip updating tags — for content rendered as an overlay (e.g. TalkModal)
   * over a page that already set its own tags, where the background page stays the "real" one.
   */
  enabled?: boolean
}

// This is a client-rendered SPA with no per-route tags baked into index.html, so each page
// sets its own here (document title + description + Open Graph tags in one place, since
// they always change together). No cleanup on unmount: the next page's effect always
// overwrites this before the user sees it, regardless of route-change mount/unmount order.
//
// Caveat: this only updates the DOM after JS runs, so link-unfurlers that don't execute
// JavaScript (Slack, Facebook, iMessage, Twitter/X) will still see index.html's static
// fallback tags rather than the per-page values set here.
export function useOpenGraph({ title, description, ogDescription, image, enabled = true }: OpenGraphOptions) {
  useEffect(() => {
    if (!enabled) return

    document.title = title

    setMetaByName('description', description)
    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', ogDescription ?? description)
    setMetaByProperty('og:url', window.location.href)
    setMetaByProperty('og:image', new URL(image ?? DEFAULT_OG_IMAGE, window.location.origin).toString())
  }, [title, description, ogDescription, image, enabled])
}
