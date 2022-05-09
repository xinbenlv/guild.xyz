import { render, screen } from "@testing-library/react"
import IndexPage from "../src/pages"
import App from "../src/pages/_app"
import fetcher from "./utils/fetcher"
import getMockRouter from "./utils/getMockRouter"

beforeEach(async () => {
  const { RouterProvider } = getMockRouter()

  const guilds = await fetcher(`/guild?sort=members`)

  render(
    <RouterProvider>
      <App router={undefined} Component={IndexPage as any} pageProps={{ guilds }} />
    </RouterProvider>
  )
})

describe("index page", () => {
  it("renders", () => {
    expect(screen.getByText(/^guild$/i)).toBeDefined()
  })

  it("wallet is connected", () => {
    expect(screen.getAllByText(/0x[a-f0-9\.]+/i)).toBeDefined()
  })

  it("create button appears", () => {
    expect(screen.getAllByText(/create guild/i)).toBeDefined()
  })
})
