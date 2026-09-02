import type { Metadata } from "next"
import Link from "next/link"
import { SectionHeading } from "@/components/marketing/section-heading"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/components/seo/schema"
import { getAllInsights } from "@/content/insights"
import { buildMetadata } from "@/lib/metadata"
import type { InsightFrontmatter } from "@/content/types"

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Regulation explainers, technical notes and market notes on carbon accounting, energy audits and industrial decarbonisation in South Asia.",
  path: "/insights",
})

const TYPE_LABELS: Record<InsightFrontmatter["type"], string> = {
  "regulation-explainer": "Regulation explainer",
  "technical-note": "Technical note",
  "market-note": "Market note",
}

export default function InsightsPage() {
  const insights = getAllInsights()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          level="h1"
          eyebrow="Insights"
          title="Regulation, method and the market"
          description="Regulation explainers, technical notes and market commentary — written for the person who has to act on it, not just read about it."
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <ul className="flex flex-col gap-6">
          {insights.map((insight) => (
            <li
              key={insight.slug}
              className="rounded-lg border border-border bg-card p-6"
            >
              {insight.sample ? (
                <PlaceholderBadge note="Published as an illustrative example ahead of full editorial launch." />
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>{TYPE_LABELS[insight.type]}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={insight.dateModified}>
                  Last updated {insight.dateModified}
                </time>
              </div>
              <Link
                href={`/insights/${insight.slug}`}
                className="mt-2 block font-heading text-xl font-semibold text-foreground hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {insight.title}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                {insight.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
