import * as useCreateGuild from "../../src/components/create-guild/hooks/useCreateGuild"

const useCreateGuildSpy = vi.spyOn(useCreateGuild, "default")
const onSubmitSpy = vi.fn()

beforeEach(() => {
  useCreateGuildSpy.mockReturnValue({
    onSubmit: (props) => onSubmitSpy(props),
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy }
export default useCreateGuildSpy
