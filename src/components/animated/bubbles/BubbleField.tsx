import './BubbleField.css'

import { useCallback, useEffect, useRef, useState } from 'react'

import jellyfishSvg from '@/assets/icons/JZ26-Icon-Jellyfish-free.svg?raw'
import lobsterSvg from '@/assets/icons/JZ26-Icon-Lobster-free.svg?raw'
import octopusSvg from '@/assets/icons/JZ26-Icon-Octopus-free.svg?raw'
import sharkSvg from '@/assets/icons/JZ26-Icon-Shark-free.svg?raw'
import starfishSvg from '@/assets/icons/JZ26-Icon-Starfish-free.svg?raw'
import stingraySvg from '@/assets/icons/JZ26-Icon-Stingray-free.svg?raw'
import tropicalFishSvg from '@/assets/icons/JZ26-Icon-TropicalFish-free.svg?raw'
import { useMotion } from '@/hooks/useMotion'

export interface BubbleFieldProps {
  variant: 'big' | 'subtle'
  className?: string
}

interface IconDef {
  svg: string
  size: number
  label: string
}

const ICONS: IconDef[] = [
  { svg: sharkSvg, size: 120, label: 'Shark' },
  { svg: octopusSvg, size: 110, label: 'Octopus' },
  { svg: jellyfishSvg, size: 100, label: 'Jellyfish' },
  // { svg: turtleSvg, size: 100, label: 'Turtle' },
  { svg: tropicalFishSvg, size: 80, label: 'Tropical fish' },
  { svg: lobsterSvg, size: 80, label: 'Lobster' },
  { svg: stingraySvg, size: 70, label: 'Stingray' },
  { svg: starfishSvg, size: 70, label: 'Starfish' },
]

const BUBBLE_CONFIG = {
  big: { target: 16, targetMobile: 9, durationMin: 12, durationMax: 22 },
  subtle: { target: 3, durationMin: 22, durationMax: 36 },
  iconRatio: 0.4,
  emptyMinSize: 24,
  emptyMaxSmall: 60,
  emptyMaxLarge: 100,
  emptyLargeChance: 0.15,
  swayMin: 20,
  swayMax: 60,
  bigStaggerWindow: 10000,
  subtleStaggerWindow: 2000,
  respawnDelayMin: 500,
  respawnDelayMax: 6000,
  particleCount: 7,
  staticCount: 4,
} as const

const PARTICLE_COLORS = ['rgba(2, 223, 255, 0.9)', 'rgba(92, 158, 255, 0.9)', 'rgba(174, 207, 255, 0.9)', 'rgba(0, 107, 196, 0.9)']

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

interface BubbleData {
  id: number
  type: 'empty' | 'icon'
  iconIndex: number
  bubbleVariant: 1 | 2 | 3
  left: number
  size: number
  swayAmp: number
  duration: number
  topPct: number // used only in reduced-motion static mode; 0 otherwise
}

interface PopGhost {
  id: number
  x: number
  y: number
  size: number
  type: 'empty' | 'icon'
  iconIndex: number
  bubbleVariant: 1 | 2 | 3
}

interface ParticleData {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  color: string
}

interface RippleData {
  id: number
  x: number
  y: number
  size: number
}

let _uid = 0

function makeBubble(variant: 'big' | 'subtle'): BubbleData {
  const isIcon = Math.random() < BUBBLE_CONFIG.iconRatio
  const iconIndex = randInt(0, ICONS.length - 1)
  const cfg = BUBBLE_CONFIG[variant]
  let size: number

  if (isIcon) {
    size = ICONS[iconIndex].size
  } else {
    const isLarge = Math.random() < BUBBLE_CONFIG.emptyLargeChance
    size = isLarge ? rand(BUBBLE_CONFIG.emptyMaxSmall, BUBBLE_CONFIG.emptyMaxLarge) : rand(BUBBLE_CONFIG.emptyMinSize, BUBBLE_CONFIG.emptyMaxSmall)
  }

  return {
    id: _uid++,
    type: isIcon ? 'icon' : 'empty',
    iconIndex,
    bubbleVariant: randInt(1, 3) as 1 | 2 | 3,
    left: rand(2, 97),
    size,
    swayAmp: rand(BUBBLE_CONFIG.swayMin, BUBBLE_CONFIG.swayMax),
    duration: rand(cfg.durationMin, cfg.durationMax),
    topPct: 0,
  }
}

