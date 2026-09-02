import { test, expect } from "@playwright/test"

const PHASE_1_PATHS = [
  "/",
  "/services",
  "/platform",
  "/work",
  "/insights",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
]

for (const path of PHASE_1_PATHS) {
  test(`${path} returns 200 with exactly one h1`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator("h1")).toHaveCount(1)
  })
}

test("services nav dropdown links resolve to working anchors", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Services" }).click()
  // Scoped to the primary nav -- "Carbon accounting" also appears as a Home
  // page card and a footer link, both legitimately, so an unscoped locator
  // matches all three.
  const link = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: /Carbon accounting/ })
  await expect(link).toHaveAttribute("href", "/services#carbon-accounting")
  await link.click()
  await expect(page).toHaveURL(/\/services#carbon-accounting/)
})

test("reduced motion renders the static hero fallback, not a canvas", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page.locator(".hero-canvas-wrap canvas")).toHaveCount(0)
  await expect(page.locator(".hero-canvas-wrap svg")).toHaveCount(1)
  await context.close()
})

test("assessment form happy path submits and shows confirmation", async ({
  page,
}) => {
  await page.goto("/contact")
  // getByRole("textbox", ...) rather than getByLabel for Company -- the
  // footer also has a landmark <nav aria-label="Company">, which shares the
  // same accessible name as the form field.
  await page.getByLabel("Full name").fill("Test User")
  await page.getByLabel("Work email").fill("test@example.com")
  await page.getByRole("textbox", { name: "Company" }).fill("Test Company")
  await page.getByLabel("Sector").click()
  await page.getByRole("option", { name: "Textile and RMG" }).click()
  await page.getByLabel("Number of sites").fill("2")
  await page.getByLabel("What triggered this enquiry?").click()
  await page.getByRole("option", { name: /buyer or brand requirement/ }).click()
  await page.getByLabel("Timeline").click()
  await page.getByRole("option", { name: /This quarter/ }).click()
  await page.getByRole("button", { name: "Book an assessment" }).click()

  // Scoped to the confirmation panel (role="status") -- the success toast's
  // text also case-insensitively contains "request received" as a substring,
  // so an unscoped getByText matches both.
  await expect(
    page.getByRole("status").getByText("Request received.", { exact: true })
  ).toBeVisible()
})
