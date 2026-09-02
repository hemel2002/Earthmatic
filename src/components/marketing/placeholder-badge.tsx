import { Badge } from "@/components/ui/badge"

interface PlaceholderBadgeProps {
  /** Factual, non-committal disclosure -- never presented as a real client claim. */
  note: string
}

// Deliberately muted (not amber) so it never reads as a feature flag or promo
// chip -- see [[project-skills-installed]] decision: placeholder content must
// be visibly marked, not fabricated as real.
export function PlaceholderBadge({ note }: PlaceholderBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <Badge
        variant="outline"
        className="border-ink-600 bg-ink-800 text-ink-300"
      >
        Illustrative example
      </Badge>
      <span>{note}</span>
    </div>
  )
}
