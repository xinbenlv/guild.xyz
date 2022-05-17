import * as useCreateRole from "../../src/components/create-guild/hooks/useCreateRole"

const useCreateRoleSpy = vi.spyOn(useCreateRole, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useCreateRoleSpy.mockReturnValue({
    // Destructuring relevant fields, add more if the test gets extended
    onSubmit: ({ name, description, requirements }) =>
      onSubmitSpy({ name, description, requirements }),
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy }
export default useCreateRoleSpy
