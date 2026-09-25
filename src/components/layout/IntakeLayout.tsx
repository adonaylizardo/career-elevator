import { IntakeHeader } from './IntakeHeader'

interface IntakeLayoutProps {
  children: React.ReactNode
}

export function IntakeLayout({ children }: IntakeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <IntakeHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
