"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CtaButton } from "@/components/marketing/cta-button"
import { NAV_LINKS, SERVICES, SITE_NAME } from "@/lib/constants"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu aria-hidden="true" className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[360px]">
          <SheetHeader>
            <SheetTitle className="font-heading">{SITE_NAME}</SheetTitle>
          </SheetHeader>
          <nav aria-label="Primary" className="flex flex-col gap-1 px-4">
            <span className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Services
            </span>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground"
              >
                {service.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {NAV_LINKS.filter((link) => link.href !== "/services").map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-base font-medium text-foreground hover:bg-accent"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="mt-4 px-4">
            <CtaButton
              intent="book-assessment"
              className="w-full"
              size="lg"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
