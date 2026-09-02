import Link from "next/link"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { StatCard } from "@/components/marketing/stat-card"
import type { CaseStudy } from "@/content/types"

const SECTOR_LABELS: Record<CaseStudy["sector"], string> = {
  "textile-rmg": "Textile and RMG",
  "food-beverage": "Food and beverage",
  pharmaceuticals: "Pharmaceuticals",
  "cement-ceramics": "Cement and ceramics",
  "commercial-real-estate": "Commercial real estate",
  "development-programmes": "Development sector programmes",
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
      {study.sample ? (
        <PlaceholderBadge note="Client identity withheld; figures illustrative of a representative engagement." />
      ) : null}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
        <span>{SECTOR_LABELS[study.sector]}</span>
        <span aria-hidden="true">·</span>
        <span>{study.year}</span>
      </div>
      <Link
        href={`/work/${study.slug}`}
        className="font-heading text-lg font-semibold text-foreground hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        {study.title}
      </Link>
      <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
        {study.results.map((result) => (
          <StatCard key={result.label} {...result} />
        ))}
      </div>
    </article>
  )
}
