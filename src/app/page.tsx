import Link from "next/link"
import type { Metadata } from "next"
import { HeroCanvasLoader } from "@/components/three/hero-canvas-loader"
import { CtaButton } from "@/components/marketing/cta-button"
import { SectionHeading } from "@/components/marketing/section-heading"
import { CaseStudyCard } from "@/components/marketing/case-study-card"
import { JsonLd } from "@/components/seo/json-ld"
import { getAllWork } from "@/content/work"
import { buildMetadata } from "@/lib/metadata"
import { SECTORS, STANDARDS } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Climate data you can defend",
  description:
    "Earthmatic measures energy and carbon in industrial operations across South Asia, then builds the systems that keep those numbers accurate year after year.",
  path: "/",
  ogImageAlt: "Earthmatic — climate data you can defend",
})

const PROBLEM_COLUMNS = [
  {
    heading: "Buyers are asking harder questions.",
    body: "European and North American brands now require supplier-level emissions data, verified and traceable. Estimates and industry averages no longer clear the bar.",
  },
  {
    heading: "Regulation is tightening.",
    body: "CSRD, CBAM and the ICVCM Core Carbon Principles all shift the burden onto primary data. A spreadsheet assembled once a year will not survive assurance.",
  },
  {
    heading: "The expertise is thin on the ground.",
    body: "Global platforms do not send anyone to your site. Local consultants deliver a PDF and disappear. Neither leaves you with a system.",
  },
]

const WHAT_WE_DO = [
  {
    name: "Carbon accounting",
    body: "Scope 1, 2 and 3 inventories built to the GHG Protocol, with the data lineage to survive third-party assurance.",
    href: "/services#carbon-accounting",
  },
  {
    name: "Energy audits",
    body: "Detailed measurement of electrical, thermal and process loads, with costed efficiency measures ranked by payback.",
    href: "/services#energy-audit",
  },
  {
    name: "Carbon project development",
    body: "Feasibility, methodology selection and registry pathway for projects that can credibly generate credits.",
    href: "/services#carbon-projects",
  },
  {
    name: "The Earthmatic platform",
    body: "Software that holds your emissions data, energy meters and evidence trail in one auditable place.",
    href: "/platform",
  },
]

export default function HomePage() {
  const caseStudies = getAllWork().slice(0, 3)

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Earthmatic — Climate data you can defend",
        }}
      />

      {/* Section 1: Hero. The H1/body/CTAs are the LCP candidate -- plain
          server-rendered text, never the canvas (canvas isn't in Chrome's LCP
          candidate set regardless, but this keeps the visual hierarchy honest
          too: text loads and reads instantly, the 3D piece is a bonus). */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-24 lg:pb-28 lg:px-8">
        <div className="flex flex-col gap-6">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Climate data you can defend.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Earthmatic measures energy and carbon in industrial operations
            across South Asia, then builds the systems that keep those
            numbers accurate year after year. Audit-grade methodology,
            delivered by engineers who have been on the factory floor.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaButton intent="book-assessment" size="lg" />
            <CtaButton
              intent="secondary-link"
              label="See how we work"
              href="/services"
              size="lg"
            />
          </div>
        </div>
        <HeroCanvasLoader />
      </section>

      {/* Section 2: The problem */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The problem"
            title="The reporting burden is arriving faster than the capacity to meet it."
            className="mb-12"
          />
          <div className="grid gap-8 sm:grid-cols-3">
            {PROBLEM_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {column.heading}
                </h3>
                <p className="text-sm text-muted-foreground">{column.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What we do */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Four things, done properly."
          className="mb-12"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
          {WHAT_WE_DO.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <h3 className="font-heading text-base font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <CtaButton
            intent="secondary-link"
            label="Explore our services"
            href="/services"
          />
        </div>
      </section>

      {/* Section 4: Differentiator */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            We are the only firm in this market that does the fieldwork and
            builds the software.
          </p>
          <p className="mt-6 text-base text-muted-foreground">
            Most carbon platforms sell a dashboard and leave the data
            collection to you. Most engineering consultancies deliver a
            report and leave the data to decay. Earthmatic does both, which
            means the measurement methodology and the software that stores
            it were designed by the same people.
          </p>
        </div>
      </section>

      {/* Section 5: Sectors served */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Sectors served
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {SECTORS.map((sector) => (
            <li
              key={sector.slug}
              className="font-heading text-sm text-foreground/80"
            >
              {sector.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 6: Proof */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Proof" title="Recent results" className="mb-12" />
          <div className="grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
          <div className="mt-10">
            <CtaButton intent="secondary-link" label="See all work" href="/work" />
          </div>
        </div>
      </section>

      {/* Section 7: Standards and methodology strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Standards and methodology
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {STANDARDS.map((standard) => (
            <li key={standard} className="font-mono text-sm text-foreground/80">
              {standard}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          We work to published standards and we will show you the
          calculation.
        </p>
      </section>

      {/* Section 8: Closing CTA */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Start with an assessment.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A structured two-week review of your energy and emissions
            position, delivered as a costed roadmap. No obligation to
            continue.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton intent="book-assessment" size="lg" />
          </div>
        </div>
      </section>
    </>
  )
}
