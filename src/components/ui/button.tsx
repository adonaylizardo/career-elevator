import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B2B2B]/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-btn text-white hover:bg-[#1A1A1A]',
        outline:
          'border border-[#2B2B2B] bg-transparent text-foreground hover:bg-white/50',
        ghost: 'bg-transparent text-foreground hover:bg-white/50',
        link: 'text-foreground underline-offset-4 hover:underline p-0 h-auto',
        pill: 'rounded-full bg-btn text-white hover:bg-[#1A1A1A] text-cta-pill',
        close: 'rounded-full bg-btn-close text-white hover:bg-black text-close-cta',
        mobile: 'rounded-full bg-btn-mobile text-white hover:bg-black',
      },
      size: {
        default: 'h-10 px-5 py-2 rounded-[6px]',
        sm: 'h-9 rounded-[6px] px-4',
        lg: 'h-auto rounded-full px-7 py-4',
        nav: 'h-9 rounded-[6px] px-4 py-[11px] text-nav-link text-[14px] tracking-[0.2px]',
        navMobile: 'h-8 rounded-[6px] px-3 py-2 text-[11px] font-mono font-medium tracking-[0.2px] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
