import { render, screen } from "@testing-library/react"
import IndexPage from "../src/pages"
import ProvidersWrapper from "./utils/ProvidersWrapper"

beforeEach(() => {
  render(<ProvidersWrapper Component={IndexPage} />)
})

describe("index page", () => {
  it("renders properly", () => {
    expect(screen.getByText(/^guild$/i)).toBeDefined()
    expect(screen.getAllByText(/0x[a-f0-9\.]+/i)).toBeDefined()
    expect(screen.getAllByText(/create guild/i)).toBeDefined()
  })
})
