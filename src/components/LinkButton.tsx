import { resolveLink } from '@/lib'

type ButtonVariant = 'primary' | 'primary-outline'
type ButtonSize = 'small' | 'medium' | 'large'

interface LinkButtonProps {
  title: string
  link: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent-primary text-base-200',
  'primary-outline': 'bg-transparent border-accent-primary border text-accent-primary',
}

const sizes: Record<ButtonSize, string> = {
  small: 'px-2 sm:px-4 font-normal text-base sm:text-lg',
  medium: 'px-6 sm:px-8 font-medium text-lg sm:text-xl',
  large: 'px-10 sm:px-12 font-semibold text-xl sm:text-2xl',
}

const LinkButton = ({ title, link, variant = 'primary', size = 'medium', className = '' }: LinkButtonProps) => {
  const { href, isExternal } = typeof window === 'undefined' ? { href: link, isExternal: false } : resolveLink(link)
  const baseStyle =
    'inline-flex items-center justify-center rounded-3xl py-2 font-semibold no-underline transition-all duration-200 ease-in-out hover:opacity-90 hover:-translate-y-px'

  return (
    <a
      href={href}
      className={`${variants[variant]} ${sizes[size]} ${baseStyle} ${className}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      referrerPolicy={isExternal ? 'no-referrer' : 'same-origin'}
    >
      {title}
    </a>
  )
}

export default LinkButton
