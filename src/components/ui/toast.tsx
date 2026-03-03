import * as React from 'react'

import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

export type ToastActionElement = React.ReactElement<any>

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  icon?: React.ReactNode
  variant?: 'default' | 'constructive' | 'destructive'
}

function Toast({
  className,
  title,
  description,
  action,
  open,
  onOpenChange,
  icon,
  ...props
}: ToastProps) {
  return (
    <div
      data-slot="toast"
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-md border bg-background p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col gap-1">
        {title && (
          <div data-slot="toast-title" className="font-semibold">
            {title}
          </div>
        )}
        {description && (
          <div
            data-slot="toast-description"
            className="text-sm text-muted-foreground"
          >
            {description}
          </div>
        )}
      </div>
      {action}
    </div>
  )
}

Toast.displayName = 'Toast'

export { Toast }
