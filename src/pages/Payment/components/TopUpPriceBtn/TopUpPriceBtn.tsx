import { Button, Center, Text } from '@chakra-ui/react'
import React from 'react'
import { COLOR } from '@/constants/styles'

const TopUpPriceBtn = ({ amount, isActive, handleClick }) => {
  return (
    <Button
      size="sm"
      p={6}
      border={isActive && '2px'}
      borderColor={isActive && COLOR.PAYMENT_BLUE}
      onClick={() => handleClick(amount)}
    >
      <Center>
        <Text fontSize="lg">{amount}</Text>
      </Center>
    </Button>
  )
}
export default TopUpPriceBtn
