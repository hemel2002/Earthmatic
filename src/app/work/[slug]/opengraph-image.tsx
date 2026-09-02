import { getWorkBySlug } from "@/content/work"
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image"

export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getWorkBySlug(slug)

  return renderOgImage({
    eyebrow: "Case study",
    title: study?.title ?? "Earthmatic case study",
  })
}
