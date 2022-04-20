import type { Web3Provider } from "@ethersproject/providers"
import useSWR from "swr"
import web3React from "web3React"

const fetchENSName = (_, library, address) => library.lookupAddress(address)

const useENSName = (address: string): string => {
  const { library, chainId } = web3React.useWeb3React<Web3Provider>()

  const shouldFetch = library && address

  const { data } = useSWR(
    shouldFetch ? ["ENS", library, address, chainId] : null,
    fetchENSName
  )

  return data
}

export default useENSName
