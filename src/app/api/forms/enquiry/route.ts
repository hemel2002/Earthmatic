import { NextResponse } from "next/server"
import { enquirySchema } from "@/lib/validation/enquiry-schema"
import { fileStore, notifySubmission } from "@/lib/forms-store"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = enquirySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  if (parsed.data._hp) {
    return NextResponse.json({ ok: true, submissionId: "noop" })
  }

  try {
    const { _hp, ...data } = parsed.data
    const { id } = await fileStore.save("enquiry", data)
    await notifySubmission("enquiry", data, id)
    return NextResponse.json({ ok: true, submissionId: id })
  } catch {
    return NextResponse.json(
      { ok: false, error: "submission_failed" },
      { status: 500 }
    )
  }
}
