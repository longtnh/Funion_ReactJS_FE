import React from 'react'
import { chakra, Text, Box } from '@chakra-ui/react'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { COLOR } from '@/constants/styles'
import getHexFromString from '@/utils/getHexFromString'
import { ChatMessage } from '@/@types/chat'

interface Props {
  key: number
  message: ChatMessage
}

const DonateMessage = ({ key, message }: Props) => (
  <Box key={key}>
    <Text>
      <chakra.span
        display="inline-block"
        px={1}
        mr={1}
        fontWeight="bold"
        fontSize="sm"
        borderRadius="md"
        color="#fff"
        bg={COLOR.DIAMOND}
      >
        Donate
      </chakra.span>
      <chakra.span
        mr={1}
        fontWeight="bold"
        display="inline-block"
        color={getHexFromString(message.userName)}
      >
        {message.userName}
      </chakra.span>
      donated{' '}
      <chakra.span display="inline-block" fontWeight="bold" color={COLOR.DIAMOND}>
        {message.amount}
      </chakra.span>
      <chakra.span display="inline-block" mr={1} mb="-4px" fontWeight="bold">
        <RiMoneyDollarCircleLine size={20} color={COLOR.DIAMOND} />
      </chakra.span>
      with message:{' '}
      <chakra.span fontWeight="bold" color={COLOR.PRIMARY}>
        {message.content}
      </chakra.span>
    </Text>
  </Box>
)

export default React.memo(DonateMessage)
