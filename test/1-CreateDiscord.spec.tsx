import { render, screen } from "@testing-library/react"
import CreatePage from "../src/pages/create-guild"
import App from "../src/pages/_app"
import fetcher from "./utils/fetcher"
import getMockRouter from "./utils/getMockRouter"
import mockDiscordServers from "./utils/mockDiscordServers"

mockDiscordServers()

beforeEach(async () => {
  const { RouterProvider } = getMockRouter()

  const guilds = await fetcher(`/guild?sort=members`)

  render(
    <RouterProvider>
      <App router={undefined} Component={CreatePage as any} pageProps={{ guilds }} />
    </RouterProvider>
  )
})

describe("create page", () => {
  it("renders", () => {
    expect(screen.getByText(/^choose platform$/i)).toBeDefined()
  })

  it("can select Discord", async () => {
    screen.getByText(/select server/i).click()
  })
})
