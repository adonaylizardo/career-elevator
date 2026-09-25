import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../ui/button'
import { LogoMark } from './LogoMark'

const NAV_LINKS = [
  { label: "WHAT'S INCLUDED", href: '#whats-included' },
  { label: 'HOW IT WORKS', href: '#how-it-works' },
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
        solid ? 'border-b border-border bg-background/95' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 lg:h-20 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-3 font-body text-[14px] font-medium leading-[1.3] tracking-[-0.2px] text-foreground"
        >
          <LogoMark />
          <span>Career Elevator</span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-nav-link uppercase hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="#pricing"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'nav' }),
              'h-9 border-[#2B2B2B] px-4 uppercase',
            )}
          >
            Pricing
          </a>
          <Link
            to="/checkout"
            className={cn(
              buttonVariants({ variant: 'default', size: 'nav' }),
              'h-9 bg-btn px-4 uppercase text-white',
            )}
          >
            GET — $49
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/checkout"
            className={cn(buttonVariants({ variant: 'mobile', size: 'navMobile' }))}
          >
            GET — $49
          </Link>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#2B2B2B] bg-transparent"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex flex-col gap-[3px]">
              <span className="block h-px w-3.5 bg-foreground" />
              <span className="block h-px w-3.5 bg-foreground" />
              <span className="block h-px w-3.5 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-nav-link uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="text-nav-link uppercase"
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
