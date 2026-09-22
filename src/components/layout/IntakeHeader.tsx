import { Link } from 'react-router-dom'
import { LogoMark } from './LogoMark'

export function IntakeHeader() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center px-5 lg:h-20 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-3 font-body text-[14px] font-medium leading-[1.3] tracking-[-0.2px] text-foreground"
        >
          <LogoMark />
          <span>Career Elevator</span>
        </Link>
      </div>
    </header>
  )
}
