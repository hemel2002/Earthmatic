import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { CtaButton } from "@/components/marketing/cta-button"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { StatCard } from "@/components/marketing/stat-card"
import { JsonLd } from "@/components/seo/json-ld"
import { articleSchema, breadcrumbSchema } from "@/components/seo/schema"
import { getAllWork, getWorkBySlug } from "@/content/work"
import { buildMetadata } from "@/lib/metadata"
import { SERVICES } from "@/lib/constants"

export function generateStaticParams() {
  return getAllWork().map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getWorkBySlug(slug)
  if (!study) return {}

  return buildMetadata({
    title: study.title,
    description: study.description,
    path: `/work/${study.slug}`,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getWorkBySlug(slug)
  if (!study) notFound()

  const { content } = await compileMDX({
    source: study.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
  })

  const relatedService = SERVICES.find(
    (service) => service.slug === study.relatedServiceSlug
  )

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
          articleSchema({
            title: study.title,
            description: study.description,
            path: `/work/${study.slug}`,
            datePublished: study.datePublished,
            dateModified: study.dateModified,
            authorName: "Earthmatic",
            authorIsOrganization: true,
          }),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {study.sample ? (
          <PlaceholderBadge note="Client identity withheld; figures illustrative of a representative engagement." />
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <span>{study.clientLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{study.year}</span>
        </div>

        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {study.title}
        </h1>

        <div className="mt-8 grid grid-cols-3 gap-4 rounded-lg border border-border bg-card p-6">
          {study.results.map((result) => (
            <StatCard key={result.label} {...result} />
          ))}
        </div>

        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-heading prose-a:text-amber-400">
          {content}
        </div>

        {study.quote ? (
          <blockquote className="mt-10 border-l-2 border-amber-500 pl-4 text-lg text-foreground/90">
            &ldquo;{study.quote.text}&rdquo;
            <footer className="mt-2 text-sm text-muted-foreground">
              — {study.quote.attribution}
            </footer>
          </blockquote>
        ) : null}

        {relatedService ? (
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            <span className="text-sm text-muted-foreground">
              Related service:
            </span>
            <CtaButton
              intent="secondary-link"
              label={relatedService.name}
              href={`/services#${relatedService.slug}`}
            />
          </div>
        ) : null}
      </article>
    </>
  )
}
