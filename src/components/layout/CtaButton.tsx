import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'

interface CtaButtonProps {
  className?: string
}

export function CtaButton({ className }: CtaButtonProps) {
  return (
    <Link
      to="/checkout"
      className={cn(buttonVariants({ size: 'lg' }), className)}
    >
      Get Career Elevator — $49
    </Link>
  )
}
