import { Avatar, Link, MenuItem, Text } from '@chakra-ui/react'
import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

interface Props {
  data: UserNotification
}

const NotificationItem = ({ data }: Props) => (
  <Link as={ReactLink} to={data.forwardUrl}>
    <MenuItem>
      <Avatar size="sm" src={data.thumbnailImageUrl} />
      <Text ml={3} fontSize="sm">
        {data.content}
      </Text>
    </MenuItem>
  </Link>
)

export default React.memo(NotificationItem)
