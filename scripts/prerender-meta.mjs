// Runs after `vite build` (see package.json "postbuild"). This app is a client-side SPA with
// no server-side rendering, so link-unfurling bots (Slack, X/Twitter, Facebook, iMessage) never
// execute the JS that sets per-page Open Graph tags (see src/hooks/useOpenGraph.ts) — they only
// ever see dist/index.html's static tags, for every route. This script writes a real
// <route>/index.html for each known static page (from src/data/pageMeta.json) and each current
// program session, with the correct tags baked in, so those bots see the right preview.
//
// Caveat: talk-page files are generated from a live fetch of the sleepingpill API at build time.
// A session added or edited after this build ran won't get a prerendered file until the next
// deploy — it still works fine for real visitors (falls through to the SPA's client-side tags),
// just without a bot-visible preview until then.

import { readFile, writeFile, mkdir } from 'node:fs/promises'

import pageMeta from '../src/data/pageMeta.json' with { type: 'json' }

const DIST_DIR = new URL('../dist/', import.meta.url)
const SESSIONS_URL = 'https://sleepingpill.javazone.no/public/allSessions/javazone_2026'
const FALLBACK_ABSTRACT = (title) => `See the abstract, speakers, room, and time for ${title} at JavaZone 2026.`
const TALK_OG_DESCRIPTION = "You don't want to miss this amazing session!"

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function applyMeta(template, { title, description, ogDescription }) {
  let html = template

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)

  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}"/>`)

  html = html.replace(
    /<meta property="og:description"[^>]*content="[^"]*"\s*\/>/s,
    `<meta property="og:description" content="${escapeHtml(ogDescription ?? description)}"/>`,
  )

  if (/<meta name="description"/.test(html)) {
    html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}"/>`)
  } else {
    html = html.replace(/(<meta property="og:site_name"[^>]*\/>)/, `$1\n    <meta name="description" content="${escapeHtml(description)}"/>`)
  }

  return html
}

function setOgUrl(html, pathname) {
  return html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="https://2026.javazone.no${pathname}"/>`)
}

async function writePage(template, pathname, meta) {
  const html = setOgUrl(applyMeta(template, meta), pathname)
  const dir = new URL(`.${pathname}/`, DIST_DIR)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), html)
}

async function fetchSessions() {
  const res = await fetch(SESSIONS_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (!data || !Array.isArray(data.sessions)) throw new Error('Unexpected response shape')
  return data.sessions.filter((s) => s.title && s.sessionId)
}

async function main() {
  const template = await readFile(new URL('index.html', DIST_DIR), 'utf-8')

  for (const meta of Object.values(pageMeta)) {
    if (meta.path === '/') continue // already dist/index.html itself
    await writePage(template, meta.path, meta)
    console.log(`prerendered ${meta.path}`)
  }

  try {
    const sessions = await fetchSessions()
    for (const session of sessions) {
      const pathname = `/program/${session.sessionId}`
      await writePage(template, pathname, {
        title: `${session.title} | JavaZone 2026`,
        description: session.abstract?.slice(0, 200) || FALLBACK_ABSTRACT(session.title),
        ogDescription: TALK_OG_DESCRIPTION,
      })
    }
    console.log(`prerendered ${sessions.length} program/<id> pages`)
  } catch (err) {
    // Non-fatal: talk pages just keep relying on the client-side tags until the next build.
    console.warn(`prerender-meta: could not prerender program sessions (${err.message}) — skipping, build continues`)
  }
}

await main()
