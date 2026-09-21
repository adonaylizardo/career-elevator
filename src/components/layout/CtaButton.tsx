import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'

interface CtaButtonProps {
  className?: string
  variant?: 'pill' | 'close' | 'mobile'
}

export function CtaButton({
  className,
  variant = 'pill',
}: CtaButtonProps) {
  return (
    <Link
      to="/checkout"
      className={cn(buttonVariants({ variant, size: 'lg' }), className)}
    >
      Get Career Elevator — $49
    </Link>
  )
}
