import { ExternalLink } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

export function EnhancedLink({
  children,
  className,
  href,
  ...rest
}: CustomLinkProps) {
  const isInternalLink = href.startsWith('/')
  const isAnchorLink = href.startsWith('#')

  if (isInternalLink || isAnchorLink) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex align-baseline gap-1 items-center underline underline-offset-4',
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <ExternalLink className="ml-0.5 inline-block size-4" />
    </Link>
  )
}
