import * as useIsTGBotIn from "../../src/components/create-guild/TelegramGroup/hooks/useIsTGBotIn"

const useIsTGBotInSpy = vi.spyOn(useIsTGBotIn, "default")

beforeEach(() => {
  useIsTGBotInSpy.mockImplementation((groupId: string) => ({
    isLoading: false,
    data: {
      ok: groupId === process.env.VITEST_TG_GROUP_ID,
      groupIcon: "",
      groupName: "Placeholder Group Name",
      message: "",
    },
  }))
})

export default useIsTGBotInSpy
