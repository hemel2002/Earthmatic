import { z } from "zod"

export const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name").max(120),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Say a little more").max(2000),
  _hp: z.string().max(0).optional().or(z.literal("")),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
