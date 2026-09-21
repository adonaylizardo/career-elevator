import { Footer } from './Footer'
import { Header } from './Header'

interface PageLayoutProps {
  children: React.ReactNode
  transparentHeader?: boolean
}

export function PageLayout({
  children,
  transparentHeader = false,
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header transparent={transparentHeader} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
