export const SITE_NAME = "Earthmatic"
export const SITE_TAGLINE = "Measured. Verified. Reduced."
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.earthmatic.example"
export const SITE_DESCRIPTION =
  "Earthmatic measures energy and carbon in industrial operations across South Asia, then builds the systems that keep those numbers accurate year after year."

export const CONTACT = {
  email: "hello@earthmatic.example",
  assessmentEmail: "assessments@earthmatic.example",
  phone: "+880 2 0000 0000",
  addressLines: ["Earthmatic", "Gulshan Avenue", "Dhaka 1212, Bangladesh"],
  linkedin: "https://www.linkedin.com/company/earthmatic",
}

export interface ServiceSummary {
  slug: string
  name: string
  descriptor: string
}

export const SERVICES: ServiceSummary[] = [
  {
    slug: "carbon-accounting",
    name: "Carbon accounting",
    descriptor:
      "Scope 1, 2 and 3 inventories built to the GHG Protocol, with the data lineage to survive third-party assurance.",
  },
  {
    slug: "energy-audit",
    name: "Energy audits",
    descriptor:
      "Detailed measurement of electrical, thermal and process loads, with costed efficiency measures ranked by payback.",
  },
  {
    slug: "carbon-projects",
    name: "Carbon project development",
    descriptor:
      "Feasibility, methodology selection and registry pathway for projects that can credibly generate credits.",
  },
  {
    slug: "compliance-and-reporting",
    name: "Compliance & reporting",
    descriptor:
      "CSRD, CBAM and buyer-questionnaire reporting built on the same underlying data model, not rebuilt each time.",
  },
  {
    slug: "verification-support",
    name: "Verification support",
    descriptor:
      "Assurance-ready evidence packages and direct support through third-party verification and validation.",
  },
]

export const PROCESS_STEPS = [
  { label: "Scope", description: "Define boundaries and reporting requirements." },
  { label: "Measure", description: "Collect primary activity data at the site." },
  { label: "Model", description: "Calculate against a versioned methodology." },
  { label: "Reduce", description: "Rank efficiency and abatement measures by payback." },
  { label: "Verify", description: "Prepare evidence for third-party assurance." },
  { label: "Maintain", description: "Keep the system current as operations change." },
] as const

export const STANDARDS = [
  "GHG Protocol",
  "ISO 14064",
  "ISO 50001",
  "SBTi",
  "Verra",
  "Gold Standard",
  "CDP",
  "IFC Performance Standards",
] as const

export const SECTORS = [
  { slug: "textile-rmg", name: "Textile and RMG" },
  { slug: "food-beverage", name: "Food and beverage" },
  { slug: "pharmaceuticals", name: "Pharmaceuticals" },
  { slug: "cement-ceramics", name: "Cement and ceramics" },
  { slug: "commercial-real-estate", name: "Commercial real estate" },
  { slug: "development-programmes", name: "Development sector programmes" },
] as const

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/platform", label: "Platform" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const

export const TIMELINE_OPTIONS = [
  { value: "immediate", label: "Immediate — within a month" },
  { value: "this-quarter", label: "This quarter" },
  { value: "this-year", label: "Later this year" },
  { value: "exploring", label: "Just exploring options" },
] as const

export const ENQUIRY_TRIGGERS = [
  { value: "buyer-requirement", label: "A buyer or brand requirement" },
  { value: "regulation", label: "A regulation (CSRD, CBAM, other)" },
  { value: "cost", label: "A cost or efficiency problem" },
  { value: "certification-deadline", label: "A certification or target deadline" },
  { value: "other", label: "Something else" },
] as const
