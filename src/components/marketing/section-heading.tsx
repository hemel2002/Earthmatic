import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
  /** Defaults to h2 (a section heading within a page). Pass "h1" only for
   * the page's single primary heading -- every page must have exactly one. */
  level?: "h1" | "h2"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
          {eyebrow}
        </span>
      ) : null}
      <Heading className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
