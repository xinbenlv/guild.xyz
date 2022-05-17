import * as useUsersServers from "../../src/hooks/useUsersServers"

const useUsersServersSpy = vi.spyOn(useUsersServers, "default")

beforeEach(() => {
  useUsersServersSpy.mockReturnValue({
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
  })
})

export default useUsersServersSpy
