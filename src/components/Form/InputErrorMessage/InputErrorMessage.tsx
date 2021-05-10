import React from 'react'
import { Text } from '@chakra-ui/react'

const InputErrorMessage = ({ children }) => (
  <Text mt={2} color="tomato" textAlign="left">
    {'⚠ '}
    {children}
  </Text>
)

export default React.memo(InputErrorMessage)
