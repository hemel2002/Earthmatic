import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { caseStudyFrontmatterSchema, type CaseStudy } from "@/content/types"

const WORK_DIR = path.join(process.cwd(), "content", "work")

function readCaseStudyFile(filename: string): CaseStudy {
  const raw = fs.readFileSync(path.join(WORK_DIR, filename), "utf8")
  const { data, content } = matter(raw)
  const parsed = caseStudyFrontmatterSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/work/${filename}: ${parsed.error.message}`
    )
  }

  return { ...parsed.data, slug: filename.replace(/\.mdx$/, ""), content }
}

export function getAllWork(): CaseStudy[] {
  const files = fs.readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"))
  return files
    .map(readCaseStudyFile)
    .sort((a, b) => b.year - a.year)
}

export function getWorkBySlug(slug: string): CaseStudy | undefined {
  return getAllWork().find((item) => item.slug === slug)
}