function makeStaticBubbles(): BubbleData[] {
  return Array.from({ length: BUBBLE_CONFIG.staticCount }, (_, i) => ({
    id: _uid++,
    type: 'empty' as const,
    iconIndex: 0,
    bubbleVariant: ((i % 3) + 1) as 1 | 2 | 3,
    left: 10 + i * 25,
    size: rand(30, 70),
    swayAmp: 0,
    duration: 0,
    topPct: rand(20, 80),
  }))
}

const BUBBLE_VARIANT_DOTS: Record<1 | 2 | 3, { cx: number; cy: number; r: number }[]> = {
  1: [
    { cx: 183.2, cy: 520, r: 38.7 },
    { cx: 604.3, cy: 537, r: 56 },
    { cx: 319.8, cy: 732.3, r: 23.2 },
  ],
  2: [
    { cx: 309.2, cy: 685, r: 38.7 },
    { cx: 177.3, cy: 468, r: 56 },
    { cx: 570.8, cy: 558.3, r: 23.2 },
  ],
  3: [
    { cx: 585.2, cy: 545, r: 38.7 },
    { cx: 317.3, cy: 677, r: 56 },
    { cx: 209.8, cy: 464.3, r: 23.2 },
  ],
}

function BubbleSvg({ variant }: { variant: 1 | 2 | 3 }) {
  const dots = BUBBLE_VARIANT_DOTS[variant]
  return (
    <svg viewBox="0 0 800 800" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="400" cy="400" r="400" fill="#5c9eff" opacity="0.5" />
      {dots.map((d, i) => (
        <circle key={i} fill="#5c9eff" cx={d.cx} cy={d.cy} r={d.r} />
      ))}
      <path
        fill="#fff"
        opacity=".7"
        d="M146.7,244c-3.6,0-7.2-.7-10.7-2.3-13.3-5.9-19.2-21.5-13.3-34.8,22.1-49.5,83.6-113.5,154-134.5,14-4.1,28.6,3.8,32.8,17.7,4.2,13.9-3.8,28.6-17.7,32.8-53.3,15.9-103.4,66.1-120.9,105.5-4.4,9.8-14,15.6-24.1,15.6h0Z"
      />
      <path
        fill="#fff"
        opacity=".4"
        d="M558.2,741.9c-10.8,0-20.9-6.7-24.8-17.4-5-13.7,2.1-28.8,15.8-33.8,62.4-22.6,118.1-78.6,152.8-153.5,6.1-13.2,21.8-19,35-12.9,13.2,6.1,19,21.8,12.8,35-40.5,87.6-107.1,153.5-182.6,180.9-3,1.1-6,1.6-9,1.6h0Z"
      />
    </svg>
  )
}

