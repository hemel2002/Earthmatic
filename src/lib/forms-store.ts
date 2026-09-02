import fs from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"

// Vercel's serverless functions have a read-only filesystem outside /tmp --
// process.cwd() would throw EROFS there. /tmp is writable but ephemeral
// (wiped between invocations/deploys, not shared across instances), so this
// is a stopgap that keeps the form from 500ing in production, not a durable
// store -- see the caveat below.
const SUBMISSIONS_DIR = process.env.VERCEL
  ? path.join("/tmp", "earthmatic-submissions")
  : path.join(process.cwd(), "data", "submissions")

export interface SubmissionStore {
  save(
    kind: "assessment" | "enquiry",
    data: Record<string, unknown>
  ): Promise<{ id: string }>
}

/**
 * Append-only JSONL storage -- durable across restarts, trivially
 * inspectable, zero extra infra. This is the seam for swapping in a real
 * backend later: implement SubmissionStore against Postgres/FastAPI/a queue
 * and change the one import in each route handler, nothing else.
 *
 * Caveat: this is fine for local dev. On Vercel it writes to /tmp so
 * submissions don't crash the request, but /tmp is not durable there --
 * `notifySubmission`'s console.log is the only reliable record until this is
 * swapped for a real backend (Postgres, a queue, or at minimum an email
 * webhook). Do not treat production submissions as safely stored yet.
 */
export const fileStore: SubmissionStore = {
  async save(kind, data) {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true })
    const id = crypto.randomUUID()
    const record = { id, submittedAt: new Date().toISOString(), ...data }
    const filePath = path.join(SUBMISSIONS_DIR, `${kind}.jsonl`)
    await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8")
    return { id }
  },
}

export async function notifySubmission(
  kind: string,
  data: unknown,
  id: string
): Promise<void> {
  // TODO: swap for a real email/webhook integration once one exists.
  console.log(JSON.stringify({ event: "form_submission", kind, id, data }))
}
