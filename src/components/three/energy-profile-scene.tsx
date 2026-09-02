"use client"

import { useMemo, useRef } from "react"
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import { Color, Object3D } from "three"
import type { Group, InstancedMesh } from "three"
import {
  BASE_PROFILE,
  PROFILE_LENGTH,
  REDUCED_PROFILE,
  REDUCTION_MASK,
} from "@/components/three/energy-profile-data"

const BAR_WIDTH = 0.6
const BAR_GAP = 0.9
const MAX_HEIGHT = 4.5
const TRANSITION_SECONDS = 2.2
const BASE_TILT: [number, number] = [-0.18, 0.3]
const PARALLAX_STRENGTH = 0.16
const IDLE_DRIFT_AMPLITUDE = 0.12

const INK_COLOR = new Color("#5b6478")
const AMBER_COLOR = new Color("#e0a53f")
const HOVER_COLOR = new Color("#ffd27a")

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export interface HoverInfo {
  hour: string
  load: string
  status: "optimized" | "baseline"
  clientX: number
  clientY: number
}

interface EnergyProfileSceneProps {
  onHover: (info: HoverInfo | null) => void
}

export function EnergyProfileScene({ onHover }: EnergyProfileSceneProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const groupRef = useRef<Group>(null)
  const elapsedRef = useRef(0)
  const hoveredRef = useRef<number | null>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const totalWidth = (PROFILE_LENGTH - 1) * BAR_GAP
  const pointer = useThree((state) => state.pointer)

  const colorForIndex = (i: number) =>
    REDUCTION_MASK[i] ? AMBER_COLOR : INK_COLOR

  const setHover = (index: number | null, event?: ThreeEvent<PointerEvent>) => {
    const mesh = meshRef.current
    if (!mesh) return
    if (hoveredRef.current === index) return

    if (hoveredRef.current !== null) {
      mesh.setColorAt(hoveredRef.current, colorForIndex(hoveredRef.current))
    }
    if (index !== null) {
      mesh.setColorAt(index, HOVER_COLOR)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    hoveredRef.current = index

    if (index === null) {
      onHover(null)
    } else if (event) {
      const value = REDUCED_PROFILE[index]
      onHover({
        hour: `${String(index).padStart(2, "0")}:00`,
        load: `${Math.round(value * 100)}%`,
        status: REDUCTION_MASK[index] ? "optimized" : "baseline",
        clientX: event.nativeEvent.clientX,
        clientY: event.nativeEvent.clientY,
      })
    }
  }

  useFrame((state, delta) => {
    const mesh = meshRef.current
    const group = groupRef.current
    if (!mesh) return

    if (elapsedRef.current < TRANSITION_SECONDS) {
      elapsedRef.current = Math.min(
        elapsedRef.current + delta,
        TRANSITION_SECONDS
      )
      const progress = easeOutCubic(elapsedRef.current / TRANSITION_SECONDS)

      for (let i = 0; i < PROFILE_LENGTH; i++) {
        const value =
          BASE_PROFILE[i] +
          (REDUCED_PROFILE[i] - BASE_PROFILE[i]) * progress
        const height = Math.max(value * MAX_HEIGHT, 0.05)

        dummy.position.set(i * BAR_GAP - totalWidth / 2, height / 2, 0)
        dummy.scale.set(1, height, 1)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)

        // Every instance needs an explicit setColorAt call at least once --
        // three.js lazily allocates the instanceColor buffer on first use and
        // fills untouched instances white, so the non-reduction bars must be
        // set too or they'd render white instead of ink-gray.
        if (i !== hoveredRef.current) {
          mesh.setColorAt(
            i,
            REDUCTION_MASK[i] ? INK_COLOR.clone().lerp(AMBER_COLOR, progress) : INK_COLOR
          )
        }
      }

      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    // Pointer parallax: tilt toward the cursor, blended with a slow idle
    // drift so the scene never looks static even when the pointer is away.
    if (group) {
      const idle = Math.sin(state.clock.elapsedTime * 0.15) * IDLE_DRIFT_AMPLITUDE
      const targetX = BASE_TILT[0] - pointer.y * PARALLAX_STRENGTH
      const targetY = BASE_TILT[1] + idle + pointer.x * PARALLAX_STRENGTH
      group.rotation.x += (targetX - group.rotation.x) * Math.min(delta * 3, 1)
      group.rotation.y += (targetY - group.rotation.y) * Math.min(delta * 3, 1)
    }
  })

  return (
    <group ref={groupRef} rotation={[BASE_TILT[0], BASE_TILT[1], 0]}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, PROFILE_LENGTH]}
        castShadow={false}
        receiveShadow={false}
        onPointerMove={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          if (event.instanceId !== undefined) setHover(event.instanceId, event)
        }}
        onPointerOut={() => setHover(null)}
      >
        <boxGeometry args={[BAR_WIDTH, 1, BAR_WIDTH]} />
        <meshStandardMaterial
          color={INK_COLOR}
          roughness={0.55}
          metalness={0.1}
          toneMapped={false}
        />
      </instancedMesh>
      <gridHelper
        args={[totalWidth + BAR_GAP * 2, 24, "#3a4155", "#262b3a"]}
        position={[0, 0, 0]}
      />
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} />
    </group>
  )
}
