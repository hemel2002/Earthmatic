import type { Metadata } from "next"
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { SkipLink } from "@/components/layout/skip-link"
import { JsonLd } from "@/components/seo/json-ld"
import { organizationSchema, websiteSchema } from "@/components/seo/schema"
import { Toaster } from "@/components/ui/sonner"
import { buildMetadata } from "@/lib/metadata"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${SITE_NAME} — Climate data you can defend`,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Climate data you can defend`,
    template: `%s — ${SITE_NAME}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  )
}
