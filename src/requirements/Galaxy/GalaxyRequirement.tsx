import { Skeleton, Text } from "@chakra-ui/react"
import { RequirementComponentProps } from "requirements"
import Requirement from "../common/Requirement"
import ApiError from "./components/ApiError"
import { useGalaxyCampaign } from "./hooks/useGalaxyCampaigns"

const GalaxyRequirement = ({
  requirement,
  ...rest
}: RequirementComponentProps): JSX.Element => {
  const { campaign, isLoading } = useGalaxyCampaign(requirement?.data?.galaxyId)

  return (
    <Requirement
      image={isLoading ? "" : campaign?.thumbnail}
      isImageLoading={isLoading}
      footer={<ApiError />}
      {...rest}
    >
      <Text as="span">{`Participate in the `}</Text>
      <Skeleton as="span" isLoaded={!isLoading}>
        {isLoading ? "Loading..." : campaign?.name}
      </Skeleton>
      <Text as="span">{` Galxe campaign`}</Text>
    </Requirement>
  )
}

export default GalaxyRequirement
