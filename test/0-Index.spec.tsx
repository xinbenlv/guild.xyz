import { render, screen } from "@testing-library/react"
import IndexPage from "../src/pages"
import App from "../src/pages/_app"
import fetcher from "./utils/fetcher"
import getMockRouter from "./utils/getMockRouter"
import setup from "./utils/setup"

setup()

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

  describe("without wallet", () => {
    it("connect button exists", () => {
      expect(screen.getAllByText(/connect to a wallet/i)).length.to.be.greaterThan(0)
    })
  })
})
