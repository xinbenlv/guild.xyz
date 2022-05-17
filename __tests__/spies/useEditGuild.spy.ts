import * as useEditGuild from "../../src/components/[guild]/EditGuildButton/hooks/useEditGuild"

const useEditGuildSpy = vi.spyOn(useEditGuild, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useEditGuildSpy.mockReturnValue({
    onSubmit: ({ description, name, urlName }) => {
      onSubmitSpy({ description, name, urlName })
    },
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy }
export default useEditGuildSpy
