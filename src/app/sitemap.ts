import type { MetadataRoute } from "next"
import { getAllInsights } from "@/content/insights"
import { getAllWork } from "@/content/work"
import { SITE_URL } from "@/lib/constants"

const STATIC_PATHS = [
  "/",
  "/services",
  "/platform",
  "/work",
  "/insights",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }))

  const insightEntries: MetadataRoute.Sitemap = getAllInsights().map(
    (insight) => ({
      url: new URL(`/insights/${insight.slug}`, SITE_URL).toString(),
      lastModified: new Date(insight.dateModified),
    })
  )

  const workEntries: MetadataRoute.Sitemap = getAllWork().map((item) => ({
    url: new URL(`/work/${item.slug}`, SITE_URL).toString(),
    lastModified: new Date(item.dateModified),
  }))

  return [...staticEntries, ...insightEntries, ...workEntries]
}
