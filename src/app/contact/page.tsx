import type { Metadata } from "next"
import { SectionHeading } from "@/components/marketing/section-heading"
import { AssessmentForm } from "@/components/forms/assessment-form"
import { EnquiryForm } from "@/components/forms/enquiry-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/components/seo/schema"
import { buildMetadata } from "@/lib/metadata"
import { CONTACT } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Book an assessment, send a general enquiry, or reach Earthmatic directly. Dhaka office, email and phone.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          level="h1"
          eyebrow="Contact"
          title="Get in touch"
          description="Book a structured assessment, send a general enquiry, or reach us directly."
        />
      </section>

      <section id="assessment" className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <Tabs defaultValue="assessment">
          <TabsList className="w-full">
            <TabsTrigger value="assessment">Book an assessment</TabsTrigger>
            <TabsTrigger value="enquiry" id="enquiry">
              General enquiry
            </TabsTrigger>
          </TabsList>
          <TabsContent value="assessment" className="mt-6">
            <p className="mb-6 text-sm text-muted-foreground">
              Seven questions, so we can scope the right assessment before we
              speak.
            </p>
            <AssessmentForm />
          </TabsContent>
          <TabsContent value="enquiry" className="mt-6">
            <p className="mb-6 text-sm text-muted-foreground">
              Not ready for an assessment? Send a short message instead.
            </p>
            <EnquiryForm />
          </TabsContent>
        </Tabs>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Direct contact" title="Reach us directly" className="mb-6" />
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Assessments
              </dt>
              <dd className="mt-1 text-sm text-foreground/90">
                <a href={`mailto:${CONTACT.assessmentEmail}`} className="hover:text-amber-400">
                  {CONTACT.assessmentEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                General
              </dt>
              <dd className="mt-1 text-sm text-foreground/90">
                <a href={`mailto:${CONTACT.email}`} className="hover:text-amber-400">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phone
              </dt>
              <dd className="mt-1 text-sm text-foreground/90">
                <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="hover:text-amber-400">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Office
              </dt>
              <dd className="mt-1 text-sm text-foreground/90 not-italic">
                {CONTACT.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
