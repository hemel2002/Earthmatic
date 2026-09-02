"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { HeroStaticFallback } from "@/components/three/hero-static-fallback"

// ssr:false + this being rendered only once WebGL2 capability is confirmed
// means the Three.js chunk is never even requested for reduced-motion or
// no-WebGL2 visitors -- not just paused after download.
const EnergyProfileHero = dynamic(
  () =>
    import("@/components/three/energy-profile-hero").then(
      (mod) => mod.EnergyProfileHero
    ),
  { ssr: false, loading: () => <HeroStaticFallback /> }
)

function supportsWebGL2() {
  try {
    const canvas = document.createElement("canvas")
    return !!canvas.getContext("webgl2")
  } catch {
    return false
  }
}

export function HeroCanvasLoader() {
  const reducedMotion = useReducedMotion()
  const [webglCapable, setWebglCapable] = useState<boolean | null>(null)

  useEffect(() => {
    // Bridging to a browser-only capability (WebGL2 support) the component
    // cannot know synchronously during SSR -- one of the legitimate cases
    // for setState-in-effect, not a synchronization bug.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebglCapable(supportsWebGL2())
  }, [])

  // null = capability not yet determined (server render + first client tick)
  // -- render the static fallback so SSR and initial hydration agree, and so
  // the WebGL2 probe itself never blocks first paint.
  if (reducedMotion || webglCapable === false || webglCapable === null) {
    return <HeroStaticFallback />
  }

  return <EnergyProfileHero />
}
