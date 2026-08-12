import { formatKeywordTag } from '@/lib/program'

const DEFAULT_MAX_VISIBLE = 4
// No layout measurement here — just a rough per-tag character budget for staying on one
// line. Long keywords eat into it fast, so a run of long tags can leave room for as few as 1-2.
// No "+N" pill to reserve space for either, so the budget can run a bit more generous.
const DEFAULT_MAX_COMBINED_LENGTH = 44

// Keeps the row to a single line: greedily add tags while they fit the budget. By default
// the first tag is shown however long it is (so a card never shows zero tags), but callers
// with a hard width limit (e.g. a narrow timetable block) can turn that off so an oversized
// first tag is dropped, like any other tag, instead of being forced in over budget.
function pickVisibleCount(tags: string[], maxVisible: number, maxCombinedLength: number, alwaysShowFirst: boolean): number {
  let combinedLength = 0
  let count = 0

  for (const tag of tags) {
    if (count >= maxVisible) break
    const nextLength = combinedLength + tag.length
    if (nextLength > maxCombinedLength && !(alwaysShowFirst && count === 0)) break
    combinedLength = nextLength
    count++
  }

  return count
}

const KeywordTags = ({
  keywords,
  maxVisible = DEFAULT_MAX_VISIBLE,
  maxCombinedLength = DEFAULT_MAX_COMBINED_LENGTH,
  alwaysShowFirst = true,
}: {
  keywords: string[]
  maxVisible?: number
  maxCombinedLength?: number
  alwaysShowFirst?: boolean
}) => {
  if (!keywords.length) return null

  const tags = keywords.map(formatKeywordTag)
  const visible = tags.slice(0, pickVisibleCount(tags, maxVisible, maxCombinedLength, alwaysShowFirst))

  return (
    <div className="flex mt-auto gap-1.5 overflow-hidden flex-nowrap">
      {visible.map((tag) => (
        <span key={tag} className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-base-100/60 text-primary whitespace-nowrap shrink-0">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default KeywordTags
