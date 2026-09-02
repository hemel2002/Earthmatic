import { z } from "zod"
import { ENQUIRY_TRIGGERS } from "@/lib/constants"

const triggerValues = ENQUIRY_TRIGGERS.map((t) => t.value) as [
  string,
  ...string[],
]

// Shared by the client form (zodResolver) and the route handler -- the
// server always re-validates, client validation is never trusted alone.
export const assessmentSchema = z.object({
  name: z.string().min(2, "Enter your full name").max(120),
  workEmail: z.string().email("Enter a valid work email"),
  company: z.string().min(2, "Enter your company name").max(160),
  sector: z.string().min(1, "Select a sector"),
  numberOfSites: z.coerce.number().int().min(1).max(500),
  trigger: z.enum(triggerValues, { message: "Select what triggered this enquiry" }),
  timeline: z.string().min(1, "Select a timeline"),
  // Honeypot -- must stay empty. Not shown to real users (see AssessmentForm).
  _hp: z.string().max(0).optional().or(z.literal("")),
})

export type AssessmentInput = z.infer<typeof assessmentSchema>
