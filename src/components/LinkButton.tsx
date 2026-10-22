import ArrowIcon from '@/components/ArrowIcon'
import { resolveLink } from '@/lib'

type ButtonVariant = 'primary' | 'outline' | 'secondary'
type ButtonSize = 'small' | 'medium' | 'large'

interface LinkButtonProps {
  title: string
  link: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

// primary: solid burgundy pill. outline: minimal outlined pill. secondary: text link with an arrow.
const variants: Record<ButtonVariant, string> = {
  primary: 'rounded-full bg-brand text-white hover:bg-brand-hover hover:text-white',
  outline: 'rounded-full border border-ink text-ink hover:border-brand hover:text-brand',
  secondary: 'text-ink hover:text-brand',
}

const sizes: Record<ButtonSize, string> = {
  small: 'min-h-11 px-5 text-base',
  medium: 'min-h-12 px-7 text-base',
  large: 'min-h-13 px-8 text-lg',
}

const LinkButton = ({ title, link, variant = 'primary', size = 'medium', className = '' }: LinkButtonProps) => {
  const { href, isExternal } = typeof window === 'undefined' ? { href: link, isExternal: false } : resolveLink(link)
  const baseStyle = 'group inline-flex items-center justify-center gap-2 font-medium no-underline transition-colors duration-200 ease-standard'
  const sizeStyle = variant === 'secondary' ? 'min-h-11 text-base' : sizes[size]

  return (
    <a
      href={href}
      className={`${baseStyle} ${variants[variant]} ${sizeStyle} ${className}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      referrerPolicy={isExternal ? 'no-referrer' : 'same-origin'}
    >
      {title}
      {variant === 'secondary' && <ArrowIcon className="w-4 h-4 transition-transform duration-200 ease-standard group-hover:translate-x-1" />}
    </a>
  )
}

export default LinkButton
