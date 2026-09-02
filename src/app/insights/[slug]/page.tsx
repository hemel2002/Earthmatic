import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { CtaButton } from "@/components/marketing/cta-button"
import { JsonLd } from "@/components/seo/json-ld"
import { articleSchema, breadcrumbSchema } from "@/components/seo/schema"
import { getAllInsights, getInsightBySlug } from "@/content/insights"
import { buildMetadata } from "@/lib/metadata"
import type { InsightFrontmatter } from "@/content/types"

const TYPE_LABELS: Record<InsightFrontmatter["type"], string> = {
  "regulation-explainer": "Regulation explainer",
  "technical-note": "Technical note",
  "market-note": "Market note",
}

export function generateStaticParams() {
  return getAllInsights().map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) return {}

  return buildMetadata({
    title: insight.title,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    ogImageAlt: insight.ogImageAlt,
  })
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = getInsightBySlug(slug)
  if (!insight) notFound()

  const { content } = await compileMDX({
    source: insight.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
  })

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]),
          articleSchema({
            title: insight.title,
            description: insight.description,
            path: `/insights/${insight.slug}`,
            datePublished: insight.datePublished,
            dateModified: insight.dateModified,
            authorName: insight.author.name,
            authorIsOrganization: insight.author.kind === "Organization",
          }),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {insight.sample ? (
          <PlaceholderBadge note="Published as an illustrative example ahead of full editorial launch." />
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <span>{TYPE_LABELS[insight.type]}</span>
          <span aria-hidden="true">·</span>
          <span>{insight.author.name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={insight.dateModified}>
            Last updated {insight.dateModified}
          </time>
        </div>

        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {insight.title}
        </h1>

        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-heading prose-a:text-amber-400">
          {content}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <CtaButton intent="book-assessment" />
        </div>
      </article>
    </>
  )
}
