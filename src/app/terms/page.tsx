import type { Metadata } from "next"
import { SectionHeading } from "@/components/marketing/section-heading"
import { PlaceholderBadge } from "@/components/marketing/placeholder-badge"
import { buildMetadata } from "@/lib/metadata"
import { CONTACT } from "@/lib/constants"

export const metadata: Metadata = buildMetadata({
  title: "Terms of use",
  description: "Terms governing use of the Earthmatic website.",
  path: "/terms",
  noIndex: true,
})

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading level="h1" eyebrow="Legal" title="Terms of use" className="mb-6" />
      <PlaceholderBadge note="Placeholder terms pending legal review before launch." />
      <div className="mt-6 flex flex-col gap-4 text-sm text-muted-foreground">
        <p>
          This website is provided by Earthmatic for informational purposes.
          Content on this site — including case studies, methodology
          descriptions and platform features — describes Earthmatic’s
          services and does not itself constitute a binding service
          agreement; engagement terms are set out separately for each
          client.
        </p>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-amber-400 hover:underline">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
