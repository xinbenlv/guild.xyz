import { Button, ButtonProps } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import useDisconnect from "components/common/Layout/components/Account/components/AccountModal/hooks/useDisconnect"
import useUser from "components/[guild]/hooks/useUser"
import useOAuthWithCallback from "components/[guild]/JoinModal/hooks/useOAuthWithCallback"
import { Web3Connection } from "components/_app/Web3ConnectionManager"
import useGateables from "hooks/useGateables"
import useKeyPair, { manageKeyPairAfterUserMerge } from "hooks/useKeyPair"
import { useSubmitWithSign } from "hooks/useSubmit"
import dynamic from "next/dynamic"
import { ArrowSquareIn, CaretRight } from "phosphor-react"
import { useContext, useEffect, useMemo } from "react"
import { PlatformName } from "types"
import fetcher, { useFetcherWithSign } from "utils/fetcher"

type Props = {
  onSelection: (platform: PlatformName) => void
  platform: PlatformName
  buttonText: string
} & ButtonProps

// Mock until we can fetch from BE
const platformUserData = {
  readonly: true,
}

const BaseOAuthSelectButton = ({
  onSelection,
  platform,
  buttonText,
  ...buttonProps
}: Props) => {
  const { platformUsers, mutate /* platformUserData */ } = useUser()
  const isPlatformConnected = platformUsers?.some(
    ({ platformName }) => platformName === platform
  )
  const { ready, keyPair } = useKeyPair()

  // TODO Do this with SWR once keypair is merged
  const gateables = useGateables()
  const { account } = useWeb3React()
  useEffect(() => {
    if (!account || !ready || !keyPair) return
    gateables.onSubmit({ platformName: platform })
  }, [account, ready, keyPair])

  const user = useUser()
  const fetcherWithSign = useFetcherWithSign()

  const { onSubmit, isSigning, signLoadingText, isLoading } = useSubmitWithSign(
    ({ data, validation }) =>
      fetcher("/user/connect", {
        method: "POST",
        body: { payload: data, ...validation },
      }).then(() => manageKeyPairAfterUserMerge(fetcherWithSign, user, account)),
    { onSuccess: () => mutate().then(() => onSelection(platform)) }
  )

  const shouldAuth = !isPlatformConnected || platformUserData.readonly

  const { callbackWithOAuth, isAuthenticating, authData } = useOAuthWithCallback(
    platform,
    () => {
      if (!isPlatformConnected) {
        onSubmit({
          platformName: platform,
          authData,
        })
      } else {
        onSelection(platform)
      }
    },
    true
  )
  const disconnect = useDisconnect(() => mutate())

  const DynamicCtaIcon = useMemo(
    () =>
      dynamic(async () =>
        !isPlatformConnected || !!gateables.error ? ArrowSquareIn : CaretRight
      ),
    [isPlatformConnected]
  )

  const { openWalletSelectorModal } = useContext(Web3Connection)

  if (!account) {
    return (
      <Button {...buttonProps} onClick={openWalletSelectorModal}>
        Connect Wallet
      </Button>
    )
  }

  return (
    <Button
      onClick={
        shouldAuth
          ? callbackWithOAuth
          : !!gateables.error
          ? () =>
              disconnect.onSubmit({
                platformName: platform,
              })
          : () => onSelection(platform)
      }
      isLoading={
        isAuthenticating ||
        isLoading ||
        isSigning ||
        gateables.isLoading ||
        gateables.isSigning ||
        disconnect.isLoading ||
        disconnect.isSigning
      }
      loadingText={
        signLoadingText ??
        gateables.signLoadingText ??
        disconnect.signLoadingText ??
        ((isAuthenticating && "Check the popup window") || "Connecting")
      }
      rightIcon={<DynamicCtaIcon />}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  )
}

export default BaseOAuthSelectButton
