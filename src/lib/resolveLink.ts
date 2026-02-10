interface ResolvedLink {
  href: string
  isExternal: boolean
}

export const resolveLink = (input: string): ResolvedLink => {
  try {
    const url = new URL(input, window.location.origin)

    const protocolOk = url.protocol === 'http:' || url.protocol === 'https:'
    if (!protocolOk) {
      return { href: '#', isExternal: false }
    }

    const isExternal = url.origin !== window.location.origin

    return {
      href: url.href,
      isExternal,
    }
  } catch {
    return { href: '#', isExternal: false }
  }
}
