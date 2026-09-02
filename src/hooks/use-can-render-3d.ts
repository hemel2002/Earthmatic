import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

function supportsWebGL2() {
  try {
    const canvas = document.createElement("canvas")
    return !!canvas.getContext("webgl2")
  } catch {
    return false
  }
}

/**
 * Shared gate for every 3D piece on the site: null while capability is still
 * being determined (server render + first client tick -- callers should
 * render their static fallback here so SSR/hydration agree), false once we
 * know the visitor prefers reduced motion or lacks WebGL2 (fallback stays,
 * and critically the Three.js chunk is never fetched for them), true once
 * confirmed safe to mount the interactive scene.
 */
export function useCanRender3D() {
  const reducedMotion = useReducedMotion()
  const [webglCapable, setWebglCapable] = useState<boolean | null>(null)

  useEffect(() => {
    // Bridging to a browser-only capability (WebGL2 support) the component
    // cannot know synchronously during SSR -- a legitimate setState-in-effect
    // case, not a synchronization bug.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebglCapable(supportsWebGL2())
  }, [])

  if (webglCapable === null) return null
  return !reducedMotion && webglCapable
}
