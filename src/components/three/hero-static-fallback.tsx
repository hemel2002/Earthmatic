import {
  PROFILE_LENGTH,
  REDUCED_PROFILE,
  REDUCTION_MASK,
} from "@/components/three/energy-profile-data"

const VIEW_WIDTH = 480
const VIEW_HEIGHT = 300
const BASELINE = 264
const MAX_BAR_HEIGHT = 220
const BAR_WIDTH = 12
const GAP = (VIEW_WIDTH - PROFILE_LENGTH * BAR_WIDTH) / (PROFILE_LENGTH + 1)

// Same underlying profile data as the 3D scene, rendered as static SVG so the
// reduced-motion / no-WebGL2 fallback is a structural swap with an identical
// aspect ratio (no CLS), not just "pause the canvas".
export function HeroStaticFallback() {
  return (
    <div className="hero-canvas-wrap w-full" aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="h-full w-full"
        role="presentation"
      >
        <line
          x1={0}
          y1={BASELINE}
          x2={VIEW_WIDTH}
          y2={BASELINE}
          stroke="#262b3a"
          strokeWidth={1}
        />
        {REDUCED_PROFILE.map((value, index) => {
          const height = Math.max(value * MAX_BAR_HEIGHT, 4)
          const x = GAP + index * (BAR_WIDTH + GAP)
          const y = BASELINE - height
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={BAR_WIDTH}
              height={height}
              fill={REDUCTION_MASK[index] ? "#e0a53f" : "#5b6478"}
            />
          )
        })}
      </svg>
    </div>
  )
}
