import { type CSSProperties, type TouchEvent, useEffect, useRef, useState } from 'react'

import bubbleIcon from '@/assets/icons/JZ26-Icon-Bubble1.svg'
import { BubbleField, Card, Heading } from '@/components'
import menuData from '@/data/menuData.json'
import { useMetaDescription } from '@/hooks/useMetaDescription'

interface MenuItem {
  name: string
  description: string | null
  allergens: string[]
}

interface MenuSection {
  label: string | null
  items: MenuItem[]
}

interface MenuVendor {
  name: string
  anchor: string | null
  company?: string
  sections: MenuSection[]
}

interface MenuData {
  title: string
  vendors: MenuVendor[]
}

const menu = menuData as MenuData

// QR codes printed for the stands only cover some vendors (anchor set in menuData.json).
// Vendors without a printed code still need an in-page id to be a valid anchor target.
const slugify = (name: string) =>
  name.replace(/\s+/g, '').replace(/^(.)(.*)$/, (_, first: string, rest: string) => first.toUpperCase() + rest.toLowerCase())

const vendorId = (vendor: MenuVendor) => vendor.anchor ?? slugify(vendor.name)

// All vendor cards share the same dark fill (matches the last card of the old gradient
// sweep) so contrast with the light text stays consistent from the first card down.
const CARD_COLOR = '#08345e'

// Vendors with a day-specific menu only ever split into these two sections. Default the
// carousel to whichever day is current: Wednesday's menu until the conference's Thursday
// begins, then Thursday's for the rest of the event (and afterwards).
const CONFERENCE_DAY_TWO = new Date('2026-09-03T00:00:00')
const DEFAULT_MENU_DAY = new Date() >= CONFERENCE_DAY_TWO ? 'Thursday' : 'Wednesday'

// Bob durations cycled across cards so the bubbles don't all move in lockstep down the page.
const BUBBLE_DURATIONS = ['4.4s', '5.2s', '6s']

// How long the pop animation (bf-pop + bf-ripple-expand, both defined in BubbleField.css)
// takes to play before the (now empty) bubble is removed for good.
const POP_DURATION_MS = 700

