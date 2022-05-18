import * as useGuild from "../../src/components/[guild]/hooks/useGuild"
import guildData from "../fixtures/guildData"

const useGuildSpy = vi.spyOn(useGuild, "default")

beforeEach(() => {
  useGuildSpy.mockImplementation(
    () =>
      ({
        ...guildData,
        fetchAsOwner: vi.fn(),
        fetchedAsOwner: false,
      } as any)
  )
})

export default useGuildSpy
