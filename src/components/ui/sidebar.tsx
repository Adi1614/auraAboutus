import * as React from 'react'
import * as SidebarPrimitive from '@radix-ui/react-navigation-menu'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

type SidebarContext = {
  state: 'open' | 'closed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined,
)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = React.useContext(SidebarContext)?.isMobile ?? false
    const [openMobile, setOpenMobile] = React.useState(false)

    const isControlled = openProp !== undefined
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = isControlled ? openProp : _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openValue = typeof value === 'function' ? value(open) : value

        if (isControlled) {
          setOpenProp?.(openValue)
        } else {
          _setOpen(openValue)
        }

        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openValue}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [isControlled, open, setOpenProp],
    )

    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile(!openMobile) : setOpen((open) => !open)
    }, [isMobile, openMobile, setOpen, setOpenMobile])

    return (
      <SidebarContext.Provider
        value={{
          state: open ? 'open' : 'closed',
          open,
          setOpen,
          openMobile,
          setOpenMobile,
          isMobile,
          toggleSidebar,
        }}
      >
        <div
          style={
            {
              '--sidebar-width': '16rem',
              '--transition-duration': '200ms',
              ...style,
            } as any
          }
          className={cn(
            'group/sidebar-wrapper flex h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  },
)
SidebarProvider.displayName = 'SidebarProvider'

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
  }
>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    return (
      <>
        {isMobile && collapsible === 'offcanvas' && (
          <div
            className="fixed inset-0 z-40 bg-black/80 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 group-data-[state=closed]/sidebar-wrapper:hidden"
            data-state={state}
            onClick={() => setOpenMobile(false)}
          />
        )}
        <div
          data-slot="sidebar"
          data-sidebar={side}
          data-state={state}
          data-mobile={isMobile}
          data-collapsible={isMobile ? collapsible : 'none'}
          data-variant={variant}
          className="peer absolute inset-y-0 z-10 hidden h-svh w-[--sidebar-width] flex-col border-r transition-[left,right,width] duration-[var(--transition-duration)] group-data-[state=open]/sidebar-wrapper:flex md:relative md:z-0 md:flex"
          style={
            {
              [side]: 0,
            } as any
          }
          ref={ref}
          {...props}
        >
          <div
            className={cn(
              'group/sidebar flex h-full w-full flex-col overflow-hidden bg-sidebar',
              variant === 'floating' &&
                'rounded-lg border shadow-sm m-2 ml-2 mr-1',
              variant === 'inset' && 'border-0',
              className,
            )}
          >
            {children}
          </div>
        </div>
      </>
    )
  },
)
Sidebar.displayName = 'Sidebar'

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-sm"
      className={cn('h-8 w-8', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 select-none border-r transition-colors ease-linear after:absolute after:inset-0 hover:bg-sidebar-accent active:bg-sidebar-accent sm:flex',
        className,
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = 'SidebarRail'

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    data-slot="sidebar-inset"
    className={cn(
      'relative flex flex-col flex-1 min-h-svh bg-background',
      className,
    )}
    {...props}
  />
))
SidebarInset.displayName = 'SidebarInset'

const sidebarGroupVariants = cva(
  'relative flex w-full min-w-0 flex-col p-2',
  {
    variants: {
      variant: {
        default: 'gap-2',
        accent: 'rounded-md bg-sidebar-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface SidebarGroupProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof sidebarGroupVariants> {}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(sidebarGroupVariants({ variant }), className)}
      {...props}
    />
  ),
)
SidebarGroup.displayName = 'SidebarGroup'

const SidebarGroupLabel = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-sidebar="group-label"
    className={cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,evelation] duration-200 focus-visible:ring-2 group-hover/sidebar-group:bg-sidebar-accent',
      className,
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => (
  <button
    ref={ref}
    data-sidebar="group-action"
    className={cn(
      'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      className,
    )}
    {...props}
  />
))
SidebarGroupAction.displayName = 'SidebarGroupAction'

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn('flex flex-col gap-0.5 w-full', className)}
    {...props}
  />
))
SidebarGroupContent.displayName = 'SidebarGroupContent'

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg:not([class*="chevron"])]:size-4 [&>svg:not([class*="chevron"])]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-transparent focus-visible:bg-transparent',
        outline:
          'border border-sidebar-border bg-transparent hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground',
      },
      size: {
        default: 'h-8',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-base group-data-[collapsible=icon]/sidebar:!p-0',
      },
      isActive: {
        true: 'bg-sidebar-accent text-sidebar-accent-foreground',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface SidebarMenuButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<'span'>
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      isActive = false,
      variant = 'default',
      size = 'default',
      className,
      tooltip,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size, isActive }), className)}
        {...props}
      />
    )
  },
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn('flex w-full min-w-0 flex-col gap-1', className)}
    {...props}
  />
))
SidebarMenu.displayName = 'SidebarMenu'

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
}
