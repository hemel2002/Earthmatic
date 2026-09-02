import fs from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions")

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
 * Caveat: local filesystem storage is fine for dev/staging, but most
 * serverless hosts (Vercel included) ship an ephemeral or read-only
 * filesystem outside /tmp in production -- swap this before real production
 * traffic depends on it.
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
