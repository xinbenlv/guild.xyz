import { Center, Heading, Text } from "@chakra-ui/react"

type Props = {
  isTwitter?: boolean
  isUnsupported?: boolean
}

const AuthRedirect = ({ isTwitter, isUnsupported = false }: Props): JSX.Element => {
  const isTwitterOnIOS =
    typeof navigator === "undefined"
      ? false
      : isTwitter &&
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        navigator.userAgent.match(/AppleWebKit/)

  return (
    <Center flexDir={"column"} p="10" textAlign={"center"} h="90vh">
      <Heading size="md" mb="3">
        {isUnsupported ? "Unsupported browser" : "You're being redirected"}
      </Heading>
      <Text>
        {isUnsupported
          ? "This browser doesn't seem to support our authentication method, please try again in your regular browser app with WalletConnect, or from desktop!"
          : "Closing the authentication window and taking you back to the site..."}
      </Text>
      {!isUnsupported && isTwitterOnIOS && (
        <Text>
          If you're using the iOS Twitter app for authenticating, please try using
          Twitter from your browser or try authenticating on another device
        </Text>
      )}
    </Center>
  )
}

export default AuthRedirect
