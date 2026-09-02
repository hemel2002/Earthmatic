import { describe, expect, it } from "vitest"
import {
  caseStudyFrontmatterSchema,
  insightFrontmatterSchema,
} from "@/content/types"

const validInsight = {
  title: "A valid insight",
  slug: "a-valid-insight",
  description: "A description that is long enough to satisfy the fifty character minimum easily.",
  type: "technical-note",
  datePublished: "2026-01-01",
  dateModified: "2026-01-02",
  author: { name: "Earthmatic", kind: "Organization" },
  tags: ["tag"],
  sample: true,
  ogImageAlt: "Alt text",
}

const validCaseStudy = {
  title: "A valid case study",
  clientLabel: "A client",
  sector: "textile-rmg",
  service: "energy-audit",
  year: 2025,
  results: [
    { label: "A", value: "1" },
    { label: "B", value: "2" },
    { label: "C", value: "3" },
  ],
  relatedServiceSlug: "energy-audit",
  sample: true,
  description: "A description that is long enough to satisfy the fifty character minimum easily.",
  datePublished: "2026-01-01",
  dateModified: "2026-01-02",
}

describe("insightFrontmatterSchema", () => {
  it("accepts valid frontmatter", () => {
    expect(insightFrontmatterSchema.safeParse(validInsight).success).toBe(true)
  })

  it("rejects a description under 50 characters", () => {
    const result = insightFrontmatterSchema.safeParse({
      ...validInsight,
      description: "Too short",
    })
    expect(result.success).toBe(false)
  })

  it("rejects an invalid type", () => {
    const result = insightFrontmatterSchema.safeParse({
      ...validInsight,
      type: "not-a-real-type",
    })
    expect(result.success).toBe(false)
  })

  it("requires sample to be explicitly set", () => {
    const { sample: _sample, ...withoutSample } = validInsight
    const result = insightFrontmatterSchema.safeParse(withoutSample)
    expect(result.success).toBe(false)
  })
})

describe("caseStudyFrontmatterSchema", () => {
  it("accepts valid frontmatter", () => {
    expect(caseStudyFrontmatterSchema.safeParse(validCaseStudy).success).toBe(true)
  })

  it("rejects fewer than 3 results", () => {
    const result = caseStudyFrontmatterSchema.safeParse({
      ...validCaseStudy,
      results: validCaseStudy.results.slice(0, 2),
    })
    expect(result.success).toBe(false)
  })

  it("rejects an unknown sector", () => {
    const result = caseStudyFrontmatterSchema.safeParse({
      ...validCaseStudy,
      sector: "not-a-real-sector",
    })
    expect(result.success).toBe(false)
  })
})
