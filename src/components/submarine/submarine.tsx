//https://youtube.com/shorts/vt-LXSHITos?si=q6y8JWovl5oLhlFW
import './submarine.css'

import { useEffect, useRef, useState } from 'react'

const Submarine = () => {
  const [position, setPosition] = useState({ x: 50, y: 120 })
  const [facingRight, setFacingRight] = useState(true)
  const [isAtTopLimit, setIsAtTopLimit] = useState(false)
  const targetPosition = useRef({ x: 50, y: 120 })
  const animationFrameId = useRef<number>(0)
  const lastDirection = useRef(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = (e.clientX / window.innerWidth) * 100

      if (x < 10) x = x - 20
      if (x > 90) x = x + 20

      const y = Math.max(25, ((e.clientY + 100) / window.innerHeight) * 100)
      targetPosition.current = { x, y }
    }

    const animate = () => {
      const dx = targetPosition.current.x - position.x

      if (Math.abs(dx) > 0.5) {
        const newDirection = dx > 0
        if (newDirection !== lastDirection.current) {
          lastDirection.current = newDirection
          setFacingRight(newDirection)
        }
      }

      setPosition((prev) => {
        const dx = targetPosition.current.x - prev.x
        const dy = targetPosition.current.y - prev.y

        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 0.1) {
          return prev
        }

        const speed = 0.1
        const moveAmount = Math.min(speed, distance)
        const dirX = dx / distance
        const dirY = dy / distance

        const newY = prev.y + dirY * moveAmount

        setIsAtTopLimit(newY <= 25.5)

        return {
          x: prev.x + dirX * moveAmount,
          y: newY,
        }
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <div
      className="submarine__container"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div
        className="submarine__flipper"
        style={{
          transform: `scaleX(${facingRight ? -1 : 1})`,
        }}
      >
        <div className={`light ${isAtTopLimit ? 'light--off' : ''}`} />
        <div className="submarine__periscope" />
        <div className="submarine__periscope-glass" />
        <div className="submarine__sail">
          <div className="submarine__sail-shadow dark1" />
          <div className="submarine__sail-shadow light1" />
          <div className="submarine__sail-shadow dark2" />
        </div>
        <div className="submarine__body">
          <div className="submarine__window one" />
          <div className="submarine__window two" />
          <div className="submarine__shadow-dark" />
          <div className="submarine__shadow-light" />
          <div className="submarine__shadow-arcLight" />
        </div>
        <div className="submarine__propeller">
          <div className="propeller__perspective">
            <div className="submarine__propeller-parts darkOne" />
            <div className="submarine__propeller-parts lightOne" />
          </div>
        </div>
        <div className="bubbles__container">
          <span className="bubbles bubble-1" />
          <span className="bubbles bubble-2" />
          <span className="bubbles bubble-3" />
          <span className="bubbles bubble-4" />
        </div>
      </div>
    </div>
  )
}

export default Submarine
