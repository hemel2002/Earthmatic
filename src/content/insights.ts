import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { insightFrontmatterSchema, type Insight } from "@/content/types"

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights")

function readInsightFile(filename: string): Insight {
  const raw = fs.readFileSync(path.join(INSIGHTS_DIR, filename), "utf8")
  const { data, content } = matter(raw)
  const parsed = insightFrontmatterSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/insights/${filename}: ${parsed.error.message}`
    )
  }

  return { ...parsed.data, content }
}

export function getAllInsights(): Insight[] {
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"))
  return files
    .map(readInsightFile)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return getAllInsights().find((insight) => insight.slug === slug)
}
