import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(QUERY)
  mediaQueryList.addEventListener("change", callback)
  return () => mediaQueryList.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

/** SSR-safe reduced-motion read, for JS-driven animation (motion/R3F). Plain
 * CSS animations should prefer the @media query directly -- no JS needed there. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
