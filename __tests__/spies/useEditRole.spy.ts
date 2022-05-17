import * as useEditRole from "../../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/hooks/useEditRole"

const useEditRoleSpy = vi.spyOn(useEditRole, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useEditRoleSpy.mockReturnValue({
    onSubmit: ({ name, description }) => onSubmitSpy({ name, description }),
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy }
export default useEditRoleSpy
