const mockUseDCAuth = () => ({
  authorization: "Bearer 12345",
  error: null,
  onOpen: vi.fn(),
  isAuthenticating: false,
})

export { fetcherWithDCAuth } from "../useDCAuth"
export default mockUseDCAuth
