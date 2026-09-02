import { PROCESS_STEPS } from "@/lib/constants"

// Reused verbatim on Home and the Services hub (brief: "This process graphic
// should be reused on every service page so the site feels coherent").
export function ProcessStrip() {
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
      {PROCESS_STEPS.map((step, index) => (
        <li key={step.label} className="relative flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-amber-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-[var(--process-strip-connector)]" />
          </div>
          <span className="font-heading text-sm font-semibold text-foreground">
            {step.label}
          </span>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
