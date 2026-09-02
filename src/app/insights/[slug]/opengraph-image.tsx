import { getInsightBySlug } from "@/content/insights"
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image"

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)

  return renderOgImage({
    eyebrow: "Insights",
    title: insight?.title ?? "Earthmatic insights",
  })
}
