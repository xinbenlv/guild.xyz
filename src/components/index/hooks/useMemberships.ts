import useSWR from "swr"
import web3React from "web3React"

type Response = Array<{
  guildId: number
  roleIds: number[]
}>

const useMemberships = () => {
  const { account } = web3React.useWeb3React()

  const shouldFetch = !!account

  const { data } = useSWR<Response>(
    shouldFetch ? `/user/membership/${account}` : null,
    {
      refreshInterval: 10000,
    }
  )

  return data
}

export default useMemberships
