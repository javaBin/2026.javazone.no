import { resolveLink } from '@/lib'

type ButtonVariant = 'primary' | 'primary-outline' | 'pop' | 'pop-outline'
type ButtonSize = 'small' | 'medium' | 'large'

interface LinkButtonProps {
  title: string
  link: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent-primary text-base-200 hover:brightness-110 hover:shadow-lg',
  'primary-outline': 'bg-transparent border-accent-primary border text-accent-primary hover:bg-accent-primary hover:text-base-200',
  pop: 'bg-pop text-pop-secondary hover:brightness-110 hover:shadow-lg',
  'pop-outline': 'bg-transparent border-pop border text-pop hover:bg-pop hover:text-pop-secondary',
}

const sizes: Record<ButtonSize, string> = {
  small: 'px-2 sm:px-4 font-normal text-base sm:text-lg',
  medium: 'px-6 sm:px-8 font-medium text-lg sm:text-xl',
  large: 'px-10 sm:px-12 font-semibold text-xl sm:text-2xl',
}

const LinkButton = ({ title, link, variant = 'primary', size = 'medium', className = '' }: LinkButtonProps) => {
  const { href, isExternal } = typeof window === 'undefined' ? { href: link, isExternal: false } : resolveLink(link)
  const baseStyle =
    'inline-flex items-center justify-center rounded-3xl py-2 font-semibold no-underline transition-all duration-200 ease-in-out hover:-translate-y-0.5'

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
