"use client"

import dynamic from "next/dynamic"
import { useCanRender3D } from "@/hooks/use-can-render-3d"
import { HeroStaticFallback } from "@/components/three/hero-static-fallback"

// ssr:false + this being rendered only once capability is confirmed means
// the Three.js chunk is never even requested for reduced-motion or
// no-WebGL2 visitors -- not just paused after download.
const EnergyProfileHero = dynamic(
  () =>
    import("@/components/three/energy-profile-hero").then(
      (mod) => mod.EnergyProfileHero
    ),
  { ssr: false, loading: () => <HeroStaticFallback /> }
)

export function HeroCanvasLoader() {
  const canRender3D = useCanRender3D()

  // null/false -- capability not yet known, reduced motion, or no WebGL2:
  // render the static fallback so SSR/hydration agree and the Three.js
  // chunk is never fetched for visitors who won't use it.
  if (!canRender3D) {
    return <HeroStaticFallback />
  }

  return <EnergyProfileHero />
}
