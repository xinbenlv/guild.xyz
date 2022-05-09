import { rest } from "msw"
import { setupServer } from "msw/node"

const mockDiscordServers = () => {
  const server = setupServer(
    rest.get("https://discord.com/api/users/@me/guilds", (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json([
          {
            id: "947899200249663489",
            name: "Cypress Gang",
            icon: "18a340a01c562958208e3d5021a89faf",
            owner: true,
          },
        ])
      )
    )
  )

  // Start server before all tests
  beforeAll(() => server.listen())

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())
}

export default mockDiscordServers
