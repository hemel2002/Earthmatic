import Link from "next/link"
import { CtaButton } from "@/components/marketing/cta-button"
import { CONTACT, SERVICES, SITE_NAME, SITE_TAGLINE } from "@/lib/constants"

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/about#team", label: "Team" },
  { href: "/about#how-we-work", label: "How we work" },
  { href: "/contact", label: "Contact" },
]

const RESOURCE_LINKS = [
  { href: "/insights", label: "Insights" },
  { href: "/work", label: "Case studies" },
  { href: "/platform", label: "Platform" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-xl font-semibold text-foreground">
              {SITE_NAME}
            </span>
            <p className="max-w-xs text-sm text-muted-foreground">
              {SITE_TAGLINE}
            </p>
            <CtaButton intent="book-assessment" className="w-fit" />
          </div>

          <nav aria-label="Company">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Company
            </h2>
            <ul className="mt-4 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm text-foreground/80 hover:text-foreground"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Resources
            </h2>
            <ul className="mt-4 space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contact
            </h2>
            <address className="mt-4 space-y-1 text-sm text-foreground/80 not-italic">
              {CONTACT.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  LinkedIn
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
