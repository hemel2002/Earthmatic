import { NextResponse } from "next/server"
import { assessmentSchema } from "@/lib/validation/assessment-schema"
import { fileStore, notifySubmission } from "@/lib/forms-store"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = assessmentSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  if (parsed.data._hp) {
    // Honeypot tripped -- report success without persisting, no need to
    // tip off the bot.
    return NextResponse.json({ ok: true, submissionId: "noop" })
  }

  try {
    const { _hp, ...data } = parsed.data
    const { id } = await fileStore.save("assessment", data)
    await notifySubmission("assessment", data, id)
    return NextResponse.json({ ok: true, submissionId: id })
  } catch {
    return NextResponse.json(
      { ok: false, error: "submission_failed" },
      { status: 500 }
    )
  }
}
