import * as useDCAuth from "../../src/components/[guild]/RolesByPlatform/components/JoinButton/components/JoinModal/hooks/useDCAuth"

let useDCAuthSpy = null

const mock = () =>
  (useDCAuthSpy = vi.spyOn(useDCAuth, "default").mockReturnValue({
    authorization: "Bearer 12345",
    error: null,
    onOpen: vi.fn(),
    isAuthenticating: false,
  }))

export { useDCAuthSpy }
export default mock
