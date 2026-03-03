import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

const Sheet = DrawerPrimitive.Root

const SheetTrigger = DrawerPrimitive.Trigger

const SheetClose = DrawerPrimitive.Close

const SheetPortal = DrawerPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn('fixed inset-0 z-40 bg-black/80', className)}
    {...props}
  />
))
SheetOverlay.displayName = DrawerPrimitive.Overlay.displayName

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      className={cn(
        'fixed z-40 gap-4 bg-background p-4 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
        'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:w-1/2 md:w-[400px]',
        className,
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DrawerPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-slot="sheet-header"
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
)

const SheetFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-slot="sheet-footer"
    className={cn('flex flex-col-reverse gap-2 sm:flex-row', className)}
    {...props}
  />
)

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<'h2'>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="sheet-title"
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<'p'>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="sheet-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
