import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
            CE
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">
            Career Elevator
          </span>
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
