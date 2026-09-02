import type { Metadata } from "next"
import { CtaButton } from "@/components/marketing/cta-button"
import { SectionHeading } from "@/components/marketing/section-heading"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/components/seo/schema"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  description:
    "The Earthmatic platform holds your emissions data, energy meters and evidence trail in one auditable place. Currently in development with early clients.",
  path: "/platform",
})

const FEATURES = [
  {
    title: "One data model, every framework",
    body: "Enter activity data once. Output to GHG Protocol, CDP, SBTi progress reporting, buyer questionnaires and CBAM declarations without rebuilding the underlying numbers.",
  },
  {
    title: "Evidence attached to every figure",
    body: "Each data point links to its source document. When an auditor asks where a number came from, the answer takes seconds.",
  },
  {
    title: "Built for incomplete data",
    body: "Factories in this region do not have clean submetering. The platform handles estimation, documents the method used, flags the uncertainty, and shows you what to fix first.",
  },
  {
    title: "Energy monitoring alongside carbon",
    body: "Live consumption data from your meters, benchmarked against the specific energy consumption baselines set during your audit.",
  },
  {
    title: "Supplier data collection",
    body: "Send structured requests to your own suppliers, track responses, and pull the results straight into Scope 3.",
  },
]

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ])}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PlaceholderBadge note="The Earthmatic platform is in development, built alongside our first clients." />
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          The Earthmatic platform
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your emissions data stops living in spreadsheets.
        </p>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Every inventory we build gets handed over inside a system that
          keeps it current. Meter readings, fuel invoices, production
          volumes and supplier data flow in continuously. The calculation
          runs against a versioned methodology. The evidence trail sits
          behind every number. We are building it in the open with a small
          set of early clients before wider availability.
        </p>
        <div className="mt-8">
          <CtaButton
            intent="download-guide"
            guideLabel="Platform"
            href="/contact#enquiry"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="grid gap-6 lg:grid-cols-2 lg:items-center"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {feature.title}
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  {feature.body}
                </p>
              </div>
              <div
                aria-hidden="true"
                className={
                  "flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-card/40 font-mono text-xs text-muted-foreground " +
                  (index % 2 === 1 ? "lg:order-1" : "")
                }
              >
                Product screenshot — pending platform UI
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Security and pricing"
            title="Data residency and pricing model"
            className="mb-8"
          />
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                Security and data residency
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Client data is held under a documented access-control policy,
                with evidence documents and calculation inputs kept
                separately auditable. Region-specific hosting is scoped per
                client during onboarding.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                Pricing model
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Priced per site, per year, alongside the audit or accounting
                engagement that seeds the platform with data. We scope and
                quote after a short discovery call rather than publishing a
                flat rate, since site count and data complexity drive cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Join our early clients
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          We are onboarding a small number of clients while the platform is
          built. Book an assessment to start the conversation.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton intent="book-assessment" size="lg" />
        </div>
      </section>
    </>
  )
}
