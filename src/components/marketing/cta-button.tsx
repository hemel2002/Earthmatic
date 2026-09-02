import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Earthmatic's brief specifies exactly two CTAs sitewide, meaningful because
// they stay rare: "Book an assessment" (primary) and "Download the [X] guide"
// (secondary). No other component should render an ad hoc CTA button --
// route every call-to-action through this component instead.
type CtaIntent = "book-assessment" | "download-guide" | "secondary-link"

interface CtaButtonProps {
  intent: CtaIntent
  /** Required when intent is "download-guide", e.g. "Platform" -> "Download the Platform guide". */
  guideLabel?: string
  /** Required when intent is "secondary-link", e.g. "See how we work". */
  label?: string
  href?: string
  variant?: "default" | "outline"
  size?: "default" | "lg"
  className?: string
}

export function CtaButton({
  intent,
  guideLabel,
  label,
  href,
  variant,
  size = "default",
  className,
}: CtaButtonProps) {
  let copy: string
  let target: string
  let resolvedVariant: "default" | "outline" = variant ?? "default"

  if (intent === "book-assessment") {
    copy = "Book an assessment"
    target = href ?? "/contact#assessment"
  } else if (intent === "download-guide") {
    if (!guideLabel) {
      throw new Error("CtaButton: guideLabel is required for intent=\"download-guide\"")
    }
    copy = `Download the ${guideLabel} guide`
    target = href ?? "/contact#enquiry"
    resolvedVariant = variant ?? "outline"
  } else {
    if (!label || !href) {
      throw new Error("CtaButton: label and href are required for intent=\"secondary-link\"")
    }
    copy = label
    target = href
    resolvedVariant = variant ?? "outline"
  }

  return (
    <Button
      asChild
      variant={resolvedVariant}
      size={size}
      className={cn(
        "transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] active:translate-y-0 active:scale-[0.97]",
        className
      )}
    >
      <Link href={target}>{copy}</Link>
    </Button>
  )
}
