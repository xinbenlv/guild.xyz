import * as useIsTGBotIn from "../../src/components/create-guild/TelegramGroup/hooks/useIsTGBotIn"

const useIsTGBotInSpy = vi.spyOn(useIsTGBotIn, "default")

beforeEach(() => {
  useIsTGBotInSpy.mockImplementation((groupId: string) => ({
    isLoading: false,
    data: {
      ok: groupId === process.env.VITEST_TG_GROUP_ID,
      groupIcon:
        "https://cdn.discordapp.com/icons/973501817566674984/d006abc42ae94e704ca8bca540b148f0.png",
      groupName: "Vitest Gang",
      message: "",
    },
  }))
})

export default useIsTGBotInSpy
