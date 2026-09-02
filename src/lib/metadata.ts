import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

interface BuildMetadataInput {
  title: string
  description: string
  path: string
  ogImageAlt?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  ogImageAlt,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString()

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: `${path === "/" ? "" : path}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
