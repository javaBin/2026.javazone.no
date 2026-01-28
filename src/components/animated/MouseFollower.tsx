import { useEffect, useRef } from 'react'

interface Vec2 {
  x: number
  y: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const len = (v: Vec2) => Math.hypot(v.x, v.y)
const sub = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y })
const add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y })
const mul = (a: Vec2, s: number): Vec2 => ({ x: a.x * s, y: a.y * s })

/**
 * "Seek" steering:
 *  - acceleration points toward target
 *  - velocity is damped (drag)
 *  - position integrates velocity
 *
 * This feels fish-like compared to snapping directly to the mouse.
 */

const MouseFollower = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const fishRef = useRef<HTMLDivElement | null>(null)
  const lastAngle = useRef(0)

  // Physics state (kept in refs to avoid re-renders)
  const pos = useRef<Vec2>({ x: 200, y: 200 })
  const vel = useRef<Vec2>({ x: 0, y: 0 })
  const target = useRef<Vec2>({ x: 200, y: 200 })

  useEffect(() => {
    const el = containerRef.current
    const fishEl = fishRef.current
    if (!el || !fishEl) return

    // Tune these for vibe
    const maxSpeed = 900 // px/s
    const maxAccel = 2600 // px/s^2
    const drag = 7.5 // higher = more damping
    const arriveRadius = 18 // slows down near cursor

    let raf = 0
    let last = performance.now()

    const updateTargetFromEvent = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      target.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    el.addEventListener('pointermove', updateTargetFromEvent)
    el.addEventListener('pointerdown', updateTargetFromEvent)

    const tick = (now: number) => {
      const dt = clamp((now - last) / 1000, 0, 0.033) // cap dt to avoid jumps
      last = now

      const p = pos.current
      const v = vel.current
      const t = target.current

      // Seek toward target
      const toTarget = sub(t, p)
      const dist = len(toTarget) || 0.0001

      // Arrive: reduce desired speed when close
      const desiredSpeed = dist < arriveRadius ? maxSpeed * (dist / arriveRadius) : maxSpeed
      const desiredVel = mul(toTarget, desiredSpeed / dist)

      // Steering = desiredVel - currentVel, limited by maxAccel
      let steer = sub(desiredVel, v)
      const steerMag = len(steer) || 0.0001
      if (steerMag > maxAccel) steer = mul(steer, maxAccel / steerMag)

      // Integrate velocity with drag
      // v += steer * dt
      vel.current = add(v, mul(steer, dt))
      // Apply drag toward zero
      vel.current = add(vel.current, mul(vel.current, -drag * dt))

      // Limit speed
      const speed = len(vel.current) || 0
      if (speed > maxSpeed) vel.current = mul(vel.current, maxSpeed / speed)

      // Integrate position
      pos.current = add(p, mul(vel.current, dt))

      // Update DOM transform (translate + rotate)
      let angleDeg = lastAngle.current
      if (speed > 10) {
        // avoid noisy angle at near-zero speed
        const angleRad = Math.atan2(vel.current.y, vel.current.x)
        angleDeg = (angleRad * 180) / Math.PI

        lastAngle.current = angleDeg
      } // travel direction

      // Slight “bob” based on speed (optional)
      const bob = Math.sin(now / 120) * clamp(speed / 500, 0, 1) * 2

      fishEl.style.transform = `translate(${pos.current.x}px, ${pos.current.y + bob}px) rotate(${angleDeg}deg)`
      // Make rotation pivot look natural (center-ish)
      fishEl.style.transformOrigin = '20% 50%'

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', updateTargetFromEvent)
      el.removeEventListener('pointerdown', updateTargetFromEvent)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      <div
        ref={fishRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 140,
          height: 80,
          pointerEvents: 'none',
          willChange: 'transform',
          filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.15))',
        }}
        aria-hidden="true"
      >
        <FishSVG />
      </div>
    </div>
  )
}

const FishSVG = () => {
  return (
    <svg viewBox="0 0 140 80" width="140" height="80">
      {/* Body */}
      <g className="fish">
        <ellipse cx="70" cy="40" rx="44" ry="24" fill="currentColor" opacity="0.92" />
        <ellipse cx="82" cy="34" rx="16" ry="10" fill="white" opacity="0.22" />

        {/* Eye */}
        <circle cx="96" cy="36" r="5.2" fill="white" opacity="0.9" />
        <circle cx="98" cy="37" r="2.2" fill="black" opacity="0.75" />

        {/* Tail (wiggles) */}
        <g className="tail" transform="translate(24,40)">
          <path d="M0,0 C-14,-14 -28,-14 -40,0 C-28,14 -14,14 0,0 Z" fill="currentColor" opacity="0.9" />
        </g>

        {/* Top fin (flaps) */}
        <g className="fin fin-top" transform="translate(62,18)">
          <path d="M0,22 C10,4 26,2 34,18 C22,16 12,18 0,22 Z" fill="currentColor" opacity="0.75" />
        </g>

        {/* Bottom fin (flaps) */}
        <g className="fin fin-bottom" transform="translate(62,44)">
          <path d="M0,0 C10,18 26,20 34,4 C22,6 12,4 0,0 Z" fill="currentColor" opacity="0.65" />
        </g>
      </g>

      <style>{`
        /* You can set the fish color via CSS: color: ... on the container */
        svg { width: 100%; height: 100%; color: #ff6aa6; }

        /* Tail wiggle around its base */
        .tail {
          transform-origin: 0px 0px;
          animation: tailWiggle 0.55s ease-in-out infinite;
        }

        /* Fins flap a bit */
        .fin-top {
          transform-origin: 10px 18px;
          animation: finFlap 0.8s ease-in-out infinite;
        }
        .fin-bottom {
          transform-origin: 10px 4px;
          animation: finFlap 0.8s ease-in-out infinite reverse;
        }

        @keyframes tailWiggle {
          0%   { transform: rotate(8deg); }
          50%  { transform: rotate(-10deg); }
          100% { transform: rotate(8deg); }
        }

        @keyframes finFlap {
          0%   { transform: translate(var(--tx,0), var(--ty,0)) rotate(6deg) scaleY(1); }
          50%  { transform: translate(var(--tx,0), var(--ty,0)) rotate(-8deg) scaleY(0.95); }
          100% { transform: translate(var(--tx,0), var(--ty,0)) rotate(6deg) scaleY(1); }
        }
      `}</style>
    </svg>
  )
}

export default MouseFollower
