import * as useEditGuild from "../../src/components/[guild]/EditGuildButton/hooks/useEditGuild"

const useEditGuildSpy = vi.spyOn(useEditGuild, "default")
const onSubmitSpy = vi.fn()
const onSubmitDescriptionSpy = vi.fn()
const onSubmitUrlNameSpy = vi.fn()
const onSubmitNameSpy = vi.fn()

beforeEach(() => {
  useEditGuildSpy.mockReturnValue({
    onSubmit: (props) => {
      onSubmitDescriptionSpy(props.description)
      onSubmitUrlNameSpy(props.urlName)
      onSubmitNameSpy(props.name)
      onSubmitSpy(props)
    },
    isLoading: false,
    isSigning: false,
    response: null,
    error: null,
  })
})

export { onSubmitSpy, onSubmitDescriptionSpy, onSubmitNameSpy, onSubmitUrlNameSpy }
export default useEditGuildSpy
