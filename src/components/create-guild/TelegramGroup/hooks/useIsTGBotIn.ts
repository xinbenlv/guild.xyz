import useSWR from "swr"

const fallbackData = {
  ok: false,
  message: null,
  groupName: "",
  groupIcon: null,
}

const useIsTGBotIn = (groupId: string) => {
  const shouldFetch = groupId?.length >= 9

  const { data, isValidating } = useSWR(
    shouldFetch
      ? `/telegram/group/${groupId?.startsWith("-") ? groupId : `-${groupId}`}`
      : null,
    {
      fallbackData,
      refreshInterval: 5000,
      onSuccess: (value) => console.log(`useIsTGBotIn fetch success: ${value}`),
    }
  )

  return { data, isLoading: isValidating }
}

export default useIsTGBotIn
