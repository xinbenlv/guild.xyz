import * as useDeleteRole from "../../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/components/DeleteRoleButton/hooks/useDeleteRole"

const useDeleteRoleSpy = vi.spyOn(useDeleteRole, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useDeleteRoleSpy.mockReturnValue({
    onSubmit: onSubmitSpy,
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy }
export default useDeleteRoleSpy
