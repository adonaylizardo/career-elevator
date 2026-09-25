import { Link } from 'react-router-dom'

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: "What's included", href: '#whats-included' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Opportunity Sheet', href: '#whats-included' },
      { label: 'Intake form', href: '/intake' },
      { label: 'Checkout', href: '/checkout' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Email Adonay', href: 'mailto:hello@adonaylizardo.com' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/adonaylizardo/',
      },
      { label: 'Coaching (separate)', href: 'mailto:hello@adonaylizardo.com' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="mx-auto max-w-[1440px] px-6 py-[18px] lg:px-20 lg:pb-6 lg:pt-[18px]">
        <div className="hidden gap-12 pb-10 lg:flex lg:justify-between">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="w-[200px]">
              <p className="text-about-tag mb-3 uppercase">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        className="font-body text-[14px] leading-[1.3] text-footer hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('mailto:') ||
                      link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        className="font-body text-[14px] leading-[1.3] text-footer hover:text-foreground"
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="font-body text-[14px] leading-[1.3] text-footer hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[14px] leading-[1.3] text-foreground">
            Career Elevator
          </p>
          <p className="font-body text-[12px] leading-[1.3] text-footer">
            © 2026 Adonay Lizardo. Research, not a job board.
          </p>
        </div>
      </div>
    </footer>
  )
}
