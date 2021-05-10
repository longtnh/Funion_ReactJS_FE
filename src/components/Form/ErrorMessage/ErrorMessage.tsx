import React from 'react'
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

const ErrorMessage = ({ message }) => {
  return (
    <Alert status="error" borderRadius={4} my={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export default React.memo(ErrorMessage)
