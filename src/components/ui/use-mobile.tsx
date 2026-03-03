import { useEffect, useState } from 'react'

type UseMediaQueryOptions = {
  initializeWithValue?: boolean
}

export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {},
): boolean {
  const { initializeWithValue = true } = options
  const [value, setValue] = useState<boolean>(() => {
    if (initializeWithValue) {
      if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches
      }
      return false
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQueryList = window.matchMedia(query)

    const handler = (event: MediaQueryListEvent) => {
      setValue(event.matches)
    }

    mediaQueryList.addEventListener('change', handler)

    return () => {
      mediaQueryList.removeEventListener('change', handler)
    }
  }, [query])

  return value
}

export function useMobileUI() {
  return useMediaQuery('(max-width: 640px)')
}

export { useMobileUI as useIsMobile }