// The bobbing bubble icon in each food card's corner — clicking it pops it, reusing the
// same pop/ripple visuals as the ambient background bubbles. Once popped it stays gone
// for the rest of the page's lifetime; only a reload brings it back.
const FoodCardBubble = ({ duration, delay, className }: { duration: string; delay?: string; className: string }) => {
  const [state, setState] = useState<'idle' | 'popping' | 'gone'>('idle')

  useEffect(() => {
    if (state !== 'popping') return
    const timeout = setTimeout(() => setState('gone'), POP_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [state])

  if (state === 'gone') return null

  return (
    <span aria-hidden="true" className={`absolute pointer-events-none ${className}`}>
      <span className="relative block w-full h-full">
        {state === 'popping' ? (
          <>
            <span className="bf__pop-ghost absolute inset-0 block w-full h-full">
              <img src={bubbleIcon} alt="" className="block w-full h-full" />
            </span>
            <span className="bf__ripple absolute inset-0 block w-full h-full" />
          </>
        ) : (
          <img
            src={bubbleIcon}
            alt=""
            onClick={() => setState('popping')}
            className="food-card-bubble block w-full h-full"
            style={{ '--bubble-duration': duration, '--bubble-delay': delay } as CSSProperties}
          />
        )}
      </span>
    </span>
  )
}

const DayDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 my-6 first:mt-0">
    <span aria-hidden="true" className="flex-1 h-px bg-tertiary/60" />
    <span className="text-xs font-bold tracking-widest uppercase text-accent-primary md:text-sm">{label}</span>
    <span aria-hidden="true" className="flex-1 h-px bg-tertiary/60" />
  </div>
)

const MenuItemList = ({ items }: { items: MenuItem[] }) => (
  <dl className="space-y-8">
    {items.map((item, itemIndex) => (
      <div key={itemIndex} className="space-y-1 text-center">
        <h3 className="text-2xl font-semibold leading-snug text-primary md:text-2xl">{item.name}</h3>
        {item.description && <p className="text-base text-center text-secondary md:text-lg">{item.description}</p>}
        {item.allergens.length > 0 && <p className="text-sm text-center text-tertiary">(Allergens: {item.allergens.join(', ')})</p>}
      </div>
    ))}
  </dl>
)

// Minimum horizontal drag (px) before a touch gesture counts as a swipe rather than a tap
// or an incidental wobble while scrolling.
const SWIPE_THRESHOLD_PX = 40

// Menu carousel for vendors serving a different menu per conference day: one tab per
// section.label, showing only the active day's items. Swipeable on touch devices in
// addition to the tabs, so it behaves like an actual carousel on phones.
const MenuDayCarousel = ({ vendorName, sections }: { vendorName: string; sections: MenuSection[] }) => {
  const defaultIndex = Math.max(
    sections.findIndex((s) => s.label === DEFAULT_MENU_DAY),
    0,
  )
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const touchStartX = useRef<number | null>(null)

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current
    touchStartX.current = null
    if (startX === null) return

    const deltaX = e.changedTouches[0].clientX - startX
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return

    const direction = deltaX < 0 ? 1 : -1
    setActiveIndex((i) => Math.min(Math.max(i + direction, 0), sections.length - 1))
  }

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div role="tablist" aria-label={`${vendorName} menu day`} className="flex justify-center gap-2 mt-4 mb-6">
        {sections.map((section, index) => (
          <button
            key={section.label}
            role="tab"
            aria-selected={activeIndex === index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
              activeIndex === index ? 'bg-accent-primary text-base-300' : 'bg-base-100/40 text-secondary hover:text-primary'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
      <MenuItemList items={sections[activeIndex].items} />
    </div>
  )
}

const VendorSection = ({ vendor, index }: { vendor: MenuVendor; index: number }) => {
  const id = vendorId(vendor)
  const headingId = `${id}-heading`
  const hasDayMenus = vendor.sections.length > 1
  const bubbleDurationA = BUBBLE_DURATIONS[index % BUBBLE_DURATIONS.length]
  const bubbleDurationB = BUBBLE_DURATIONS[(index + 1) % BUBBLE_DURATIONS.length]

  return (
    <section id={id} aria-labelledby={headingId} className="relative px-4 py-2 text-center scroll-mt-20 md:py-10 md:scroll-mt-32">
      <Card title="" className="w-full max-w-2xl mx-auto food-card" gradientColors={[CARD_COLOR, CARD_COLOR]}>
        <FoodCardBubble duration={bubbleDurationA} className="top-4 right-5 w-8 h-8 md:top-5 md:right-6 md:w-10 md:h-10" />
        <FoodCardBubble duration={bubbleDurationB} delay="0.6s" className="top-14 right-10 w-5 h-5 md:top-16 md:right-14 md:w-6 md:h-6" />
        <h2 id={headingId} className="text-4xl font-bold leading-tight text-center text-primary md:text-4xl">
          {vendor.name}
        </h2>

        {hasDayMenus ? (
          <MenuDayCarousel vendorName={vendor.name} sections={vendor.sections} />
        ) : (
          vendor.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.label && <DayDivider label={section.label} />}
              <MenuItemList items={section.items} />
            </div>
          ))
        )}
      </Card>
    </section>
  )
}

const FoodPage = () => {
  useMetaDescription('The full JavaZone 2026 food menu — every food stand and food truck, with dish descriptions and allergen info.')

  return (
    <div className="relative">
      <BubbleField variant="subtle" />

      <header className="relative z-10 flex flex-col items-center gap-2 px-6 pt-24 pb-6 text-center">
        <Heading level="h1">{menu.title}</Heading>
      </header>

      <div className="relative z-20 pb-16 food-card-list">
        {menu.vendors.map((vendor, index) => (
          <VendorSection key={vendor.name} vendor={vendor} index={index} />
        ))}
      </div>
    </div>
  )
}

export default FoodPage
