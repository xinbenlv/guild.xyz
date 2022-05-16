import * as pinataUpload from "../../src/hooks/usePinata/utils/pinataUpload"

const pinataUploadSpy = vi.spyOn(pinataUpload, "default")

beforeEach(() => {
  pinataUploadSpy.mockResolvedValue({
    IpfsHash: process.env.VITEST_IPFS_HASH,
    PinSize: 0,
    Timestamp: Date.now().toString(),
    isDuplicate: false,
  })
})

export default pinataUploadSpy
