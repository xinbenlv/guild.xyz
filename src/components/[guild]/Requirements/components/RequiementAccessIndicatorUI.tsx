import {
  Center,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import useDatadog from "components/_app/Datadog/useDatadog"
import { FC, PropsWithChildren, useState } from "react"

type Props = {
  colorScheme: string
  icon: FC
  circleBgSwatch?: { light: number; dark: number }
  isAlwaysOpen?: boolean
}

const CIRCLE_SIZE = 2
const CIRCLE_HOVER_STYLES = {
  bg: "unset",
  width: 7,
  height: 7,
  borderRadius: 0,
  "> *": {
    opacity: 1,
  },
}

const RequiementAccessIndicatorUI = ({
  colorScheme,
  icon,
  circleBgSwatch,
  isAlwaysOpen,
  children,
}: PropsWithChildren<Props>) => {
  // blackAlpha.300 on top of gray.700 => #35353A
  const cardBg = useColorModeValue("var(--chakra-colors-gray-50)", "#35353A")
  const { colorMode } = useColorMode()
  const [openCount, setOpenCount] = useState(0)
  const { addDatadogAction } = useDatadog()

  const onOpen = () => {
    if (isAlwaysOpen)
      return addDatadogAction("Open RequiementAccessIndicator", { colorScheme })

    addDatadogAction("Open closed RequiementAccessIndicator", { colorScheme })
    setOpenCount((count) => {
      const newCount = count + 1
      if (newCount === 5) addDatadogAction("Easteregg found: 1.")
      if (newCount === 10) addDatadogAction("Easteregg found: 2.")

      return newCount
    })
  }

  return (
    <Flex
      width={CIRCLE_SIZE}
      height="full"
      justifyContent={"flex-end"}
      alignItems="center"
    >
      <Center
        pl="6"
        bg={`linear-gradient(to right, transparent 0px, ${cardBg} var(--chakra-space-4))`}
        height={"full"}
      >
        <Popover
          placement="left"
          trigger="hover"
          closeDelay={100}
          strategy="fixed"
          onOpen={onOpen}
        >
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Center
                  bg={`${colorScheme}.${circleBgSwatch[colorMode]}`}
                  boxSize={CIRCLE_SIZE}
                  borderRadius={8}
                  transition="all .2s"
                  overflow={"hidden"}
                  pos="relative"
                  fontSize={"md"}
                  sx={{
                    "> *": {
                      opacity: 0,
                      transition: "opacity .2s",
                    },
                    ...(isOpen || isAlwaysOpen ? CIRCLE_HOVER_STYLES : {}),
                  }}
                  _hover={CIRCLE_HOVER_STYLES}
                >
                  <Tag colorScheme={colorScheme} pos="absolute" px="2" py="2">
                    <Icon as={icon} boxSize={3} />
                  </Tag>
                </Center>
              </PopoverTrigger>
              <PopoverContent width="unset" maxW={{ base: "2xs", md: "xs" }}>
                {!isAlwaysOpen && [5, 10].includes(openCount) ? (
                  <PopoverHeader border="0">
                    {openCount === 5 ? "👀" : "🙈 You like that anim don't ya?"}
                  </PopoverHeader>
                ) : (
                  children
                )}
                <PopoverArrow />
              </PopoverContent>
            </>
          )}
        </Popover>
      </Center>
    </Flex>
  )
}

export default RequiementAccessIndicatorUI
