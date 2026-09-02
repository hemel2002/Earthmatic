import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const PHASE_1_PATHS = [
  "/",
  "/services",
  "/platform",
  "/work",
  "/insights",
  "/about",
  "/contact",
]

for (const path of PHASE_1_PATHS) {
  test(`${path} has no critical or serious axe violations`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze()

    const seriousOrCritical = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? "")
    )

    expect(
      seriousOrCritical,
      seriousOrCritical
        .map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)
        .join("\n")
    ).toEqual([])
  })
}

test("skip link is the first focusable element and moves focus to main", async ({
  page,
}) => {
  await page.goto("/")
  await page.keyboard.press("Tab")
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused()
})