export default function BubbleField({ variant, className }: BubbleFieldProps) {
  const [bubbles, setBubbles] = useState<BubbleData[]>([])
  const [ghosts, setGhosts] = useState<PopGhost[]>([])
  const [particles, setParticles] = useState<ParticleData[]>([])
  const [ripples, setRipples] = useState<RippleData[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const variantRef = useRef(variant)
  variantRef.current = variant

  const { motionEnabled } = useMotion()
  const reducedMotion = !motionEnabled
  const reducedMotionRef = useRef(reducedMotion)
  reducedMotionRef.current = reducedMotion

  function addTimer(fn: () => void, ms: number) {
    const t = setTimeout(fn, ms)
    timers.current.push(t)
    return t
  }

  const scheduleRespawn = useCallback(() => {
    if (reducedMotionRef.current) return
    const delay = randInt(BUBBLE_CONFIG.respawnDelayMin, BUBBLE_CONFIG.respawnDelayMax)
    timers.current.push(
      setTimeout(() => {
        setBubbles((prev) => [...prev, makeBubble(variantRef.current)])
      }, delay),
    )
  }, [])

  const handleExit = useCallback(
    (id: number) => {
      setBubbles((prev) => prev.filter((b) => b.id !== id))
      scheduleRespawn()
    },
    [scheduleRespawn],
  )

  const handlePop = useCallback(
    (bubble: BubbleData, e: React.MouseEvent<HTMLDivElement>) => {
      const riser = e.currentTarget
      const containerEl = containerRef.current
      if (!containerEl) return

      const riserRect = riser.getBoundingClientRect()
      const containerRect = containerEl.getBoundingClientRect()
      const cx = riserRect.left + riserRect.width / 2 - containerRect.left
      const cy = riserRect.top + riserRect.height / 2 - containerRect.top

      // Replace rising bubble with a frozen ghost at the captured position
      setBubbles((prev) => prev.filter((b) => b.id !== bubble.id))
      const ghostId = _uid++
      setGhosts((prev) => [
        ...prev,
        { id: ghostId, x: cx, y: cy, size: bubble.size, type: bubble.type, iconIndex: bubble.iconIndex, bubbleVariant: bubble.bubbleVariant },
      ])

      // Particles
      const newParticles: ParticleData[] = Array.from({ length: BUBBLE_CONFIG.particleCount }, (_, i) => {
        const angle = (i / BUBBLE_CONFIG.particleCount) * Math.PI * 2
        const dist = rand(40, 90)
        return {
          id: _uid++,
          x: cx,
          y: cy,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        }
      })

      // Ripples
      const newRipples: RippleData[] = [
        { id: _uid++, x: cx, y: cy, size: bubble.size },
        { id: _uid++, x: cx, y: cy, size: bubble.size * 0.55 },
      ]

      setParticles((prev) => [...prev, ...newParticles])
      setRipples((prev) => [...prev, ...newRipples])

      // Cleanup
      const ghostCleanup = ghostId
      addTimer(() => setGhosts((prev) => prev.filter((g) => g.id !== ghostCleanup)), 700)
      addTimer(() => {
        const pids = new Set(newParticles.map((p) => p.id))
        setParticles((prev) => prev.filter((p) => !pids.has(p.id)))
      }, 700)
      addTimer(() => {
        const rids = new Set(newRipples.map((r) => r.id))
        setRipples((prev) => prev.filter((r) => !rids.has(r.id)))
      }, 800)

      scheduleRespawn()
    },
    [scheduleRespawn],
  )

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setBubbles([])

    if (reducedMotion) {
      setBubbles(makeStaticBubbles())
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const cfg = BUBBLE_CONFIG[variant]
    const target = variant === 'big' && isMobile ? BUBBLE_CONFIG.big.targetMobile : cfg.target
    const window_ = variant === 'big' ? BUBBLE_CONFIG.bigStaggerWindow : BUBBLE_CONFIG.subtleStaggerWindow

    for (let i = 0; i < target; i++) {
      timers.current.push(
        setTimeout(
          () => {
            setBubbles((prev) => [...prev, makeBubble(variant)])
          },
          rand(0, window_),
        ),
      )
    }

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [variant, reducedMotion])

  return (
    <div ref={containerRef} className={`bf bf--${variant}${className ? ` ${className}` : ''}`} aria-hidden="true">
      {bubbles.map((b) => (
        <RisingBubble key={b.id} data={b} reduced={reducedMotion} onPop={handlePop} onExit={handleExit} />
      ))}

      {ghosts.map((g) => (
        <PopGhostEl key={g.id} ghost={g} />
      ))}

      {particles.map((p) => (
        <div
          key={p.id}
          className="bf__particle"
          style={
            {
              left: p.x - 2.5,
              top: p.y - 2.5,
              background: p.color,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {ripples.map((r) => (
        <div
          key={r.id}
          className="bf__ripple"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
          }}
        />
      ))}
    </div>
  )
}

interface RisingBubbleProps {
  data: BubbleData
  reduced: boolean
  onPop: (bubble: BubbleData, e: React.MouseEvent<HTMLDivElement>) => void
  onExit: (id: number) => void
}

function RisingBubble({ data, reduced, onPop, onExit }: RisingBubbleProps) {
  const { id, type, iconIndex, left, size, swayAmp, duration } = data
  const icon = ICONS[iconIndex]

  const riserStyle: React.CSSProperties = reduced
    ? { left: `${left}%`, width: size, height: size, top: `${data.topPct}%` }
    : ({
        left: `${left}%`,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        '--sway': `${swayAmp}px`,
      } as React.CSSProperties)

  return (
    <div className="bf__riser" style={riserStyle} onClick={(e) => onPop(data, e)} onAnimationEnd={() => onExit(id)}>
      <div className="bf__bubble">
        <BubbleSvg variant={data.bubbleVariant} />
        {type === 'icon' && <div className="bf__icon" dangerouslySetInnerHTML={{ __html: icon.svg }} aria-label={icon.label} />}
      </div>
    </div>
  )
}

interface PopGhostElProps {
  ghost: PopGhost
}

function PopGhostEl({ ghost }: PopGhostElProps) {
  const { x, y, size, type, iconIndex, bubbleVariant } = ghost
  const icon = ICONS[iconIndex]

  return (
    <div
      className="bf__pop-ghost"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
    >
      <BubbleSvg variant={bubbleVariant} />
      {type === 'icon' && (
        <>
          <div className="bf__icon" style={{ width: '72%', height: '72%' }} dangerouslySetInnerHTML={{ __html: icon.svg }} />
          <div className="bf__icon-drop" style={{ width: '72%', height: '72%' }} dangerouslySetInnerHTML={{ __html: icon.svg }} />
        </>
      )}
    </div>
  )
}
