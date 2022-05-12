import * as useCreateGuild from "../../src/components/create-guild/hooks/useCreateGuild"

const useCreateGuildSpy = vi.spyOn(useCreateGuild, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useCreateGuildSpy.mockReturnValue({
    onSubmit: onSubmitSpy,
    isLoading: false,
    isSigning: false,
  })
})

export { onSubmitSpy }
export default useCreateGuildSpy
