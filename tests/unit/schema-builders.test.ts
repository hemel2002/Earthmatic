import { describe, expect, it } from "vitest"
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from "@/components/seo/schema"

describe("JSON-LD schema builders", () => {
  it("organizationSchema produces a valid Organization node", () => {
    const result = organizationSchema()
    expect(result["@type"]).toBe("Organization")
    expect(result["@context"]).toBe("https://schema.org")
    expect(result.name).toBe("Earthmatic")
  })

  it("websiteSchema references the same organization id", () => {
    const org = organizationSchema()
    const site = websiteSchema()
    expect(site.publisher["@id"]).toBe(org["@id"])
  })

  it("breadcrumbSchema numbers items starting at 1 in order", () => {
    const result = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ])
    expect(result.itemListElement[0].position).toBe(1)
    expect(result.itemListElement[1].position).toBe(2)
    expect(result.itemListElement[1].name).toBe("Services")
  })

  it("serviceSchema includes the provided name and description", () => {
    const result = serviceSchema({
      name: "Energy audits",
      description: "A description",
      path: "/services#energy-audit",
    })
    expect(result["@type"]).toBe("Service")
    expect(result.name).toBe("Energy audits")
  })

  it("howToSchema maps steps to HowToStep entries", () => {
    const result = howToSchema({
      name: "Process",
      steps: [{ label: "Scope", description: "Define boundaries." }],
    })
    expect(result.step).toHaveLength(1)
    expect(result.step[0]["@type"]).toBe("HowToStep")
    expect(result.step[0].name).toBe("Scope")
  })

  it("articleSchema sets author type based on authorIsOrganization", () => {
    const orgAuthor = articleSchema({
      title: "T",
      description: "D",
      path: "/insights/t",
      datePublished: "2026-01-01",
      dateModified: "2026-01-02",
      authorName: "Earthmatic",
      authorIsOrganization: true,
    })
    expect(orgAuthor.author["@type"]).toBe("Organization")

    const personAuthor = articleSchema({
      title: "T",
      description: "D",
      path: "/insights/t",
      datePublished: "2026-01-01",
      dateModified: "2026-01-02",
      authorName: "A Person",
      authorIsOrganization: false,
    })
    expect(personAuthor.author["@type"]).toBe("Person")
  })

  it("faqSchema maps question/answer pairs correctly", () => {
    const result = faqSchema([{ question: "Q?", answer: "A." }])
    expect(result.mainEntity[0].name).toBe("Q?")
    expect(result.mainEntity[0].acceptedAnswer.text).toBe("A.")
  })
})
