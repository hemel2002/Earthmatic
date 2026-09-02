import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CtaButton } from "@/components/marketing/cta-button"

describe("CtaButton", () => {
  it("renders the fixed 'Book an assessment' copy for that intent", () => {
    render(<CtaButton intent="book-assessment" />)
    expect(
      screen.getByRole("link", { name: "Book an assessment" })
    ).toHaveAttribute("href", "/contact#assessment")
  })

  it("builds the guide copy from guideLabel for download-guide", () => {
    render(<CtaButton intent="download-guide" guideLabel="Platform" />)
    expect(
      screen.getByRole("link", { name: "Download the Platform guide" })
    ).toBeInTheDocument()
  })

  it("throws if download-guide is used without a guideLabel", () => {
    expect(() => render(<CtaButton intent="download-guide" />)).toThrow()
  })

  it("throws if secondary-link is used without label and href", () => {
    expect(() => render(<CtaButton intent="secondary-link" />)).toThrow()
  })

  it("renders secondary-link with the exact label and href given", () => {
    render(
      <CtaButton intent="secondary-link" label="See how we work" href="/services" />
    )
    expect(
      screen.getByRole("link", { name: "See how we work" })
    ).toHaveAttribute("href", "/services")
  })
})
