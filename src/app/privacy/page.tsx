import type { Metadata } from "next"
import { SectionHeading } from "@/components/marketing/section-heading"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { buildMetadata } from "@/lib/metadata"
import { CONTACT } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How Earthmatic collects, uses and protects information submitted through this site.",
  path: "/privacy",
  noIndex: true,
})

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading level="h1" eyebrow="Legal" title="Privacy policy" className="mb-6" />
      <PlaceholderBadge note="Placeholder policy text pending legal review before launch." />
      <div className="mt-6 flex flex-col gap-4 text-sm text-muted-foreground">
        <p>
          Earthmatic collects information you submit through the assessment
          and enquiry forms on this site — including name, company, contact
          details and the content of your message — solely to respond to
          your enquiry and, where you proceed, to deliver the engagement you
          requested.
        </p>
        <p>
          We do not sell or share this information with third parties for
          marketing purposes. Data submitted through this site is retained
          for as long as needed to respond to your enquiry and meet our
          record-keeping obligations.
        </p>
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-amber-400 hover:underline">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
