import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

// Explicit per-crawler allow entries, not just a wildcard -- the seo skill's
// audit scores an enumerated AI-crawler allowlist, not a blanket Allow: /.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Google-CloudVertexBot",
  "Applebot-Extended",
  "DeepSeekBot",
  "DuckAssistBot",
  "CCBot",
  "YouBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
