import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { COLOR } from '@/constants/styles'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

interface Props {
  price: number
}

const AmountLabel = (props: Props) => {
  return (
    <HStack spacing={1}>
      <Text fontSize={{ base: 'md', lg: 'lg' }}>{props.price}</Text>
      <RiMoneyDollarCircleLine size={29} color={COLOR.DIAMOND} />
    </HStack>
  )
}
export default AmountLabel
