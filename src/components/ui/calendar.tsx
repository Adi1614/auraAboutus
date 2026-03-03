import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: {
  className?: string
  classNames?: any
  showOutsideDays?: boolean
  [key: string]: any
}) {
  return <div className={cn('rounded-md border p-4', className)} {...props} />
}

Calendar.displayName = 'Calendar'

export { Calendar }
