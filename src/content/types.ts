import { z } from "zod"

// Zod-validated at build time -- a malformed or incomplete MDX frontmatter
// file fails the build, not a runtime 500. `sample` has no default so every
// piece forces an explicit editorial call about whether it's placeholder.

export const insightFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().min(50).max(170),
  type: z.enum(["regulation-explainer", "technical-note", "market-note"]),
  datePublished: z.string(),
  dateModified: z.string(),
  author: z.object({
    name: z.string(),
    kind: z.enum(["Organization", "Person"]),
    jobTitle: z.string().optional(),
  }),
  tags: z.array(z.string()),
  sample: z.boolean(),
  ogImageAlt: z.string(),
})

export type InsightFrontmatter = z.infer<typeof insightFrontmatterSchema>
export interface Insight extends InsightFrontmatter {
  content: string
}

export const caseStudyResultSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export const caseStudyFrontmatterSchema = z.object({
  title: z.string(),
  clientLabel: z.string(),
  sector: z.enum([
    "textile-rmg",
    "food-beverage",
    "pharmaceuticals",
    "cement-ceramics",
    "commercial-real-estate",
    "development-programmes",
  ]),
  service: z.enum([
    "carbon-accounting",
    "energy-audit",
    "carbon-projects",
    "compliance-and-reporting",
    "verification-support",
  ]),
  year: z.number(),
  results: z.array(caseStudyResultSchema).length(3),
  quote: z
    .object({ text: z.string(), attribution: z.string() })
    .optional(),
  relatedServiceSlug: z.string(),
  sample: z.boolean(),
  description: z.string().min(50).max(170),
  datePublished: z.string(),
  dateModified: z.string(),
})

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>
export interface CaseStudy extends CaseStudyFrontmatter {
  slug: string
  content: string
}
