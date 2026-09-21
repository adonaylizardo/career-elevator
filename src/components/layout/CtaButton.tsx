import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'

interface CtaButtonProps {
  className?: string
  size?: 'lg' | 'default'
}

export function CtaButton({ className, size = 'lg' }: CtaButtonProps) {
  return (
    <Link
      to="/checkout"
      className={cn(
        buttonVariants({ variant: 'pill', size }),
        size === 'lg' && 'h-14 px-10 text-sm',
        className,
      )}
    >
      Get Career Elevator — $49
    </Link>
  )
}
