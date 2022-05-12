import * as pinataUpload from "../../src/utils/pinataUpload"

const pinataUploadSpy = vi.spyOn(pinataUpload, "default")

beforeEach(() => {
  pinataUploadSpy.mockImplementation(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return {
      IpfsHash: process.env.VITEST_IPFS_HASH,
      PinSize: 0,
      Timestamp: Date.now().toString(),
      isDuplicate: false,
    }
  })
})

export default pinataUploadSpy
