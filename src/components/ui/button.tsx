import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono-label text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-[var(--radius-button)] bg-accent text-accent-foreground hover:bg-neutral-800',
        outline:
          'rounded-[var(--radius-button)] border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5',
        ghost: 'rounded-[var(--radius-button)] hover:bg-foreground/5 text-foreground',
        link: 'text-foreground underline-offset-4 hover:underline p-0 h-auto font-sans normal-case tracking-normal',
        pink: 'rounded-[var(--radius-button)] bg-pink text-white hover:bg-pink/90',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-sm',
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
