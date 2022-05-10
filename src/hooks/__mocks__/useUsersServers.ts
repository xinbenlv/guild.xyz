const spy = vi.fn()

const mockUseUsersServers = () => spy

/* .mockReturnValue({
    servers: [
      {
        img: "",
        id: "973501817566674984",
        name: "Vitest Gang",
        owner: true,
      },
    ],
    isValidating: false,
  }) */

export { spy }
export default mockUseUsersServers
