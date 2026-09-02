import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/constants"

export const ogImageSize = { width: 1200, height: 630 }
export const ogImageContentType = "image/png"

// Shared renderer for every route's opengraph-image.tsx. Deliberately uses
// next/og's default system sans-serif rather than loading our custom
// webfonts here -- OG images render once at request/build time off the
// visible page, so keeping this dependency-free (no font fetch/self-host
// step) is the efficient tradeoff for this pass.
export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0e1017",
          backgroundImage:
            "linear-gradient(135deg, #0e1017 0%, #141826 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 600,
            color: "#f4f5f7",
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: 4,
              color: "#e0a53f",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#f4f5f7",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  )
}
