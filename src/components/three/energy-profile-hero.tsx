"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { EnergyProfileScene } from "@/components/three/energy-profile-scene"
import { useInView } from "@/hooks/use-in-view"

export function EnergyProfileHero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const onVisibilityChange = () =>
      setTabVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-canvas-wrap w-full"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView && tabVisible ? "always" : "never"}
        camera={{ position: [7, 4, 9], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <EnergyProfileScene />
      </Canvas>
    </div>
  )
}
