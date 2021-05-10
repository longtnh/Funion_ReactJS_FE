import React from 'react'
import { Text } from '@chakra-ui/react'

const RequiredField = ({ children }) => (
  <Text>
    {children}{' '}
    <Text as="a" color="red.500">
      *
    </Text>
  </Text>
)

export default React.memo(RequiredField)
