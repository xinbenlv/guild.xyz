import useOauthPopupWindow from "./useOauthPopupWindow"

const useGHAuth = (writeAccess = false) =>
  useOauthPopupWindow("https://github.com/login/oauth/authorize", {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    scope: writeAccess ? "repo,read:user" : "read:user",
  })

export default useGHAuth
