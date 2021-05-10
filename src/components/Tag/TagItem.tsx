import { Text } from '@chakra-ui/react'
import React from 'react'
import { COLOR } from '@/constants/styles'

const TagItem = ({ children, ...props }) => {
  return (
    // click tag to filter by {children}
    <Text
      _hover={{ bg: '#CACACA', cursor: 'pointer' }}
      borderWidth="1px"
      borderRadius="lg"
      px={2}
      bg={COLOR.SIDEBAR_BG}
      fontSize="xs"
      fontWeight="bold"
      opacity="0.8"
      {...props}
    >
      {children}
    </Text>
  )
}
export default TagItem
