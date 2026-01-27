import React from 'react'

import { Heading } from './index.ts'

type CardProps = {
  title: string
  subtitle?: React.ReactNode
  wave?: boolean
  children: React.ReactNode
  className?: string
}

const Card = ({ title, subtitle, wave = false, children, className = '' }: CardProps) => {
  const style = wave ? 'wavy-card flex' : 'rounded-3xl border border-base-300 p-6 bg-base-100'
  return (
    <section className={`${style} ${className}`.trim()}>
      <div className="flex flex-col justify-center w-full md:px-4">
        <Heading level="h3">{title}</Heading>
        {subtitle ? <p className="mt-2 font-semibold text-secondary md:text-lg">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  )
}

export default Card
