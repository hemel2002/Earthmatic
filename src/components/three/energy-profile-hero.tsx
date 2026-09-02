"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { EnergyProfileScene, type HoverInfo } from "@/components/three/energy-profile-scene"
import { useInView } from "@/hooks/use-in-view"

export function EnergyProfileHero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [tabVisible, setTabVisible] = useState(true)
  const [hover, setHover] = useState<HoverInfo | null>(null)

  useEffect(() => {
    const onVisibilityChange = () =>
      setTabVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  return (
    // aria-hidden: this is a mouse-hover-only enhancement over content that's
    // already fully present as real text (the hero H1/body). It has no
    // keyboard path, so exposing it as "interactive" to assistive tech would
    // advertise a capability those users can't actually use -- worse than
    // hiding a decorative extra.
    <div ref={ref} aria-hidden="true" className="hero-canvas-wrap w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView && tabVisible ? "always" : "never"}
        camera={{ position: [7, 4, 9], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <EnergyProfileScene onHover={setHover} />
      </Canvas>

      {hover ? (
        <div
          className="pointer-events-none fixed z-50 rounded-md border border-border bg-popover/95 px-3 py-2 font-mono text-xs text-popover-foreground shadow-lg backdrop-blur-sm"
          style={{ left: hover.clientX + 14, top: hover.clientY + 14 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{hover.hour}</span>
            <span className="font-semibold text-foreground">{hover.load}</span>
          </div>
          <div
            className={
              hover.status === "optimized"
                ? "mt-0.5 text-amber-400"
                : "mt-0.5 text-muted-foreground"
            }
          >
            {hover.status === "optimized" ? "post-measure · reduced" : "baseline load"}
          </div>
        </div>
      ) : null}
    </div>
  )
}
