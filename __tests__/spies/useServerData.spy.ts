import * as useServerData from "../../src/hooks/useServerData"
import serverData from "../fixtures/serverData.json"

const useServerDataSpy = vi.spyOn(useServerData, "default")

beforeEach(() => {
  useServerDataSpy.mockReturnValue(serverData)
})

export default useServerDataSpy
