const data = {
  name: "Vitest Gang",
  imageUrl: `https://guild-xyz.mypinata.cloud/ipfs/${process.env.VITEST_IPFS_HASH}`,
  platform: "TELEGRAM",
  logic: "AND",
  TELEGRAM: { platformId: process.env.VITEST_TG_GROUP_ID },
  requirements: [{ type: "FREE", data: {}, chain: null, address: null }],
}

export default data
