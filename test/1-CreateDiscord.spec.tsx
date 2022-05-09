import { render, screen } from "@testing-library/react"
import CreatePage from "../src/pages/create-guild"
import App from "../src/pages/_app"
import fetcher from "./utils/fetcher"
import getMockRouter from "./utils/getMockRouter"

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

  /* it("can select Discord", () => {
    screen.getByTestId(/select server/i).click()
    window.postMessage({
      type: "DC_AUTH_SUCCESS",
      data: "Bearer 12345",
    })
  }) */
})
