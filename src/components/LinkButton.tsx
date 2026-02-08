import { resolveLink } from '@/lib'

type ButtonVariant = 'primary' | 'primary-outline'
type ButtonSize = 'small' | 'medium' | 'large'

interface CTAButtonProps {
  title: string
  link: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-sunbeam-gold text-abyss-navy',
  'primary-outline': 'bg-transparent border-sunbeam-gold border-1 text-sunbeam-gold',
}

const sizes: Record<ButtonSize, string> = {
  small: 'px-4 font-normal text-base',
  medium: 'px-6 font-medium text-lg sm:text-xl',
  large: 'px-12 font-semibold text-xl sm:text-2xl',
}

const LinkButton = ({ title, link, variant = 'primary', size = 'medium', className = '' }: CTAButtonProps) => {
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
