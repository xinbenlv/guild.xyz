import * as useUsersServers from "../../src/hooks/useUsersServers"

let useUsersServersSpy = null

const mock = () =>
  (useUsersServersSpy = vi.spyOn(useUsersServers, "default").mockReturnValue({
    servers: [
      {
        img: "",
        id: "973501817566674984",
        name: "Vitest Gang",
        owner: true,
      },
    ],
    isValidating: false,
    mutate: vi.fn(),
    error: null,
  }))

export { useUsersServersSpy }
export default mock
