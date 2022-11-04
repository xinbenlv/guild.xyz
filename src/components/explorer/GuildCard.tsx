import { Tag, TagLabel, TagLeftIcon, Text, Tooltip, Wrap } from "@chakra-ui/react"
import DisplayCard from "components/common/DisplayCard"
import Link from "components/common/Link"
import { Users } from "phosphor-react"
import { GuildBase } from "types"
import pluralize from "utils/pluralize"

type Props = {
  guildData: GuildBase
}

const GuildCard = ({ guildData }: Props): JSX.Element => (
  <Link
    href={`/${guildData.urlName}`}
    prefetch={false}
    _hover={{ textDecor: "none" }}
    borderRadius="2xl"
    w="full"
    h="full"
  >
    <DisplayCard
      image={guildData.imageUrl}
      title={guildData.name}
      itemScope
      itemType="Organization"
    >
      <Wrap zIndex="1">
        <Tag as="li">
          <TagLeftIcon as={Users} />
          <TagLabel>{guildData.memberCount ?? 0}</TagLabel>
        </Tag>
        <Tooltip label={guildData.roles.join(", ")}>
          <Tag as="li">
            <TagLabel>{pluralize(guildData.roles?.length ?? 0, "role")}</TagLabel>
          </Tag>
        </Tooltip>
        {/* Schema.org attributes */}
        <Text as="span" hidden itemProp="url">
          {`/${guildData.urlName}`}
        </Text>
        <Text as="span" hidden itemProp="name">
          {guildData.name}
        </Text>
        <Text as="span" hidden itemProp="description">{`${pluralize(
          guildData.memberCount ?? 0,
          "member"
        )},  ${pluralize(guildData.roles?.length ?? 0, "role")}`}</Text>
      </Wrap>
    </DisplayCard>
  </Link>
)

export default GuildCard
