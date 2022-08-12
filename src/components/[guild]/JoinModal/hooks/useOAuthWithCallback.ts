import useUser from "components/[guild]/hooks/useUser"
import { useEffect, useState } from "react"
import { PlatformName } from "types"
import { platformAuthHooks } from "./useConnectPlatform"

const useOAuthWithCallback = (
  platform: PlatformName,
  callback: () => void,
  writeAccess = false
) => {
  const { platformUsers } = useUser()
  const isPlatformConnected = platformUsers?.some(
    ({ platformName }) => platformName === platform
  )

  const { authData, onOpen, ...rest } = platformAuthHooks[platform](
    writeAccess as never
  )
  const [hasClickedAuth, setHasClickedAuth] = useState(false)

  const handleClick = () => {
    if (isPlatformConnected) callback()
    else {
      onOpen()
      setHasClickedAuth(true)
    }
  }

  useEffect(() => {
    if (!authData || !hasClickedAuth) return

    callback()
  }, [authData, hasClickedAuth])

  return {
    callbackWithOAuth: handleClick,
    authData,
    ...rest,
  }
}

export { platformAuthHooks }
export default useOAuthWithCallback
