import { render, screen } from "@testing-library/react"
import { spy } from "../src/hooks/__mocks__/useUsersServers"
import CreatePage from "../src/pages/create-guild/discord"
import App from "../src/pages/_app"
import fetcher from "./utils/fetcher"
import getMockRouter from "./utils/getMockRouter"

vi.mock("../src/hooks/useUsersServers")

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
    expect(screen.getByText(/create guild on discord/i)).toBeDefined()
    // expect(screen.getByText(/select/i)).toBeDefined()
    expect(spy).toBeCalled()
  })
})
