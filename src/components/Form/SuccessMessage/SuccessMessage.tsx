import React from 'react'
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

const SuccessMessage = ({ message }) => {
  return (
    <Alert status="success" borderRadius={4} variant="left-accent" my={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export default SuccessMessage
