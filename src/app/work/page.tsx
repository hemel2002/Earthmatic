import type { Metadata } from "next"
import { CaseStudyCard } from "@/components/marketing/case-study-card"
import { SectionHeading } from "@/components/marketing/section-heading"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/components/seo/schema"
import { getAllWork } from "@/content/work"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from Earthmatic's carbon accounting, energy audit and carbon project engagements across South Asian industrial operations.",
  path: "/work",
})

export default function WorkPage() {
  const caseStudies = getAllWork()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          level="h1"
          eyebrow="Work"
          title="Results, by the numbers"
          description="What we do is measurable, so this is what it looks like when it works. Anonymised where client agreements require it; the method stays specific either way."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </>
  )
}
