import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Career Elevator
        </Link>
        <Link
          to="/checkout"
          className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
        >
          Get Career Elevator — $49
        </Link>
      </div>
    </header>
  )
}
