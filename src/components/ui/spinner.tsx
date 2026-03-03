import * as React from 'react'

import { cn } from '@/lib/utils'

function Spinner({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="spinner"
      role="status"
      className={cn(
        'animate-spin rounded-full border-2 border-muted border-t-primary',
        className,
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner }
