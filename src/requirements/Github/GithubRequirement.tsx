import { Icon } from "@chakra-ui/react"
import Link from "components/common/Link"
import { GithubLogo } from "phosphor-react"
import { RequirementComponentProps } from "requirements"
import ConnectRequirementPlatformButton from "../common/ConnectRequirementPlatformButton"
import Requirement from "../common/Requirement"

const GithubRequirement = ({ requirement, ...rest }: RequirementComponentProps) => (
  <Requirement
    image={<Icon as={GithubLogo} boxSize={6} />}
    footer={<ConnectRequirementPlatformButton requirement={requirement} />}
    {...rest}
  >
    Give a star to the{" "}
    <Link
      href={requirement.data.id ?? ""}
      isExternal
      colorScheme={"blue"}
      fontWeight="medium"
    >
      {requirement.data.id.match(/https:\/\/github\.com\/(.+)$/i)[1]}
    </Link>{" "}
    repository
  </Requirement>
)

export default GithubRequirement
