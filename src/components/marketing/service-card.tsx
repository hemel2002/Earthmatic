import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ServiceSummary } from "@/lib/constants"

export function ServiceCard({ slug, name, descriptor }: ServiceSummary) {
  return (
    <Link
      id={slug}
      href={`/services#${slug}`}
      className="group relative flex scroll-mt-24 flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-amber-500/0 transition-colors group-hover:border-amber-500/70"
      />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {name}
        </h3>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <p className="text-sm text-muted-foreground">{descriptor}</p>
    </Link>
  )
}
