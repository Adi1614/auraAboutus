import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const progressRootVariants = cva(
  'relative h-1.5 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

const progressIndicatorVariants = cva('h-full w-full flex-1 bg-primary transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-600',
      warning: 'bg-yellow-500',
      destructive: 'bg-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressRootVariants> {}

function Progress({
  className,
  value,
  size = 'sm',
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressRootVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

interface ProgressIndicatorProps
  extends Omit<React.ComponentProps<typeof ProgressPrimitive.Indicator>, 'style'>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number
}

function ProgressIndicator({
  className,
  variant = 'default',
  value = 0,
  ...props
}: ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(progressIndicatorVariants({ variant }), className)}
      style={{ transform: `translateX(-${100 - value}%)` }}
      {...props}
    />
  )
}

export { Progress, ProgressIndicator }
