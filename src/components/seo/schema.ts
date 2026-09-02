import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants"

// JSON-LD only, per the seo skill's rule (never microdata/RDFa).
// Each builder returns a plain object; render via <JsonLd data={...} />.

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.addressLines[1],
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [CONTACT.linkedin],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: new URL(input.path, SITE_URL).toString(),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "South Asia",
  }
}

export function howToSchema(input: {
  name: string
  steps: { label: string; description: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    step: input.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.label,
      text: step.description,
    })),
  }
}

export function articleSchema(input: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified: string
  authorName: string
  authorIsOrganization: boolean
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: new URL(input.path, SITE_URL).toString(),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": input.authorIsOrganization ? "Organization" : "Person",
      name: input.authorName,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
