"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { SERVICES } from "@/lib/constants"

export function ServicesNavDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[420px] gap-1 p-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/services#${service.slug}`}
                      className="block rounded-md p-3 hover:bg-accent"
                    >
                      <div className="font-heading text-sm font-medium text-foreground">
                        {service.name}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.descriptor}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
