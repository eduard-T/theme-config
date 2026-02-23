import { ForwardedRef, ReactElement, RefAttributes } from 'react'

// hijacking declarations from React in order to apply type inference
declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null
}