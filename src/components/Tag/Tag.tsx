import React from 'react'
import { Text } from '@chakra-ui/react'

const Tag = ({ children, ...props }) => {
  return (
    <Text
      borderWidth="1px"
      borderRadius="lg"
      px={2}
      bg="rgba(128, 128, 128, 0.2)"
      fontSize="xs"
      fontWeight="bold"
      opacity="0.8"
      {...props}
    >
      {children}
    </Text>
  )
}

export default Tag
