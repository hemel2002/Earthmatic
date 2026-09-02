import type { Metadata } from "next"
import { SectionHeading } from "@/components/marketing/section-heading"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/components/seo/schema"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Earthmatic was started because the numbers were not good enough. How the firm works, its team, and where it operates across South Asia.",
  path: "/about",
})

const PRINCIPLES = [
  {
    title: "We show the calculation.",
    body: "Every figure we deliver traces back to its source data and method. Nothing is a black box, including to you.",
  },
  {
    title: "We measure before we model.",
    body: "Instrumentation and site data come first. Estimates fill genuine gaps, never convenience.",
  },
  {
    title: "We build for handover.",
    body: "You get the working model, not a locked report. The system is yours to run after we leave.",
  },
  {
    title: "We say when a project does not stack up.",
    body: "If a carbon project or efficiency measure will not credibly clear the bar, we tell you before you spend on it.",
  },
]

const TEAM_PLACEHOLDER = [
  { role: "Engineering lead", note: "Credentials pending publication." },
  { role: "Carbon accounting lead", note: "Credentials pending publication." },
  { role: "Field operations lead", note: "Credentials pending publication." },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading level="h1" eyebrow="About" title="We started because the numbers were not good enough." />
        <div className="mt-6 flex flex-col gap-4 text-base text-muted-foreground">
          <p>
            Factories across South Asia were being asked for emissions data
            they had no way to produce. The software built to hold that data
            assumed a level of submetering and record-keeping that most
            industrial sites in the region simply do not have. Meanwhile, the
            engineering capability needed to generate credible primary data —
            instrumented audits, boundary-setting, emission-factor
            selection — sat in different companies entirely from the
            software meant to store it.
          </p>
          <p>
            Earthmatic was built to close that gap directly: engineers who
            measure the operation, and the software to keep what they find
            current, from the same firm.
          </p>
        </div>
      </section>

      <section id="how-we-work" className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How we work" title="Four principles" className="mb-12" />
          <div className="grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Team" title="The team" className="mb-8" />
        <PlaceholderBadge note="Team photos and verified credentials are being finalised for publication." />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TEAM_PLACEHOLDER.map((member) => (
            <div
              key={member.role}
              className="rounded-lg border border-dashed border-border bg-card/40 p-6"
            >
              <div className="h-16 w-16 rounded-full bg-ink-800" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-sm font-semibold text-foreground">
                {member.role}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{member.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Where we work" title="Bangladesh primary, regional capability" className="mb-4" />
          <p className="text-base text-muted-foreground">
            Earthmatic is based in Dhaka and works primarily with industrial
            operations in Bangladesh, with engagement capability extending
            across South Asia’s manufacturing and development sector
            programmes.
          </p>
        </div>
      </section>
    </>
  )
}
