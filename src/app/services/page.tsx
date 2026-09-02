import type { Metadata } from "next"
import { ServiceCard } from "@/components/marketing/service-card"
import { ProcessStrip } from "@/components/marketing/process-strip"
import { SectionHeading } from "@/components/marketing/section-heading"
import { CtaButton } from "@/components/marketing/cta-button"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema, howToSchema, serviceSchema } from "@/components/seo/schema"
import { buildMetadata } from "@/lib/metadata"
import { PROCESS_STEPS, SERVICES } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Earthmatic works across the full arc of industrial decarbonisation: establishing the baseline, finding the reductions, proving them to third parties, and maintaining the system.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...SERVICES.map((service) =>
            serviceSchema({
              name: service.name,
              description: service.descriptor,
              path: `/services#${service.slug}`,
            })
          ),
          howToSchema({
            name: "How an Earthmatic engagement runs",
            steps: PROCESS_STEPS.map((step) => ({
              label: step.label,
              description: step.description,
            })),
          }),
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          level="h1"
          eyebrow="Services"
          title="Services"
          description="Earthmatic works across the full arc of industrial decarbonisation: establishing the baseline, finding the reductions, proving them to third parties, and maintaining the system that keeps it all current. Most clients start with one service and expand as the reporting requirements on them grow."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Process"
            title="How an engagement runs"
            className="mb-12"
          />
          <ProcessStrip />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Not sure where to start?
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          A short discovery call is enough to scope the right first
          engagement.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton intent="book-assessment" size="lg" />
        </div>
      </section>
    </>
  )
}
