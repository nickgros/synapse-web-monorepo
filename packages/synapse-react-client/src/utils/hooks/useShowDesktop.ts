import { createContext, useContext, useEffect, useState } from 'react'
export type UseShowDesktopProps = number

// This should match $breakpoints.medium in _variables.scss
const MOBILE_VIEWPORT_MAX_WIDTH_PX = 768

/**
 * Context for providing an alternative window object to use for viewport measurements.
 * This is useful for rendering components inside iframes where the iframe's window
 * should be used for responsive breakpoints instead of the parent window.
 */
export const WindowOverrideContext = createContext<Window | null>(null)

/**
 * Hook that returns the window object to use for viewport measurements.
 * Returns the context value if provided, otherwise falls back to the global window.
 */
export function useWindowOverride(): Window {
  const contextWindow = useContext(WindowOverrideContext)
  return contextWindow ?? window
}

export default function useShowDesktop(breakpoint?: UseShowDesktopProps) {
  const usedBreakpoint = breakpoint ?? MOBILE_VIEWPORT_MAX_WIDTH_PX
  const targetWindow = useWindowOverride()
  const [showDesktop, setShowDesktop] = useState(
    targetWindow.innerWidth > usedBreakpoint,
  )
  useEffect(() => {
    const listener = () => {
      const updatedValue = targetWindow.innerWidth > usedBreakpoint
      if (updatedValue !== showDesktop) {
        setShowDesktop(updatedValue)
      }
    }
    targetWindow.addEventListener('resize', listener)
    return () => {
      targetWindow.removeEventListener('resize', listener)
    }
  }, [targetWindow, usedBreakpoint, showDesktop])

  return showDesktop
}
