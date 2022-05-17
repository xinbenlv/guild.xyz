import * as useDeleteGuild from "../../src/components/[guild]/EditGuildButton/components/DeleteGuildButton/hooks/useDeleteGuild"

const useDeleteGuildSpy = vi.spyOn(useDeleteGuild, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useDeleteGuildSpy.mockReturnValue({
    onSubmit: onSubmitSpy,
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy }
export default useDeleteGuildSpy
