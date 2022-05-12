import * as useDCAuth from "../../src/components/[guild]/RolesByPlatform/components/JoinButton/components/JoinModal/hooks/useDCAuth"

const useDCAuthSpy = vi.spyOn(useDCAuth, "default")

beforeEach(() => {
  useDCAuthSpy.mockReturnValue({
    authorization: "Bearer 12345",
    error: null,
    onOpen: vi.fn(),
    isAuthenticating: false,
  })
})

export default useDCAuthSpy
