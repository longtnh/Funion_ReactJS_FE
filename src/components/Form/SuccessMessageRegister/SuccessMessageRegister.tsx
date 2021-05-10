import React from 'react'
import { Alert, AlertIcon, AlertDescription, Link } from '@chakra-ui/react'
import { PATH } from '@/constants/paths'

const SuccessMessageRegister = () => {
  return (
    <Alert status="success" borderRadius={4} variant="left-accent" my={4}>
      <AlertIcon />
      <AlertDescription>
        Register Success,{' '}
        <Link color="blue.500" href={PATH.LOGIN}>
          back to Login
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default SuccessMessageRegister
