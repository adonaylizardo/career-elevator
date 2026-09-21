import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../ui/button'
import { LogoMark } from './LogoMark'

const NAV_LINKS = [
  { label: "What's included", href: '#whats-included' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
] as const

interface HeaderProps {
  transparent?: boolean
}

export function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return

    function onScroll() {
      setScrolled(window.scrollY > 48)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const solid = !transparent || scrolled

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-200',
        solid
          ? 'border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground"
        >
          <LogoMark />
          <span>Career Elevator</span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-nav text-[11px] uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#pricing"
            className={cn(buttonVariants({ variant: 'ghost', size: 'nav' }))}
          >
            Pricing
          </a>
          <Link
            to="/checkout"
            className={cn(buttonVariants({ variant: 'default', size: 'nav' }))}
          >
            Get — $49
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/checkout"
            className={cn(buttonVariants({ variant: 'default', size: 'nav' }))}
          >
            Get — $49
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-border bg-card/80"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-nav text-xs uppercase text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="font-nav text-xs uppercase text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
