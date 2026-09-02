import Link from "next/link"
import { ServicesNavDropdown } from "@/components/layout/services-nav-dropdown"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CtaButton } from "@/components/marketing/cta-button"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          {SITE_NAME}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          <ServicesNavDropdown />
          {NAV_LINKS.filter((link) => link.href !== "/services").map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <CtaButton intent="book-assessment" />
        </div>

        <MobileNav />
      </div>
    </header>
  )
}
