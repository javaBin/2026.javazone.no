const MAX_VISIBLE = 4
// No layout measurement here — just a rough per-tag character budget for staying on one
// line. Long keywords eat into it fast, so a run of long tags can leave room for as few as 1-2.
// No "+N" pill to reserve space for either, so the budget can run a bit more generous.
const MAX_COMBINED_LENGTH = 50

// Keeps the row to a single line: greedily add tags while they fit the budget, always
// including at least the first one however long, instead of letting the rest wrap.
function pickVisibleCount(keywords: string[]): number {
  let combinedLength = 0
  let count = 0

  for (const keyword of keywords) {
    if (count >= MAX_VISIBLE) break
    const nextLength = combinedLength + keyword.length
    if (count > 0 && nextLength > MAX_COMBINED_LENGTH) break
    combinedLength = nextLength
    count++
  }

  return count
}

const KeywordTags = ({ keywords }: { keywords: string[] }) => {
  if (!keywords.length) return null

  const visible = keywords.slice(0, pickVisibleCount(keywords))

  return (
    <div className="flex mt-auto gap-1.5 overflow-hidden flex-nowrap">
      {visible.map((keyword) => (
        <span key={keyword} className="px-2 py-0.5 text-[11px] rounded-full bg-base-100/40 text-secondary whitespace-nowrap shrink-0">
          {keyword}
        </span>
      ))}
    </div>
  )
}

export default KeywordTags
