import fs from "node:fs/promises"
import path from "node:path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const TEST_DIR = path.join(process.cwd(), "data", "submissions")

describe("fileStore", () => {
  const testFile = path.join(TEST_DIR, "enquiry.jsonl")

  beforeEach(async () => {
    vi.resetModules()
    await fs.rm(testFile, { force: true })
  })

  afterEach(async () => {
    await fs.rm(testFile, { force: true })
  })

  it("appends a JSON line with an id and timestamp, and round-trips the data", async () => {
    const { fileStore } = await import("@/lib/forms-store")
    const { id } = await fileStore.save("enquiry", {
      name: "Test User",
      email: "test@example.com",
      message: "Hello",
    })

    expect(id).toBeTruthy()

    const raw = await fs.readFile(testFile, "utf8")
    const lines = raw.trim().split("\n")
    expect(lines).toHaveLength(1)

    const record = JSON.parse(lines[0])
    expect(record).toMatchObject({
      id,
      name: "Test User",
      email: "test@example.com",
      message: "Hello",
    })
    expect(record.submittedAt).toBeTruthy()
  })

  it("appends multiple submissions without overwriting earlier ones", async () => {
    const { fileStore } = await import("@/lib/forms-store")
    await fileStore.save("enquiry", { name: "First", email: "a@example.com", message: "One" })
    await fileStore.save("enquiry", { name: "Second", email: "b@example.com", message: "Two" })

    const raw = await fs.readFile(testFile, "utf8")
    const lines = raw.trim().split("\n")
    expect(lines).toHaveLength(2)
  })
})
