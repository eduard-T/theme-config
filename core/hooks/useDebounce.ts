import { useCallback, useEffect, useRef } from 'react'


export function useDebounce<T extends (...args: any[]) => void>(
  innerFn: T,
  delay = 275,
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const debouncedFn = useRef(innerFn)

  const cleanup = () => {
    if (!timeout.current) return
    clearTimeout(timeout.current)
  }

  useEffect(() => {
    debouncedFn.current = innerFn
  }, [innerFn])

  useEffect(() => cleanup, [])

  return useCallback(
    (...args: Parameters<T>) => {
      cleanup()
      timeout.current = setTimeout(() => {
        debouncedFn.current(...args)
      }, delay)
    },
    [delay],
  )
}
