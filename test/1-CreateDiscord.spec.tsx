import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import CreatePage from "../src/pages/create-guild/discord"
import App from "../src/pages/_app"
import useDCAuthSpy from "./spies/useDCAuth.spy"
import useUsersServersSpy from "./spies/useUsersServers.spy"
import getMockRouter from "./utils/getMockRouter"

beforeEach(async () => {
  const { RouterProvider } = getMockRouter()

  render(
    <RouterProvider>
      <App router={undefined} Component={CreatePage as any} pageProps={{}} />
    </RouterProvider>
  )
})

describe("create page", () => {
  it("renders", () => {
    expect(screen.getByText(/create guild on discord/i)).toBeDefined()

    expect(useDCAuthSpy).toBeCalledWith("guilds")
    expect(useUsersServersSpy).toBeCalledWith("Bearer 12345")
  })

  it("can create guild", async () => {
    vi.useFakeTimers()

    expect(screen.getByTestId("select-server-button")).toBeDefined()

    screen.getByTestId("select-server-button").click()

    vi.advanceTimersByTime(500)

    expect(screen.getByTestId("guild-creation-sign-button")).toBeDefined()
    fireEvent.click(screen.getByTestId("guild-creation-sign-button"))

    screen.debug(document, Number.MAX_SAFE_INTEGER)

    await waitFor(() => {
      expect(screen.getByTestId(/member/i)).toBeDefined()
    })
  })
})
