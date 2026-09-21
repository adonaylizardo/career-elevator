import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:bg-neutral-800',
        outline:
          'border border-border bg-card text-foreground hover:bg-neutral-50',
        ghost:
          'border border-border bg-transparent text-foreground hover:bg-white/50',
        link: 'text-foreground underline-offset-4 hover:underline p-0 h-auto',
        pill: 'rounded-full bg-accent text-accent-foreground hover:bg-neutral-800 font-nav uppercase tracking-wider text-xs',
      },
      size: {
        default: 'h-10 px-5 py-2 rounded-[6px]',
        sm: 'h-9 rounded-[6px] px-4 font-nav uppercase tracking-wider text-xs',
        lg: 'h-12 rounded-full px-8 text-sm font-nav uppercase tracking-wider',
        nav: 'h-9 rounded-[6px] px-4 font-nav uppercase tracking-wider text-xs',
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
